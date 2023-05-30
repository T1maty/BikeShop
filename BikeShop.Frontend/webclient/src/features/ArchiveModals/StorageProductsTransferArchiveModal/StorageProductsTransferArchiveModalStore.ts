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
}

const useStorageProductsTransferArchiveModalStore = create<StorageProductsTransferArchiveModalStore>()(persist(devtools(immer((set) => ({
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

}))), {
    name: "storageProductsTransferArchiveModalStoreStore",
    version: 1
}));

export default useStorageProductsTransferArchiveModalStore;