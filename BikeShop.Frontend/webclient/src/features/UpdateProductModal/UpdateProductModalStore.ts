import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {IProduct, IUpdateProduct} from "../../entities";
import {AxiosResponse} from "axios";
import {$api} from "../../shared";

interface createProductModalStore {
    open: boolean,
    product: IProduct,
    setOpen: (value: boolean, product: IProduct) => void,
    update: (data: IUpdateProduct) => Promise<AxiosResponse>
}

export const useUpdateProductModal = create<createProductModalStore>()(persist(devtools(immer((set) => ({
    open: false,
    product: {} as IProduct,
    setOpen: (value, product) => {
        set({open: value})
        set({product: product})
    },
    update: (data) => {
        return $api.put<IUpdateProduct>('/product/update', data)
    }
}))), {
    name: "creatUpdateModalStore",
    version: 1
}));