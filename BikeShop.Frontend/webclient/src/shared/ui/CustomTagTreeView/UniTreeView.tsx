import React, {memo, useEffect, useState} from 'react'
import cls from './CustomTagTreeView.module.scss'
import plus from './../../assets/workspace/plus and minus/icons8-plus-30.png'
import minus from './../../assets/workspace/plus and minus/icons8-minus-30.png'

interface UniTreeView {
    data: Array<object>
    selected: any
    setSelected: (node: any) => void
    onNodeContext?: (node: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    onNodeClick?: (node: any) => void
    onNodeDoubleClick?: (node: any) => void
}

/**
 * @param data - Массив с объектом, каждый объект должен иметь parentId и id
 */

export const UniTreeView = memo((props: UniTreeView) => {

    const {data, selected, setSelected, onNodeContext, onNodeClick, onNodeDoubleClick} = props
    const [expandedItems, setExpandedItems] = useState<number[]>([]);

    useEffect(() => {
        let exp: number[] = []

        data.forEach((item: any) => {
            if (!item.isCollapsed) {
                exp.push(item.id)
            }
        })

        setExpandedItems(exp)
    }, [data])

    const handleExpand = (id: number) => {
        setExpandedItems([...expandedItems, id])
    }

    const handleCollapse = (id: number) => {
        setExpandedItems(expandedItems.filter((item: number) => item !== id))
    }

    function buildTree(data: Array<object>, parentId: number) {
        const tree: Array<object> = []

        data.forEach((item: any) => {
            if (item.parentId === parentId) {
                let buf = {...item}
                const children = buildTree(data, item.id)
                if (children.length) {
                    buf.children = children
                }
                tree.push(buf)
            }
        })

        return tree
    }

    const renderItem = (item: any, depth: number = 0) => {
        const isExpanded = expandedItems.includes(item.id)
        const hasChildren = item.children && item.children.length > 0
        const hasParent = item.parentId != 0

        console.log(depth)

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
                        className={selected?.id === item?.id ? `${cls.selected} ${cls.innerWrap}` : `${cls.innerWrap}`}>

                        <div className={cls.toggle}
                             onClick={onClickHandlerCollapsed}
                        >
                            {hasChildren && (isExpanded ? <>

                                    <img className={cls.img} src={minus} alt={'-'}/>
                                </> :
                                <>
                                    {hasParent ? <div className={cls.plus_brd}></div> : <></>}
                                    <img className={cls.img_plus} src={plus} alt={'+'}/>
                                </>)}

                            {hasChildren && (isExpanded ? <div className={cls.brd}></div> : <></>)}
                            {hasParent && !hasChildren ? <div className={cls.brd2}></div> : <></>}
                        </div>

                        <div className={cls.content}
                             onClick={() => {
                                 setSelected(item)
                                 onNodeClick ? onNodeClick(item) : true
                             }}
                             onContextMenu={(event) => {
                                 onNodeContext ? onNodeContext(item, event) : true
                             }}
                             onDoubleClick={() => {
                                 onNodeDoubleClick ? onNodeDoubleClick(item) : true
                             }}
                        >
                            {item.name}
                        </div>
                    </div>
                </div>

                {
                    hasChildren && isExpanded && (
                        <div className={cls.child}>
                            {item.children.map((i: any) => {
                                return (renderItem(i, depth + 1))
                            })}
                        </div>
                    )
                }
            </div>
        )
    }

    return (
        <>
            {data !== undefined ? buildTree(data, 0).map(i => {
                return (renderItem(i, 1))
            }) : false}
        </>
    )
})