import React, {useEffect, useState} from 'react'
import s from './TagTreeView.module.scss'
import {TagTreeViewContextMenu} from "./TagTreeViewContextMenu"
import useTagTreeView from './TagTreeViewStore'
import {UniTreeView} from "../../../../shared/ui"
import {CreateTagModal} from "../CreateTagModal/CreateTagModal";
import {UpdateTagModal} from "../../../../features";

interface TagTreeViewProps {
    onNodeDoubleClick?: (node: any) => void
    onNodeContext?: (node: any) => void
    onNodeClick?: (node: any) => void
}

export const TagTreeView = (props: TagTreeViewProps) => {

    const fetchTags = useTagTreeView(s => s.fetchTags)
    const addTag = useTagTreeView(s => s.addNewTag)
    const updateTag = useTagTreeView(s => s.updateTag)
    const treeViewData = useTagTreeView(s => s.treeViewTags)
    const setContextMenuVisible = useTagTreeView(s => s.setContextMenuVisible)

    const [selectedN, setSelectedN] = useState()


    useEffect(() => {
        fetchTags()
    }, [])

    return (
        <div className={s.tagTreeView_mainBox}
             onContextMenu={(event) => {
                 event.preventDefault()
             }}
        >
            <CreateTagModal onSuccess={addTag}/>
            <UpdateTagModal onSuccess={updateTag}/>

            <TagTreeViewContextMenu/>

            <UniTreeView data={treeViewData}
                         selected={selectedN}
                         setSelected={setSelectedN}
                         onNodeClick={(node) => {
                             props.onNodeClick ? props.onNodeClick(node) : true
                         }}
                         onNodeContext={(node, event) => {
                             setContextMenuVisible(true, event.clientX, event.clientY)
                             setSelectedN(node)
                             props.onNodeContext ? props.onNodeContext(node) : true
                         }}
                         onNodeDoubleClick={(node) => {
                             props.onNodeDoubleClick ? props.onNodeDoubleClick(node) : true
                         }}
            />
        </div>
    )
}