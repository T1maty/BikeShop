import {UpdateCategory} from "../../../entities"
import {AxiosResponse} from "axios"
import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {$api} from "../../../shared"
import {ProductCategory} from "../../../entities/DataTransferObjects/ProductCategory";

interface createTagModalStore {
    open: boolean
    openTagModal: (tag: ProductCategory) => void
    closeTagModal: () => void

    targetTag: ProductCategory | null

    updateTag: (tag: UpdateCategory) => Promise<AxiosResponse>
    moveTag: (tag: UpdateCategory, parentId: number, onSuccess: (r: ProductCategory) => void, onFail: () => void) => void
}

const useUpdateTagModal = create<createTagModalStore>()(persist(devtools(immer((set) => ({
    open: false,
    targetTag: null,

    moveTag: (tag, parentId, onSuccess, onFail) => {

        let data: UpdateCategory = {
            id: tag.id,
            name: tag.name,
            parentId: parentId,
            isCollapsed: tag.isCollapsed,
            isRetailVisible: tag.isRetailVisible,
            isB2BVisible: tag.isB2BVisible,
            sortOrder: tag.sortOrder,
        }
        $api.put('/category/update', data).then((r: AxiosResponse<ProductCategory>) => {
            onSuccess(r.data)
        }).catch(() => {
            onFail()
        })


    },
    openTagModal: (tag) => {
        set({open: true})
        set({targetTag: tag})
    },

    closeTagModal: () => {
        set({open: false})
        set({targetTag: null})
    },

    updateTag: (tag) => {
        return $api.put('/category/update', tag)
    }
}))), {
    name: "updateTagModalStore",
    version: 1
}));

export default useUpdateTagModal;