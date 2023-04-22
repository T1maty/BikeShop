import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"
import {SupplyInvoiceAPI} from "../../../entities"

interface InventoryOfProductsArchiveModalStore {
    openInventoryOfProductsArchiveModal: boolean
    setOpenInventoryOfProductsArchiveModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    archive: any[]
    getArchive: () => void
}

const useInventoryOfProductsArchiveModal = create<InventoryOfProductsArchiveModalStore>()(/*persist(*/devtools(immer((set, get) => ({
    openInventoryOfProductsArchiveModal: false,
    setOpenInventoryOfProductsArchiveModal: (value: boolean) => set({
        openInventoryOfProductsArchiveModal: value
    }),
    isLoading: false,
    errorStatus: 'default',

    archive: [],
    getArchive: () => {
        set({isLoading: true})
        SupplyInvoiceAPI.getByShop(1, 100).then((res: any) => {
            console.log("архив инкассации", res.data)
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
})))/*, {
    name: "inventoryOfProductsArchiveModal",
    version: 1
})*/);

export default useInventoryOfProductsArchiveModal;