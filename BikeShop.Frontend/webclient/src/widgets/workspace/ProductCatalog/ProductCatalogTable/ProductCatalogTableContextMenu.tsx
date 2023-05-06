import React, {useState} from 'react'
import useProductCatalogTableStore from './ProductCatalogTableStore'
import useCreateProductModal
    from '../../../../features/ProductCatalogFeatures/CreateProductModal/CreateProductModalStore'
import useTagTreeView from '../TagTreeView/TagTreeViewStore'
import useUpdateProductModal
    from '../../../../features/ProductCatalogFeatures/UpdateProductModal/UpdateProductModalStore'
import {ContextMenu} from "../../ContextMenu/ContextMenu"
import useUpdateProductPriceModal
    from "../../../../features/ProductCatalogFeatures/UpdateProductPricesModal/UpdateProductPricesModalStore"
import {PrintModal} from "../../../../features"
import {useCurrency} from "../../../../entities"
import {ProductSticker} from "../../Invoices/ProductSticker/ProductSticker"

export const ProductCatalogTableContextMenu = () => {

    const setOpenCreateProductModal = useCreateProductModal(s => s.setTagAndOpen)
    const setOpenUpdateProductModal = useUpdateProductModal(s => s.setOpenUpdateProductModal)
    const setOpenUpdateProductPricesModal = useUpdateProductPriceModal(s => s.setOpenUpdateProductPricesModal)

    const contextMenuVisible = useProductCatalogTableStore(s => s.open)
    const setContextVisible = useProductCatalogTableStore(s => s.setOpen)
    const contextXY = useProductCatalogTableStore(s => s.contextMenuXY)
    const selected = useProductCatalogTableStore(s => s.selectedRows)

    const treeViewData = useTagTreeView(s => s.treeViewTags)
    const tagSelected = useTagTreeView(s => s.selectedTag)

    const cur = useCurrency(s => s.selectedCurrency)

    const [o1, so1] = useState(false)

    const settings = [
        {
            name: 'Редактировать',
            click: () => {
                setOpenUpdateProductModal(true, selected[0])
                setContextVisible(false, 0, 0)
            }
        },
        {
            name: 'Изменить цену',
            click: () => {
                setOpenUpdateProductPricesModal(true, selected[0])
                setContextVisible(false, 0, 0)
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
            name: 'Напечатать ценник',
            click: () => {
                so1(true)
            }
        },
    ]

    return (
        <>
            <PrintModal open={o1}
                        setOpen={so1}
                        children={<ProductSticker product={selected[0]} cur={cur!}/>}
            />
            <ContextMenu
                isOpen={contextMenuVisible}
                onClose={() => {setContextVisible(false, 0, 0)}}
                settings={settings}
                top={contextXY.Y}
                left={contextXY.X}
            />
        </>
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