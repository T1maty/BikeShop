import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {ProductStorageMoveFullData} from "../../../entities/models/Acts/ProductStorageMove/ProductStorageMoveFullData";
import {ProductStorageMoveAPI} from "../../../entities/api/Acts/ProductStorageMoveAPI";
import {LocalStorage} from "../../../entities";

interface StorageProductsTransferArchiveModalStore {
    openStorageProductsTransferArchiveModal: boolean
    setOpenStorageProductsTransferArchiveModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    archive: ProductStorageMoveFullData[]
    getTransferProducts: () => void

    toTransfer: (onSuccess: () => void, onFail: () => void) => void
    execute: (onSuccess: () => void, onFail: () => void) => void
    selected: ProductStorageMoveFullData | null
    setSelected: (n: ProductStorageMoveFullData) => void

    openContext: { o: boolean, x: number, y: number }
    setOpenContext: (v: { o: boolean, x: number, y: number }) => void
}

const useStorageProductsTransferArchiveModalStore = create<StorageProductsTransferArchiveModalStore>()(persist(devtools(immer((set, get) => ({
    openContext: {o: false, x: 0, y: 0},
    setOpenContext: (v) => {
        set({openContext: v})
    },
    selected: null,
    setSelected: (n) => {
        set({selected: n})
    },
    openStorageProductsTransferArchiveModal: false,
    setOpenStorageProductsTransferArchiveModal: (value) => set(
        {openStorageProductsTransferArchiveModal: value}),
    isLoading: false,
    errorStatus: 'default',

    archive: [],
    getTransferProducts: () => {
        set({isLoading: true});
        ProductStorageMoveAPI.getByShop(LocalStorage.shopId()!, 100).then(res => {
            set(state => {
                state.archive = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    toTransfer: (s, f) => {
        set({isLoading: true});
        ProductStorageMoveAPI.transfer(get().selected!.productMove.id, LocalStorage.userId()!).then(res => {
            set({
                archive: get().archive.map(n => {
                    if (n.productMove.id === res.data.productMove.id) return res.data
                    else return n
                })
            })
            set({isLoading: false})
            s()
        }).catch((error: any) => {
            f()
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
    execute: (s, f) => {
        set({isLoading: true});
        ProductStorageMoveAPI.execute(get().selected!.productMove.id, LocalStorage.userId()!).then(res => {
            set({
                archive: get().archive.map(n => {
                    if (n.productMove.id === res.data.productMove.id) return res.data
                    else return n
                })
            })
            set({isLoading: false})
            s()
        }).catch((error: any) => {
            set({errorStatus: 'error'})
            f()
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
}))), {
    name: "storageProductsTransferArchiveModalStoreStore",
    version: 1
}));

export default useStorageProductsTransferArchiveModalStore;