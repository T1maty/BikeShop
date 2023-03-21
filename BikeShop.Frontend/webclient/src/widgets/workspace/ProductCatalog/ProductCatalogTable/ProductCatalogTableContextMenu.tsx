import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import {Menu} from '@mui/material'
import useProductCatalogTableStore from './ProductCatalogTableStore'
import useCreateProductModal from '../../../../features/CreateProductModal/CreateProductModalStore'
import useTagTreeView from '../TagTreeView/TagTreeViewStore'
import useUpdateProductModal from '../../../../features/UpdateProductModal/UpdateProductModalStore'

export const ProductCatalogTableContextMenu = () => {

    const selected = useProductCatalogTableStore(s => s.selectedRows)
    const setContextVisible = useProductCatalogTableStore(s => s.setOpen)
    const contextMenuVisible = useProductCatalogTableStore(s => s.open)
    const contextXY = useProductCatalogTableStore(s => s.contextMenuXY)
    const setOpenCreateProductModal = useCreateProductModal(s => s.setTagAndOpen)
    const setOpenUpdateProductModal = useUpdateProductModal(s => s.setOpen)
    const tagSelected = useTagTreeView(s => s.selectedTag)
    const treeViewData = useTagTreeView(s => s.treeViewTags)

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
                setOpenUpdateProductModal(true, selected[0].product)
                setContextVisible(false, 0, 0)
            }}
            >Редактировать
            </MenuItem>

            <MenuItem>Изменить цену</MenuItem>

            <MenuItem onClick={() => {
                let tag = treeViewData.filter((n) => {
                    return n.id == tagSelected
                })[0]
                setOpenCreateProductModal(tag)
                setContextVisible(false, 0, 0)
            }}
            >Создать
            </MenuItem>

            <MenuItem>Статистика</MenuItem>
            <MenuItem>Отследить товар</MenuItem>
            <MenuItem>Напечатать ценник</MenuItem>
            <MenuItem>Открыть пачку</MenuItem>
            <MenuItem>Менеджер цен</MenuItem>
        </Menu>
    );
};