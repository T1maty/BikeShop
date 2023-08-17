import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CatalogAPI} from "../../../../entities"
import {AxiosResponse} from "axios"
import {$api} from "../../../../shared"
import {ProductCategory} from "../../../../entities/entities/ProductCategory";

interface TagTreeViewStore {
    contextMenuVisible: boolean
    setContextMenuVisible: (value: boolean, X: number, Y: number) => void
    contextMenuXY: { X: number, Y: number }

    treeViewTags: ProductCategory[]
    setTreeViewTags: (tags: ProductCategory[]) => void
    addTreeViewTag: (tag: ProductCategory) => void
    removeTreeViewTag: (tagId: number) => void

    selectedTag: number
    setSelectedTag: (id: number) => void
    expandedTags: string[]
    setExpandedTags: (id: string[]) => void
    handleExpand: (id: string) => void

    fetchTags: () => void
    addNewTag: (tag: ProductCategory) => void
    deleteTag: (tagId: string) => Promise<AxiosResponse>
    updateTag: (tag: ProductCategory) => void


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
        state.treeViewTags = state.treeViewTags.filter((value) => {
            return value.id != tagId
        })
    }),

    selectedTag: 0,
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
        CatalogAPI.fetchTags().then((r) => {
            get().setTreeViewTags(r.data)
        })
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
    updateTag: (tag) => {
        let data = get().treeViewTags.map((n) => {
            if (n.id != tag.id) return n
            return tag
        })
        set({treeViewTags: data})
    },
}))), {
    name: "tagTreeViewStore",
    version: 1
}));

export default useTagTreeView;