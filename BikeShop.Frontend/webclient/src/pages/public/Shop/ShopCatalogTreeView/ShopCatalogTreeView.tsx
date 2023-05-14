import React from 'react';
import useCatalog from "../Catalog/CatalogStore";
import cls from './ShopCatalogTreeView.module.scss'
import {ProductTag} from "../../../../entities";
import Enumerable from "linq";
import {useSnackbar} from "notistack";

export const ShopCatalogTreeView = () => {

    const tags = useCatalog(s => s.tags)
    const setUserCurrentTag = useCatalog(s => s.setUserCurrentTag)
    const {enqueueSnackbar} = useSnackbar()
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

        const handleExpand = (id: number) => {
            setExpandedItems([...expandedItems, id])
        }

        const handleCollapse = (id: number) => {
            setExpandedItems(expandedItems.filter((item: number) => item !== id))
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
                        className={selected?.id === item?.id ? `${cls.selected} ${cls.innerWrap}` : `${cls.innerWrap}`}
                        onClick={() => {
                            setSelected(item)
                        }}>
                        <div className={cls.toggle}
                             onClick={onClickHandlerCollapsed}
                        >
                            {hasChildren && (isExpanded ? '\\/' : '>')}
                        </div>

                        <div className={cls.content}
                             onClick={() => {
                                 // setSelected(item)
                                 //onNodeClick ? onNodeClick(item) : true
                             }}
                             onContextMenu={(event) => {
                                 // onNodeContext ? onNodeContext(item, event) : true
                             }}
                             onDoubleClick={() => {
                                 addUserCurrentTagHandler(item)
                                 // onNodeDoubleClick ? onNodeDoubleClick(item) : true
                             }}
                        >
                            {item.name}
                        </div>
                    </div>
                </div>

                {
                    hasChildren && isExpanded && (
                        <div className={cls.child}>
                            {item.children.map(renderItem)}
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
    );
};