import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {IProduct, IUpdateProduct} from "../../../entities"
import {AxiosResponse} from "axios"
import {$api} from "../../../shared"

interface createProductModalStore {
    open: boolean
    setOpen: (value: boolean, product: IProduct) => void
    product: IProduct
    update: (data: IUpdateProduct) => Promise<AxiosResponse>
}

const useUpdateProductModal = create<createProductModalStore>()(persist(devtools(immer((set) => ({
    open: false,
    setOpen: (value, product) => {
        set({open: value})
        set({product: product})
    },
    product: {} as IProduct,
    update: (data) => {
        return $api.put<IUpdateProduct>('/product/update', data)
    }
}))), {
    name: "creatUpdateModalStore",
    version: 1
}));

export default useUpdateProductModal;