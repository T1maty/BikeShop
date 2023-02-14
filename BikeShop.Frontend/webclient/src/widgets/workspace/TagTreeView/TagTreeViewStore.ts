import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {IProductTag, IProductTagResponse} from "../../../entities";
import {AxiosResponse} from "axios";
import {$api} from "../../../shared";

interface tagTreeViewStore {
    treeViewTags: IProductTag[],
    contextMenuVisible: boolean,
    contextMenuXY: { X: number, Y: number }

    setContextMenuVisible: (value: boolean, X: number, Y: number) => void

    setTreeViewTags: (tags: IProductTag[]) => void,
    addTreeViewTag: (tag: IProductTag) => void,
    removeTreeViewTag: (tagId: string) => void,
    addNewTag: (tag: IProductTag) => void

    expandedTags: string[]
    selectedTag: string
    setSelectedTag: (id: string) => void
    setExpandedTags: (id: string[]) => void

    handleExpand: () => void

    fetchTags: () => Promise<AxiosResponse<IProductTagResponse>>

}

const useTagTreeView = create<tagTreeViewStore>()(persist(devtools(immer((set, get) => ({
    treeViewTags: [],
    contextMenuVisible: false,
    contextMenuXY: {X: 0, Y: 0},

    setContextMenuVisible: (value, x, y) => set({
        contextMenuVisible: value,
        contextMenuXY: {X: x, Y: y},
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

    handleExpand: () => {
        if (get().expandedTags.includes(get().selectedTag)) {
            set({
                expandedTags: get().expandedTags.filter(n => {
                    if (n != get().selectedTag) return n
                })
            })
        } else {
            set(state => {
                state.expandedTags.push(state.selectedTag)
            })
        }

    },

    fetchTags: () => {
        return $api.get<IProductTagResponse>('/tag/getall');
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