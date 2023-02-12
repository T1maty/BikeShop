import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {ICreateTag, IProductTag} from "../../entities";
import {AxiosResponse} from 'axios';
import {$api} from "../../shared";

interface createTagModalStore {
    createTagModal: boolean
    setCreateTagModal: (value: boolean) => void

    parentNode: IProductTag,
    setParentNode: (node: IProductTag) => void

    createTag: (tag: ICreateTag) => Promise<AxiosResponse>
}

const useCreateTagModal = create<createTagModalStore>()(persist(devtools(immer((set) => ({
    createTagModal: false,
    parentNode: {} as IProductTag,

    setCreateTagModal: (value) => set({
        createTagModal: value
    }),

    setParentNode: (node) => set({
        parentNode: node
    }),
    createTag: (tag) => {
        return $api.post<ICreateTag>('/tag/create', tag)
    }
}))), {
    name: "createTagModalStore",
    version: 1
}));

export default useCreateTagModal