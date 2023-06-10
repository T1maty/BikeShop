import React, {useState} from 'react'
import {ProductTag} from "../../../../entities"
import {ContextMenu} from "../../ContextMenu/ContextMenu"
import useCreateTagModal from '../../../../features/ProductCatalogFeatures/CreateTagModal/CreateTagModalStore'
import useTagTreeView from './TagTreeViewStore'
import useCreateProductModal
    from "../../../../features/ProductCatalogFeatures/CreateProductModal/CreateProductModalStore"
import useUpdateTagModal from '../../../../features/ProductCatalogFeatures/UpdateTagModal/UpdateTagModalStore'
import {ChooseProductTagModal} from "../../../../features";
import {useSnackbar} from "notistack";

export const TagTreeViewContextMenu = () => {

    const openCreateProduct = useCreateProductModal(s => s.setTagAndOpen)
    const openUpdateTag = useUpdateTagModal(s => s.openTagModal)

    const setOpenCreateTagModal = useCreateTagModal(s => s.setOpenCreateTagModal)
    const setParentNode = useCreateTagModal(s => s.setParentNode)

    const contextMenuVisible = useTagTreeView(s => s.contextMenuVisible)
    const setContextVisible = useTagTreeView(s => s.setContextMenuVisible)
    const contextXY = useTagTreeView(s => s.contextMenuXY)

    const treeViewData = useTagTreeView(s => s.treeViewTags)
    const removeTreeViewTag = useTagTreeView(s => s.removeTreeViewTag)
    const addTreeViewTag = useTagTreeView(s => s.addTreeViewTag)
    const allTags = useTagTreeView(s => s.treeViewTags)
    const selectedTag = useTagTreeView(s => s.selectedTag)

    const moveTag = useUpdateTagModal(s => s.moveTag)

    const [v, sV] = useState(false)
    const [tag, setTag] = useState<ProductTag | null>(null)
    const {enqueueSnackbar} = useSnackbar()


    const settings = [
        {
            name: 'Добавить товар с выбранным тегом',
            click: () => {
                setContextVisible(false, 0, 0)
                let tag = treeViewData.filter((n) => {
                    return n.id == selectedTag
                })[0]
                openCreateProduct(tag)
            }
        },
        {
            name: 'Редактировать',
            click: () => {
                setContextVisible(false, 0, 0)
                let tag = treeViewData.filter((n) => {
                    return n.id == selectedTag
                })[0]
                openUpdateTag(tag)
            }
        },
        {
            name: 'Создать в корне',
            click: () => {
                setContextVisible(false, 0, 0)
                setParentNode({} as ProductTag)
                setOpenCreateTagModal(true)
            }
        },
        {
            name: 'Создать потомка',
            click: () => {
                setContextVisible(false, 0, 0)
                setParentNode(treeViewData.filter((n) => {
                    return n.id == selectedTag
                })[0])
                setOpenCreateTagModal(true)
            }
        },
        {
            name: 'Переместить',
            click: () => {
                setContextVisible(false, 0, 0)
                sV(true)
                setTag(treeViewData.find(n => n.id === selectedTag)!)
            }
        },
    ]

    return (
        <>
            <ChooseProductTagModal open={v} setOpen={sV} onTagDoubleClick={(t) => {
                moveTag(tag!, t.id, (tag) => {
                    removeTreeViewTag(tag.id)
                    addTreeViewTag(tag)
                    sV(false)
                    enqueueSnackbar('Тег перемещен', {variant: 'success', autoHideDuration: 3000})
                }, () => {
                    sV(false)
                    enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
                })
            }}/>
            <ContextMenu
                isOpen={contextMenuVisible}
                onClose={() => {
                    setContextVisible(false, 0, 0)
                }}
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
//         setContextVisible(false, 0, 0)
//         let tag = treeViewData.filter((n) => {
//             return n.id == selected
//         })[0]
//         openCreateProduct(tag)
//     }}
//     >
//         Добавить товар с выбранным тегом
//     </MenuItem>
//
//     <MenuItem onClick={() => {
//         setContextVisible(false, 0, 0)
//         let tag = treeViewData.filter((n) => {
//             return n.id == selected
//         })[0]
//         openUpdateTag(tag)
//     }}
//     >
//         Редактировать
//     </MenuItem>
//
//     <MenuItem onClick={() => {
//         setContextVisible(false, 0, 0)
//         setParentNode({} as ProductTag)
//         setOpenCreateTagModal(true)
//     }}
//     >
//         Создать в корне
//     </MenuItem>
//
//     <MenuItem onClick={() => {
//         setContextVisible(false, 0, 0)
//         setParentNode(treeViewData.filter((n) => {
//             return n.id == selected
//         })[0])
//         setOpenCreateTagModal(true)
//     }}
//     >
//         Создать потомка
//     </MenuItem>
//
//     <MenuItem>Переместить</MenuItem>
//     <MenuItem onClick={() => {
//     }}>Удалить</MenuItem>
// </Menu>