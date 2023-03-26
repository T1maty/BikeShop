import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CreateTag, ProductTag} from "../../../entities"
import {AxiosResponse} from 'axios'
import {CatalogAPI} from '../../../entities/api/CatalogAPI'

interface createTagModalStore {
    openCreateTagModal: boolean
    setOpenCreateTagModal: (value: boolean) => void

    parentNode: ProductTag,
    setParentNode: (node: ProductTag) => void

    createTag: (tag: CreateTag) => Promise<AxiosResponse>
}

const useCreateTagModal = create<createTagModalStore>()(persist(devtools(immer((set) => ({
    openCreateTagModal: false,
    setOpenCreateTagModal: (value) => set({openCreateTagModal: value}),

    parentNode: {} as ProductTag,
    setParentNode: (node) => set({parentNode: node}),

    createTag: (tag) => {
        return CatalogAPI.createProductTag(tag).then()
    }
}))), {
    name: "createTagModalStore",
    version: 1
}));

export default useCreateTagModal;