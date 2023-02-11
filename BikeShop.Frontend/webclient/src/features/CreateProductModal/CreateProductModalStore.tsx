import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {ICreateProduct} from "../../entities";
import {AxiosResponse} from "axios";
import {$api} from "../../shared";

interface createProductModalStore {
    open: boolean,
    setOpen: (value: boolean) => void,

    create: (data: ICreateProduct) => Promise<AxiosResponse>
}

const useCreateProductModal = create<createProductModalStore>()(persist(devtools(immer((set) => ({
    open: false,
    setOpen: (value) => set({open: value}),
    create: (data) => {
        return $api.post<ICreateProduct>('/product/create', data)
    }
}))), {
    name: "creatProductModalStore",
    version: 1
}));

export default useCreateProductModal