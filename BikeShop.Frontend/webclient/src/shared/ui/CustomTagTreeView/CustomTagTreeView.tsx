import React, {memo, MouseEvent, useCallback, useState} from 'react';
import cls from './CustomTagTreeView.module.scss'
import {ContextMenu} from "../../../widgets/workspace/ContextMenu";

interface CustomTagTreeView {
    data: [],
    selectId: (id: number) => void
    callBackData: (data: {} ) => void
}

export const CustomTagTreeView = memo((props: CustomTagTreeView) => {
    const {data, selectId, callBackData} = props
    const [expandedItems, setExpandedItems] = useState<number[]>([]);
    const [select, setSelect] = useState<number>(0);
    const [state, setState] = useState({
        isOpen: false,
        left: 0,
        top: 0,
        data: [],
        variant: ''
    })

    const onOpenHandler = useCallback((left: number, top: number, data: []) => {
        setState({...state, isOpen: true, left, top, data})
    }, [])

    const onCloseHandler = useCallback((variant?: string) => {
        setState({...state, isOpen: false})
        const {children, ...data} : any = state.data
        callBackData({data: data, variant: variant})
    }, [state])

    const handleExpand = (id: number) => {
        setExpandedItems([...expandedItems, id]);
    };

    const handleCollapse = (id: number) => {
        setExpandedItems(expandedItems.filter((item: number) => item !== id));
    };


    function buildTree(data: [], parentId: number) {
        const tree: any = [];

        data.forEach((item: any) => {
            if (item.parentId === parentId) {
                const children = buildTree(data, item.id);
                if (children.length) {
                    item.children = children;
                }
                tree.push(item);
            }
        });
        return tree;
    }


    const renderItem = (item: any) => {
        const isExpanded = expandedItems.includes(item.id);
        const hasChildren = item.children && item.children.length > 0;

        const onContextMenuHandler = (e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault()
            onOpenHandler(e.clientX, e.clientY, item)
        }

        const onClickHandlerCollapsed = () => {
            if (hasChildren && isExpanded) {
                handleCollapse(item.id)
            } else if (!hasChildren) {
                console.log('none children')
            } else {
                handleExpand(item.id)
            }
        }
        const onClickHandlerSelect = (id: number) => {
            setSelect(id)
            selectId(id)
        }

        return (
            <div key={item.id} style={{userSelect: "none"}}>
                <div style={{cursor: 'pointer'}}
                     onContextMenu={onContextMenuHandler}
                     className={cls.child}>
                    <div className={select === item.id ? cls.selected : ''}
                         style={{display: "flex", flexDirection: 'row'}}>
                        <div style={{width: 25, display: 'flex', justifyContent: 'center'}}
                             onClick={onClickHandlerCollapsed}>
                            {hasChildren && (isExpanded ? '\\/' : '>')}
                        </div>
                        <div style={{width: '100%'}}
                             onClick={() => onClickHandlerSelect(item.id)}
                        >{item.name}</div>
                    </div>
                </div>
                {hasChildren && isExpanded && (
                    <div style={{marginLeft: 16}}>
                        {item.children.map(renderItem)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <ContextMenu isOpen={state.isOpen}
                         onClose={onCloseHandler}
                         settings={'work-catalog-categories'}
                         left={state.left}
                         top={state.top}
            />
            {buildTree(data, 0).map(renderItem)}
        </>
    )
})
