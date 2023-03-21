import React, {useEffect} from 'react'
import Box from "@mui/material/Box"
import TreeView from "@mui/lab/TreeView"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import {IProductTag} from "../../../../entities"
import TagTreeViewContextMenu from "./TagTreeViewContextMenu"
import {TagTreeViewNodes} from "./TagTreeViewNodes"
import {CreateTagModal, UpdateTagModal} from "../../../../features"
import useTagTreeView from './TagTreeViewStore'

export const TagTreeView = () => {

    const setTreeViewData = useTagTreeView(s => s.setTreeViewTags)
    const expanded = useTagTreeView(s => s.expandedTags)
    const selected = useTagTreeView(s => s.selectedTag)
    const fetchTags = useTagTreeView(s => s.fetchTags)
    const addTag = useTagTreeView(s => s.addNewTag)
    const updateTag = useTagTreeView(s => s.updateTag)

    useEffect(() => {
        fetchTags().then((r) => {setTreeViewData(r.data.tags as IProductTag[])})
    }, [])


    return (
        <Box sx={{
            flexGrow: 1,
            maxWidth: 400,
            maxHeight: 100,
            backgroundColor: '#33373B',
            borderRadius: 5,
            p: 2,
            m: 2
        }}
             onContextMenu={(event) => {
                 event.preventDefault()
             }}
        >
            <UpdateTagModal onSuccess={updateTag}/>
            <CreateTagModal onSuccess={addTag}/>
            <TagTreeViewContextMenu/>
            <TreeView
                aria-label="controlled"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                expanded={expanded}
                selected={[selected]}
            >
                <TagTreeViewNodes/>
            </TreeView>
        </Box>
    )
}