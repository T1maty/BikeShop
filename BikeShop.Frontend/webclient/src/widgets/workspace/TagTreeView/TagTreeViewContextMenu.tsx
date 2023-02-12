import React from 'react';
import MenuItem from "@mui/material/MenuItem";
import {IProductTag} from "../../../entities";
import {Menu} from "@mui/material";
import useCreateTagModal from '../../../features/CreateTagModal/CreateTagModalStore';
import useTagTreeView from './TagTreeViewStore';

const TagTreeViewContextMenu = () => {
    const contextMenuVisible = useTagTreeView(s => s.contextMenuVisible)
    const contextXY = useTagTreeView(s => s.contextMenuXY)
    const setCreateTagModal = useCreateTagModal(s => s.setCreateTagModal)
    const setParentNode = useCreateTagModal(s => s.setParentNode)
    const setContextVisible = useTagTreeView(s => s.setContextMenuVisible)
    const treeViewData = useTagTreeView(s => s.treeViewTags)
    const selected = useTagTreeView(s => s.selectedTag)

    return (
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
                setParentNode({} as IProductTag)
                setCreateTagModal(true)
            }}>Создать в корне</MenuItem>
            <MenuItem onClick={() => {
                setContextVisible(false, 0, 0)
                setParentNode(treeViewData.filter((n) => {
                    return n.id == selected
                })[0])
                setCreateTagModal(true)
            }}>Создать потомка</MenuItem>
            <MenuItem>Переместить</MenuItem>
            <MenuItem onClick={() => {
                console.log(contextMenuVisible)
            }}>Удалить</MenuItem>
        </Menu>
    );
};

export default TagTreeViewContextMenu;