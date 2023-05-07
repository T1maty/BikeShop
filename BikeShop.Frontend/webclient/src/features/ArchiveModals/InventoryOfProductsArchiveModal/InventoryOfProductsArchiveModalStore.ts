import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {InventarizationAPI, LocalStorage} from "../../../entities"
import {InventarizationFullData}
    from "../../../pages/workspace/ProductsCount/InventarizationPage/models/InventarizationFullData"
import {InventoryLackFullData}
    from "../../../pages/workspace/ProductsCount/InventarizationPage/models/InventoryLackFullData"

interface InventoryOfProductsArchiveModalStore {
    openInventoryOfProductsArchiveModal: boolean
    setOpenInventoryOfProductsArchiveModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    archive: InventarizationFullData[]
    getArchive: () => void
    setArchive: (v: InventarizationFullData[]) => void

    lackArchive: InventoryLackFullData[]
    getLackArchive: () => void
    setLackArchive: (v: InventoryLackFullData[]) => void

    selected: InventarizationFullData | null
    setSelected: (v: InventarizationFullData) => void
}

const useInventoryOfProductsArchiveModal = create<InventoryOfProductsArchiveModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    setLackArchive: (v) => {
        set({lackArchive: v})
    },
    selected: null,
    setSelected: (v) => {
        set({selected: v})
    },
    lackArchive: [],
    getLackArchive: () => {
        InventarizationAPI.getLackByShop(LocalStorage.shopId()!).then(n => {
            set({lackArchive: n.data})
        })
    },
    setArchive: (v) => {
        set({archive: v})
    },
    openInventoryOfProductsArchiveModal: false,
    setOpenInventoryOfProductsArchiveModal: (value) => set({
        openInventoryOfProductsArchiveModal: value
    }),
    isLoading: false,
    errorStatus: 'default',

    archive: [],
    getArchive: () => {
        set({isLoading: true})
        InventarizationAPI.getByShop(1, 100).then((res: any) => {
            set(state => {
                state.archive = res.data
            })
            set({isLoading: false})
        }).catch((error: any) => {
            console.log('inv load error', error);
            set({errorStatus: 'error'})
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
})))/*, {
    name: "inventoryOfProductsArchiveModal",
    version: 1
})*/);

export default useInventoryOfProductsArchiveModal;