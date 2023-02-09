import React from 'react';
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {IProductTag} from "../../../entities";
import TreeItem from "@mui/lab/TreeItem";
import useTagTreeView from "./tagTreeViewStore";
import {Menu} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {CreateTagModal, useCreateTagModal} from "../../../features";

const TagTreeView = () => {

    const treeViewData = useTagTreeView(s => s.treeViewTags)
    const setTreeViewData = useTagTreeView(s => s.setTreeViewTags)
    const expanded = useTagTreeView(s => s.expandedTags)
    const selected = useTagTreeView(s => s.selectedTag)
    const setSelected = useTagTreeView(s => s.setSelectedTag)
    const hExpanden = useTagTreeView(s => s.handleExpand)
    const hSelected = useTagTreeView(s => s.handleSelect)
    const fetchTags = useTagTreeView(s => s.fetchTags)
    const contextMenuVisible = useTagTreeView(s => s.contextMenuVisible)
    const contextXY = useTagTreeView(s => s.contextMenuXY)
    const setContextVisible = useTagTreeView(s => s.setContextMenuVisible)
    const setCreateTagModal = useCreateTagModal(s => s.setCreateTagModal)

    React.useEffect(() => {
        fetchTags().then((r) => {
            setTreeViewData(r.data.workGroups as IProductTag[])
        })
    }, [])

    function createTree(parentId: string = '0') {
        const nodesToAdd: IProductTag[] = [];

        if (treeViewData.length > 0) {
            treeViewData.map((n) => {
                if (n.parentId == parentId) nodesToAdd.push(n);
            });
        }

        if (nodesToAdd.length > 0) {
            return nodesToAdd?.map((n) => {
                return (
                    <TreeItem
                        nodeId={n.id.toString()}
                        label={n.name} key={n.id}>
                        {createTree(n.id)}
                    </TreeItem>
                );
            });
        }
    }

    function handeleContextClose() {

    }

    return (
        <Box sx={{

            flexGrow: 1,
            maxWidth: 400,
            overflowY: "auto",
            backgroundColor: '#33373B',
            borderRadius: 5,
            p: 2,
            m: 2
        }}>
            <CreateTagModal/>
            <Menu
                onContextMenu={(event) => {
                    event.preventDefault()
                    setContextVisible(false, 0, 0)
                }}
                open={contextMenuVisible}
                onClose={() => {
                    setContextVisible(false, 0, 0)
                }}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenuVisible
                        ? {top: contextXY.Y, left: contextXY.X}
                        : undefined
                }
            >
                <MenuItem>Редактировать</MenuItem>
                <MenuItem onClick={() => {
                    setContextVisible(false, 0, 0)
                    setCreateTagModal(true)
                }}>Создать в корне</MenuItem>
                <MenuItem onClick={() => {
                    setContextVisible(false, 0, 0)
                }}>Создать потомка</MenuItem>
                <MenuItem>Переместить</MenuItem>
                <MenuItem>Удалить</MenuItem>
            </Menu>
            <TreeView

                onContextMenu={
                    (event) => {
                        event.preventDefault()
                        setContextVisible(true, event.clientX, event.clientY)


                    }
                }
                onNodeFocus={(event, nodeId) => {
                    setSelected(nodeId)
                }}
                aria-label="controlled"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                expanded={expanded}
                selected={[selected]}
                onNodeToggle={hExpanden}
                onNodeSelect={hSelected}
            >
                {createTree()}
            </TreeView>
        </Box>
    );
};

export default TagTreeView;