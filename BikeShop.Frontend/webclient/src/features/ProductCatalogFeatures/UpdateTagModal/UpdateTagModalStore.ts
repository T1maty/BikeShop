import {ProductTag, UpdateTag} from "../../../entities"
import {AxiosResponse} from "axios"
import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {$api} from "../../../shared"

interface createTagModalStore {
    open: boolean
    openTagModal: (tag: ProductTag) => void
    closeTagModal: () => void

    targetTag: ProductTag

    updateTag: (tag: UpdateTag) => Promise<AxiosResponse>
}

const useUpdateTagModal = create<createTagModalStore>()(persist(devtools(immer((set) => ({
    open: false,
    targetTag: {} as ProductTag,

    openTagModal: (tag) => {
        set({open: true})
        set({targetTag: tag})
    },

    closeTagModal: () => {
        set({open: false})
        set({targetTag: {} as ProductTag})
    },

    updateTag: (tag) => {
        return $api.put('/tag/update', tag)
    }
}))), {
    name: "updateTagModalStore",
    version: 1
}));

export default useUpdateTagModal;