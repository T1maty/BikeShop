import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {ICreateProduct, IProduct} from "../../entities";
import {AxiosResponse} from "axios";
import {$api} from "../../shared";

interface createProductModalStore {
    open: boolean,
    setOpen: (value: boolean) => void,

    create: (data: ICreateProduct) => Promise<AxiosResponse<IProduct>>
}

const useCreateProductModal = create<createProductModalStore>()(persist(devtools(immer((set) => ({
    open: false,
    setOpen: (value) => set({open: value}),
    create: (data) => {
        return $api.post<IProduct>('/product/create', data)
    }
}))), {
    name: "creatProductModalStore",
    version: 1
}));

export default useCreateProductModal