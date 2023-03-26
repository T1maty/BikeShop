import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {ProductTag, ProductTagResponse, UpdateTag} from "../../../../entities";
import {AxiosResponse} from "axios";
import {$api} from "../../../../shared";

interface tagTreeViewStore {
    treeViewTags: ProductTag[],
    contextMenuVisible: boolean,
    contextMenuXY: { X: number, Y: number }

    setContextMenuVisible: (value: boolean, X: number, Y: number) => void

    setTreeViewTags: (tags: ProductTag[]) => void,
    addTreeViewTag: (tag: ProductTag) => void,
    removeTreeViewTag: (tagId: string) => void,
    addNewTag: (tag: ProductTag) => void
    updateTag: (tag: UpdateTag) => void

    expandedTags: string[]
    selectedTag: string
    setSelectedTag: (id: string) => void
    setExpandedTags: (id: string[]) => void

    handleExpand: (id: string) => void

    fetchTags: () => Promise<AxiosResponse<ProductTagResponse>>
    deleteTag: (tagId: string) => Promise<AxiosResponse>

}

const useTagTreeView = create<tagTreeViewStore>()(persist(devtools(immer((set, get) => ({
    treeViewTags: [],
    contextMenuVisible: false,
    contextMenuXY: {X: 0, Y: 0},

    deleteTag: (tagId) => {
        return $api.put('')
    },
    setContextMenuVisible: (value, x, y) => set({
        contextMenuVisible: value,
        contextMenuXY: {X: x, Y: y},
    }),

    updateTag: (tag) => set(state => {
        let EditTag = state.treeViewTags.filter((n) => {
            if (n.id == tag.id) return n
        })[0]
        EditTag.name = tag.name
        EditTag.isB2BVisible = tag.isB2BVisible
        EditTag.isRetailVisible = tag.isRetailVisible
        EditTag.isUniversal = tag.isUniversal
        EditTag.sortOrder = tag.sortOrder
        EditTag.updatedAt = Date.toString()
    }),

    setTreeViewTags: (tags) => set({
        treeViewTags: tags
    }),
    addTreeViewTag: (tag) => set(state => {
        state.treeViewTags.push(tag)
    }),
    removeTreeViewTag: (tagId) => set(state => {
        state.treeViewTags.filter((value) => {
            return value.id != tagId
        })
    }),

    expandedTags: [],
    selectedTag: "",

    setSelectedTag: (id) => set({
        selectedTag: id
    }),
    setExpandedTags: (id) => set({
        expandedTags: id
    }),

    handleExpand: (id) => {
        if (get().expandedTags.includes(id)) {
            set({
                expandedTags: get().expandedTags.filter(n => {
                    if (n != id) return n
                })
            })
        } else {
            set(state => {
                state.expandedTags.push(id)
            })
        }

    },

    fetchTags: () => {
        return $api.get<ProductTagResponse>('/tag/getall');
    },

    addNewTag: (tag) => {
        set(state => {
            state.treeViewTags.push(tag)
            state.expandedTags.push(tag.id.toString())
        })
    },

}))), {
    name: "tagTreeViewStore",
    version: 1
}));

export default useTagTreeView;