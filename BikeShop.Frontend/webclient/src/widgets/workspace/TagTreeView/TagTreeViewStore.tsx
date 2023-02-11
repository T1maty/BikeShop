import React from "react";
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

    expandedTags: string[]
    selectedTag: string
    setSelectedTag: (id: string) => void
    setExpandedTags: (id: string[]) => void
    handleSelect: (event: React.SyntheticEvent, nodeIds: string[]) => void
    handleExpand: (event: React.SyntheticEvent, nodeIds: string[]) => void

    fetchTags: () => Promise<AxiosResponse<IProductTagResponse>>

}

const useTagTreeView = create<tagTreeViewStore>()(persist(devtools(immer((set) => ({
    treeViewTags: [],
    contextMenuVisible: false,
    contextMenuXY: {X: 0, Y: 0},

    setContextMenuVisible: (value, x, y) => set({
        contextMenuXY: {X: x, Y: y},
        contextMenuVisible: value
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
    handleSelect: (event, nodeIds) => set({
        selectedTag: nodeIds[0]
    }),
    handleExpand: (event, nodeIds) => set({
        expandedTags: nodeIds
    }),

    fetchTags: () => {
        return $api.get<IProductTagResponse>('/tag/getall');
    },


}))), {
    name: "tagTreeViewStore",
    version: 1
}));

export default useTagTreeView;