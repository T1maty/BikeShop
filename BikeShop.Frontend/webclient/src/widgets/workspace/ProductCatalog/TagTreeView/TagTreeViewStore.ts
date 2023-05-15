import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CatalogAPI, ProductTag, ProductTagResponse, UpdateTag} from "../../../../entities"
import {AxiosResponse} from "axios"
import {$api} from "../../../../shared"

interface TagTreeViewStore {
    contextMenuVisible: boolean
    setContextMenuVisible: (value: boolean, X: number, Y: number) => void
    contextMenuXY: { X: number, Y: number }

    treeViewTags: ProductTag[]
    setTreeViewTags: (tags: ProductTag[]) => void
    addTreeViewTag: (tag: ProductTag) => void
    removeTreeViewTag: (tagId: string) => void

    selectedTag: string
    setSelectedTag: (id: string) => void
    expandedTags: string[]
    setExpandedTags: (id: string[]) => void
    handleExpand: (id: string) => void

    fetchTags: () => Promise<AxiosResponse<ProductTagResponse>>
    addNewTag: (tag: ProductTag) => void
    deleteTag: (tagId: string) => Promise<AxiosResponse>
    updateTag: (tag: UpdateTag) => void
}

const useTagTreeView = create<TagTreeViewStore>()(persist(devtools(immer((set, get) => ({
    contextMenuVisible: false,
    setContextMenuVisible: (value, x, y) => set({
        contextMenuVisible: value,
        contextMenuXY: {X: x, Y: y},
    }),
    contextMenuXY: {X: 0, Y: 0},

    treeViewTags: [],
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

    selectedTag: '',
    setSelectedTag: (id) => set({
        selectedTag: id
    }),
    expandedTags: [],
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
        return CatalogAPI.fetchTags()
    },
    addNewTag: (tag) => {
        set(state => {
            state.treeViewTags = [...state.treeViewTags, tag]
            state.expandedTags = [...state.expandedTags, tag.id.toString()]
        })
    },
    deleteTag: (tagId) => {
        return $api.put('')
    },
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
}))), {
    name: "tagTreeViewStore",
    version: 1
}));

export default useTagTreeView;