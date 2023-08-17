import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CatalogAPI, CreateTag, ProductCategory} from "../../../entities"
import {AxiosResponse} from 'axios'

interface createTagModalStore {
    openCreateTagModal: boolean
    setOpenCreateTagModal: (value: boolean) => void

    parentNode: ProductCategory | null,
    setParentNode: (node: ProductCategory | null) => void

    createTag: (tag: CreateTag) => Promise<AxiosResponse>
}

const useCreateTagModal = create<createTagModalStore>()(persist(devtools(immer((set) => ({
    openCreateTagModal: false,
    setOpenCreateTagModal: (value) => set({openCreateTagModal: value}),

    parentNode: null,
    setParentNode: (node) => set({parentNode: node}),

    createTag: (tag) => {
        return CatalogAPI.createProductTag(tag)
    }
}))), {
    name: "createTagModalStore",
    version: 1
}));

export default useCreateTagModal;