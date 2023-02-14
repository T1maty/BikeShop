import React from 'react';
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {IProductTag} from "../../../entities";
import TagTreeViewContextMenu from "./TagTreeViewContextMenu";
import TagTreeViewNodes from "./TagTreeViewNodes";
import {CreateTagModal} from "../../../features";
import useTagTreeView from './TagTreeViewStore';

const TagTreeView = () => {

    const setTreeViewData = useTagTreeView(s => s.setTreeViewTags)
    const expanded = useTagTreeView(s => s.expandedTags)
    const handleExpanded = useTagTreeView(s => s.handleExpand)
    const selected = useTagTreeView(s => s.selectedTag)
    const setSelected = useTagTreeView(s => s.setSelectedTag)
    const fetchTags = useTagTreeView(s => s.fetchTags)
    const setContextVisible = useTagTreeView(s => s.setContextMenuVisible)
    const addTag = useTagTreeView(s => s.addNewTag)


    React.useEffect(() => {
        fetchTags().then((r) => {
            setTreeViewData(r.data.tags as IProductTag[])
        })
    }, [])


    return (
        <Box sx={{

            flexGrow: 1,
            maxWidth: 400,
            overflowY: "auto",
            backgroundColor: '#33373B',
            borderRadius: 5,
            p: 2,
            m: 2
        }}
             onContextMenu={(event) => {
                 event.preventDefault()
             }}
        >
            <CreateTagModal onSeccuss={addTag}/>
            <TagTreeViewContextMenu/>
            <TreeView
                aria-label="controlled"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                expanded={expanded}
                selected={[selected]}
                onContextMenu={(event) => {
                    setContextVisible(true, event.clientX, event.clientY)
                }}
                onDoubleClickCapture={() => {
                    handleExpanded()
                }}
                onNodeSelect={(event: any, nodeId: string[]) => {
                    setSelected(nodeId[0])

                }}
                onNodeFocus={(event, nodeId) => {
                    setSelected(nodeId)
                }}
            >
                <TagTreeViewNodes/>
            </TreeView>
        </Box>
    );
};

export default TagTreeView;