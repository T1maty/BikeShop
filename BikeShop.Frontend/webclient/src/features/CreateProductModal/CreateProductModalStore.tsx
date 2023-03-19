import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {ICreateProduct, IProduct, IProductTag} from "../../entities";
import {AxiosResponse} from "axios";
import {$api} from "../../shared";

interface createProductModalStore {
    open: boolean
    setOpen: (value: boolean) => void
    tags: IProductTag[]
    setTagAndOpen: (tag: IProductTag) => void
    create: (data: ICreateProduct) => Promise<AxiosResponse<IProduct>>
}

const useCreateProductModal = create<createProductModalStore>()(persist(devtools(immer((set, get) => ({
    open: false,
    setOpen: (value) => {
        set({open: value})
        if (!value) set({tags: []})
    },
    tags: [],
    setTagAndOpen: (tag) => {
        set({open: true})
        set({tags: [tag]})
    },
    create: (data) => {
        return $api.post<IProduct>('/product/create', data)
    }
}))), {
    name: "creatProductModalStore",
    version: 1
}));

export default useCreateProductModal;