import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {UpdateProductPrices, CatalogAPI} from "../../../entities"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"

interface UpdateProductPricesModalStore {
    openUpdateProductPricesModal: boolean
    setOpenUpdateProductPricesModal: (value: boolean) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    updateProductPrices: (data: UpdateProductPrices) => void
}

const useUpdateProductPricesModal = create<UpdateProductPricesModalStore>()(persist(devtools(immer((set) => ({
    openUpdateProductPricesModal: false,
    setOpenUpdateProductPricesModal: (value) => set(
        {openUpdateProductPricesModal: value}),
    isLoading: false,
    errorStatus: 'default',

    updateProductPrices: (data) => {
        set({isLoading: true})
        CatalogAPI.updateProductPrices(data).then((res: any) => {
            set({isLoading: false})
        }).catch((error: any) => {
            set({errorStatus: 'error'})
            console.log(error)
        }).finally(() => {
            set({errorStatus: 'default'})
            set({isLoading: false})
        })
    },
}))), {
    name: "updateProductPricesModalStore",
    version: 1
}));

export default useUpdateProductPricesModal;