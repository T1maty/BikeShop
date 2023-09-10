import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {AxiosResponse} from "axios"
import {CatalogAPI, CreateProduct, Product, ProductCategory} from "../../../../entities";

interface createProductModalStore {
    isLoading: boolean
    setIsLoading: (v: boolean) => void
    open: boolean
    setOpen: (value: boolean) => void
    tags: ProductCategory | null
    setTagAndOpen: (tag: ProductCategory) => void
    create: (data: CreateProduct) => Promise<AxiosResponse<Product>>
}

const useCreateProductModal = create<createProductModalStore>()(persist(devtools(immer((set, get) => ({
    isLoading: false,
    setIsLoading: (v) => {
        set({isLoading: v})
    },
    open: false,
    setOpen: (value) => {
        set({open: value})
        if (!value) set({tags: null})
    },
    tags: null,
    setTagAndOpen: (tag) => {
        set({open: true})
        set({tags: tag})
    },
    create: (data) => {
        get().setIsLoading(true)
        return CatalogAPI.createProduct(data).then()
    }
}))), {
    name: "creatProductModalStore",
    version: 1
}));

export default useCreateProductModal;