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
    moveTag: (tag: ProductTag, parentId: string, onSuccess: (r: ProductTag) => void, onFail: () => void) => void
}

const useUpdateTagModal = create<createTagModalStore>()(persist(devtools(immer((set) => ({
    open: false,
    targetTag: {} as ProductTag,

    moveTag: (tag, parentId, onSuccess, onFail) => {
        let data: UpdateTag = {
            id: tag.id,
            name: tag.name,
            parentId: parentId,
            isCollapsed: tag.isCollapsed,
            isRetailVisible: tag.isRetailVisible,
            isB2BVisible: tag.isB2BVisible,
            isUniversal: tag.isUniversal,
            sortOrder: tag.sortOrder,
        }
        $api.put('/tag/update', data).then((r) => {
            let tag1 = tag
            tag1.parentId = parentId
            onSuccess(tag1)
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