import React from 'react'
import useProductCatalogTableStore from './ProductCatalogTableStore'
import useCreateProductModal
    from '../../../../features/ProductCatalogFeatures/CreateProductModal/CreateProductModalStore'
import useTagTreeView from '../TagTreeView/TagTreeViewStore'
import useUpdateProductModal
    from '../../../../features/ProductCatalogFeatures/UpdateProductModal/UpdateProductModalStore'
import {ContextMenu} from "../../ContextMenu/ContextMenu"

export const ProductCatalogTableContextMenu = () => {

    const selected = useProductCatalogTableStore(s => s.selectedRows)
    const setContextVisible = useProductCatalogTableStore(s => s.setOpen)
    const contextMenuVisible = useProductCatalogTableStore(s => s.open)
    const contextXY = useProductCatalogTableStore(s => s.contextMenuXY)
    const setOpenCreateProductModal = useCreateProductModal(s => s.setTagAndOpen)
    const setOpenUpdateProductModal = useUpdateProductModal(s => s.setOpen)
    const tagSelected = useTagTreeView(s => s.selectedTag)
    const treeViewData = useTagTreeView(s => s.treeViewTags)

    const settings = [
        {
            name: 'Редактировать',
            click: () => {
                setOpenUpdateProductModal(true, selected[0].product)
                setContextVisible(false, 0, 0)
            }
        },
        {
            name: 'Изменить цену',
            click: () => {
                // code here
            }
        },
        {
            name: 'Создать',
            click: () => {
                let tag = treeViewData.filter((n) => {
                    return n.id == tagSelected
                })[0]
                setOpenCreateProductModal(tag)
                setContextVisible(false, 0, 0)
            }
        },
        {
            name: 'Статистика',
            click: () => {
                // code here
            }
        },
        {
            name: 'Отследить товар',
            click: () => {
                // code here
            }
        },
        {
            name: 'Напечатать ценник',
            click: () => {
                // code here
            }
        },
        {
            name: 'Открыть пачку',
            click: () => {
                // code here
            }
        },
        {
            name: 'Менеджер цен',
            click: () => {
                // code here
            }
        },
    ]

    return (
        <ContextMenu
            isOpen={contextMenuVisible}
            onClose={() => {setContextVisible(false, 0, 0)}}
            settings={settings}
            top={contextXY.Y}
            left={contextXY.X}
        />
    )
}

// <Menu
//     onContextMenu={(event) => {
//         event.preventDefault()
//         setContextVisible(false, 0, 0)
//     }}
//     open={contextMenuVisible}
//     onClose={() => {
//         setContextVisible(false, 0, 0)
//     }}
//     anchorReference="anchorPosition"
//     anchorPosition={
//         contextMenuVisible
//             ? {top: contextXY.Y, left: contextXY.X}
//             : undefined
//     }
// >
//     <MenuItem onClick={() => {
//         setOpenUpdateProductModal(true, selected[0].product)
//         setContextVisible(false, 0, 0)
//     }}
//     >
//         Редактировать
//     </MenuItem>
//
//     <MenuItem>Изменить цену</MenuItem>
//
//     <MenuItem onClick={() => {
//         let tag = treeViewData.filter((n) => {
//             return n.id == tagSelected
//         })[0]
//         setOpenCreateProductModal(tag)
//         setContextVisible(false, 0, 0)
//     }}
//     >
//         Создать
//     </MenuItem>
//
//     <MenuItem>Статистика</MenuItem>
//     <MenuItem>Отследить товар</MenuItem>
//     <MenuItem>Напечатать ценник</MenuItem>
//     <MenuItem>Открыть пачку</MenuItem>
//     <MenuItem>Менеджер цен</MenuItem>
// </Menu>