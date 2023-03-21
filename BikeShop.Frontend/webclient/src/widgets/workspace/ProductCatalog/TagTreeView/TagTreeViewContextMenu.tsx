import React from 'react'
import MenuItem from "@mui/material/MenuItem"
import {IProductTag} from "../../../../entities"
import {Menu} from "@mui/material"
import useCreateTagModal from '../../../../features/CreateTagModal/CreateTagModalStore'
import useTagTreeView from './TagTreeViewStore'
import useCreateProductModal from "../../../../features/CreateProductModal/CreateProductModalStore"
import useUpdateTagModal from '../../../../features/UpdateTagModal/UpdateTagModalStore';

const TagTreeViewContextMenu = () => {

    const contextMenuVisible = useTagTreeView(s => s.contextMenuVisible)
    const contextXY = useTagTreeView(s => s.contextMenuXY)
    const setOpenCreateTagModal = useCreateTagModal(s => s.setOpenCreateTagModal)
    const setParentNode = useCreateTagModal(s => s.setParentNode)
    const setContextVisible = useTagTreeView(s => s.setContextMenuVisible)
    const treeViewData = useTagTreeView(s => s.treeViewTags)
    const selected = useTagTreeView(s => s.selectedTag)
    const openUpdateTag = useUpdateTagModal(s => s.openTagModal)
    const selectedTag = useTagTreeView(s => s.selectedTag)
    const allTags = useTagTreeView(s => s.treeViewTags)
    const openCreateProduct = useCreateProductModal(s => s.setTagAndOpen)

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
            <MenuItem onClick={() => {
                setContextVisible(false, 0, 0)
                let tag = treeViewData.filter((n) => {
                    return n.id == selected
                })[0]
                openCreateProduct(tag)
            }}
            >
                Добавить товар с выбранным тегом
            </MenuItem>

            <MenuItem onClick={() => {
                setContextVisible(false, 0, 0)
                let tag = treeViewData.filter((n) => {
                    return n.id == selected
                })[0]
                openUpdateTag(tag)
            }}
            >
                Редактировать
            </MenuItem>

            <MenuItem onClick={() => {
                setContextVisible(false, 0, 0)
                setParentNode({} as IProductTag)
                setOpenCreateTagModal(true)
            }}
            >
                Создать в корне
            </MenuItem>

            <MenuItem onClick={() => {
                setContextVisible(false, 0, 0)
                setParentNode(treeViewData.filter((n) => {
                    return n.id == selected
                })[0])
                setOpenCreateTagModal(true)
            }}
            >
                Создать потомка
            </MenuItem>

            <MenuItem>Переместить</MenuItem>
            <MenuItem onClick={() => {}}>Удалить</MenuItem>
        </Menu>
    );
};

export default TagTreeViewContextMenu;