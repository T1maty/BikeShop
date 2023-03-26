import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {Product, UpdateProduct} from "../../../entities"
import {AxiosResponse} from "axios"
import {CatalogAPI} from '../../../entities/api/CatalogAPI'

interface createProductModalStore {
    open: boolean
    setOpen: (value: boolean, product: Product) => void
    product: Product
    update: (data: UpdateProduct) => Promise<AxiosResponse>
}

const useUpdateProductModal = create<createProductModalStore>()(persist(devtools(immer((set) => ({
    open: false,
    setOpen: (value, product) => {
        set({open: value})
        set({product: product})
    },
    product: {} as Product,
    update: (data) => {
        return CatalogAPI.updateProduct(data).then()
    }
}))), {
    name: "creatUpdateModalStore",
    version: 1
}));

export default useUpdateProductModal;