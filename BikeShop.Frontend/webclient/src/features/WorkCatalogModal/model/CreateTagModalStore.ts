import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {IProductTag} from "../../../entities";
import {AxiosResponse} from 'axios';
import {$api} from "../../../shared";
import {DeepPartial} from "react-hook-form";
import {postGroup} from "../types/postGroup";

interface parentNode {
    id: number,
    createdAt: string,
    updatedAt: string,
    enabled: boolean,
    name: string,
    parentId: number,
    isCollapsed: boolean,
    shopId: number
}

interface createTagModalStore {
    open: boolean
    setOpen: (data: any) => void
    setClose: () => void
    parentNode: DeepPartial<parentNode>,
    variant: any
    createTag: (dataTag: postGroup) => Promise<AxiosResponse> | any
}


const useCreateWorkTagModal = create<createTagModalStore>()(persist(devtools(immer((set, get) => ({
    open: false,
    parentNode: {},
    variant: '',
    setOpen: (data: any) => {
        switch (data.variant) {
            case 'Создать в корне':
                set({
                    open: true,
                    parentNode: {
                        ...data.data,
                        parentId: 0,
                    },
                    variant: data?.variant
                })
                break
            case 'Создать потомка':
                set({
                    open: true,
                    parentNode: {
                        ...data.data,
                        parentId: data.data.id,
                    },
                    variant: data?.variant
                })
                break
        }

    },

    setClose: () => {
        set({open: false})
    },

    createTag: (dataTag: postGroup) => {
        return $api.post<postGroup>('/group/create', dataTag)
    }
}))), {
    name: "createTagModalStore",
    version: 1
}));

export default useCreateWorkTagModal
