import {ICreateTag, IProductTag} from "../../entities";
import {AxiosResponse} from "axios";
import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {$api} from "../../shared";

interface createTagModalStore {
    open: boolean
    openTagModal: (tag: IProductTag) => void
    closeTagModal: () => void

    targetTag: IProductTag

    updateTag: (tag: ICreateTag) => Promise<AxiosResponse>
}

export const useUpdateTagModal = create<createTagModalStore>()(persist(devtools(immer((set) => ({
    open: false,
    targetTag: {} as IProductTag,

    openTagModal: (tag) => {
        set({open: true})
        set({targetTag: tag})
    },

    closeTagModal: () => {
        set({open: false})
        set({targetTag: {} as IProductTag})
    },

    updateTag: (tag) => {
        return $api.post<IProductTag>('/tag/update', tag)
    }
}))), {
    name: "updateTagModalStore",
    version: 1
}));