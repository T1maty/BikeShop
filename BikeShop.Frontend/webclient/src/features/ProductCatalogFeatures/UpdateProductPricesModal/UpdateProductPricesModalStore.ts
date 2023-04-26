import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {UpdateProductPrices, CatalogAPI, Product} from "../../../entities"
import {ErrorStatusTypes} from "../../../entities/enumerables/ErrorStatusTypes"

interface UpdateProductPricesModalStore {
    openUpdateProductPricesModal: boolean
    setOpenUpdateProductPricesModal: (value: boolean, product: Product) => void
    isLoading: boolean
    errorStatus: ErrorStatusTypes

    product: Product
    updateProductPrices: (data: UpdateProductPrices) => void
}

const useUpdateProductPricesModal = create<UpdateProductPricesModalStore>()(persist(devtools(immer((set) => ({
    openUpdateProductPricesModal: false,
    setOpenUpdateProductPricesModal: (value, product) => {
        set({openUpdateProductPricesModal: value})
        set({product: product})
    },
    isLoading: false,
    errorStatus: 'default',

    product: {} as Product,
    updateProductPrices: (data) => {
        set({isLoading: true})
        CatalogAPI.updateProductPrices(data).then((res: any) => {
            set({isLoading: false})
            set({errorStatus: 'success'})
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