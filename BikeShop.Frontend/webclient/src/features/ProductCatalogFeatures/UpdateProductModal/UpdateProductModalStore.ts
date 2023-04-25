import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CatalogAPI, Product, UpdateProduct} from "../../../entities"
import {AxiosResponse} from "axios"

interface UpdateProductModalStore {
    openUpdateProductModal: boolean
    setOpenUpdateProductModal: (value: boolean, product: Product) => void
    product: Product
    update: (data: UpdateProduct) => Promise<AxiosResponse>
}

const useUpdateProductModal = create<UpdateProductModalStore>()(persist(devtools(immer((set) => ({
    openUpdateProductModal: false,
    setOpenUpdateProductModal: (value, product) => {
        set({openUpdateProductModal: value})
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