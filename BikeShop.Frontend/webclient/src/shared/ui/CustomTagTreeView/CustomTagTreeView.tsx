import React, {memo, MouseEvent, useCallback, useState} from 'react';
import cls from './CustomTagTreeView.module.scss'
import {ContextMenu} from "../../../widgets/workspace/ContextMenu";

interface CustomTagTreeView {
    data: Array<object>,
    selectId: (id: number) => void
    callBackData: (data: {} ) => void
    contextData: Array<string>
}


/**
 * @param data - Массив с объектом, каждый объект должен иметь parentId
 * @param selectId - Возвращает выбранный id tag
 * @param callBackData - Возвращает объект {data: данные выбранного tag, variant: вариант, что делать с этими данными}
 * @param contextData - Массив string, для context
 * @return Возвращает jsx с готовым TagTreeView
 */

export const CustomTagTreeView = memo((props: CustomTagTreeView) => {
    const {data, selectId, callBackData, contextData} = props
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
        if(variant !== undefined){
            const {children, ...data} : any = state.data
            callBackData({data: data, variant: variant})
        }
    }, [state])

    const handleExpand = (id: number) => {
        setExpandedItems([...expandedItems, id]);
    };

    const handleCollapse = (id: number) => {
        setExpandedItems(expandedItems.filter((item: number) => item !== id));
    };


    function buildTree(data: Array<object>, parentId: number) {
        const tree: Array<object> = [];

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

        const onContextMenuHandler = (e: MouseEvent<HTMLDivElement>, id: number) => {
            e.preventDefault()
            onOpenHandler(e.clientX, e.clientY, item)
            onClickHandlerSelect(id)
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
            <div key={item.id} className={cls.wrapper}>
                <div style={{cursor: 'pointer'}}
                     onContextMenu={(e) => onContextMenuHandler(e, item.id)}
                     className={cls.parent}>
                    <div className={select === item.id ? `${cls.selected} ${cls.innerWrap}` : `${cls.innerWrap}`}>
                        <div className={cls.toggle}
                             onClick={onClickHandlerCollapsed}>
                            {hasChildren && (isExpanded ? '\\/' : '>')}
                        </div>
                        <div className={cls.content}
                             onClick={() => onClickHandlerSelect(item.id)}>
                            {item.name}
                        </div>
                    </div>
                </div>
                {hasChildren && isExpanded && (
                    <div className={cls.child}>
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
                         settings={contextData}
                         left={state.left}
                         top={state.top}
            />
            {buildTree(data, 0).map(renderItem)}
        </>
    )
})
