import React from 'react'
import useCatalog from "../Catalog/CatalogStore"
import cls from './ShopCatalogTreeView.module.scss'
import {ProductTag} from "../../../../entities"
import Enumerable from "linq"
import {useSnackbar} from "notistack"
import ArrowDown from '../../../../shared/assets/shop/icons/arrow-square-down.svg'
import ArrowRight from '../../../../shared/assets/shop/icons/arrow-square-right.svg'

export const ShopCatalogTreeView = () => {

    const {enqueueSnackbar} = useSnackbar()

    const tags = useCatalog(s => s.tags)
    const setUserCurrentTag = useCatalog(s => s.setUserCurrentTag)
    const userCurrentTags = useCatalog(s => s.userCurrentTags)

    const selected = useCatalog(s => s.selectedTags)
    const setSelected = useCatalog(s => s.setSelectedTags)
    const expandedItems = useCatalog(s => s.expandedTags)
    const setExpandedItems = useCatalog(s => s.setExpandedTags)

    const addUserCurrentTagHandler = (tag: ProductTag) => {
        if (Enumerable.from(userCurrentTags).select(n => n.id).contains(tag.id)) {
            enqueueSnackbar('Этот тег уже выбран',
                {
                    variant: 'info', autoHideDuration: 2000,
                    anchorOrigin: {vertical: 'top', horizontal: 'right'}
                })
        } else {
            setUserCurrentTag(tag)
        }
    }

    const renderItem = (item: any) => {
        const isExpanded = expandedItems.includes(item.id)

        const hasChildren = item.children && item.children.length > 0

        const handleExpand = (id: string) => {
            setExpandedItems([...expandedItems, id])
        }

        const handleCollapse = (id: string) => {
            setExpandedItems(expandedItems.filter(item => item !== id))
        }

        const onClickHandlerCollapsed = () => {
            if (hasChildren && isExpanded) {
                handleCollapse(item.id)
            } else if (!hasChildren) {
            } else {
                handleExpand(item.id)
            }
        }

        return (
            <div key={item.id}
                 className={cls.wrapper}
                 onContextMenu={(e) => {
                     e.preventDefault()
                 }}
            >
                <div style={{cursor: 'pointer'}}
                     className={cls.parent}
                >
                    <div
                        className={((selected != undefined && selected.length > 0 && selected[0] === item?.id) ? `${cls.selected} ${cls.innerWrap}` :
                            `${cls.innerWrap}`) + (Enumerable.from(userCurrentTags)
                            .select(n => n.id).contains(item?.id) ? ` ${cls.inCloud}` : '')}
                        onClick={() => {
                            setSelected(item.id)
                        }}
                    >
                        <div className={cls.toggle}
                             onClick={onClickHandlerCollapsed}
                        >
                            {/*{hasChildren && (isExpanded ? '\\/' : '>')}*/}
                            {
                                hasChildren && (isExpanded ?
                                        <div>
                                            <img src={ArrowDown} alt='arrow-down' width={20} height={20}/>
                                        </div>
                                        :
                                        <div>
                                            <img src={ArrowRight} alt='arrow-right' width={20} height={20}/>
                                        </div>
                                )
                            }
                        </div>

                        <div className={cls.content}
                             onClick={() => {
                             }}
                             onDoubleClick={() => {
                                 addUserCurrentTagHandler(item)
                             }}
                        >
                            {item.name}
                            
                        </div>
                    </div>
                </div>

                {
                    hasChildren && isExpanded && (
                        <div className={cls.child}>
                            {// @ts-ignore
                                item.children.map(renderItem)}
                        </div>
                    )
                }
            </div>
        )
    }

    function buildTree(data: ProductTag[], parentId: number) {
        const tree: Array<object> = []

        data.forEach((item: any) => {
            if (item.parentId === parentId) {
                const children = buildTree(data, item.id)
                let buf = {...item}
                if (children.length) {
                    buf.children = children
                }
                tree.push(buf)
            }
        })

        return tree
    }

    return (
        <>
            {tags !== undefined ? buildTree(tags, 0).map(renderItem) : false}
        </>
    )
}