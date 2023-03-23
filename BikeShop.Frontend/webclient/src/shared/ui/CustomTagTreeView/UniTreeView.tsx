import React, {memo, useCallback, useState} from 'react';
import cls from './CustomTagTreeView.module.scss'

interface UniTreeView {
    data: Array<object>,
    selected: any
    setSelected: (node: any) => void
    onNodeContext?: (node: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    onNodeClick?: (node: any) => void
}

/**
 * @param data - Массив с объектом, каждый объект должен иметь parentId и id
 */

export const UniTreeView = memo((props: UniTreeView) => {
    const {data, selected, setSelected, onNodeContext, onNodeClick} = props
    const [expandedItems, setExpandedItems] = useState<number[]>([]);

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
        if (variant !== undefined) {
            const {children, ...data}: any = state.data
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

        const onClickHandlerCollapsed = () => {
            if (hasChildren && isExpanded) {
                handleCollapse(item.id)
            } else if (!hasChildren) {
                console.log('none children')
            } else {
                handleExpand(item.id)
            }
        }


        return (
            <div key={item.id} className={cls.wrapper} onContextMenu={(e) => {
                e.preventDefault()
            }}>
                <div style={{cursor: 'pointer'}}

                     className={cls.parent}>

                    <div className={selected.id === item.id ? `${cls.selected} ${cls.innerWrap}` : `${cls.innerWrap}`}>

                        <div className={cls.toggle}
                             onClick={onClickHandlerCollapsed}>
                            {hasChildren && (isExpanded ? '\\/' : '>')}
                        </div>

                        <div className={cls.content}
                             onClick={() => {
                                 setSelected(item)
                                 onNodeClick ? onNodeClick(item) : true
                             }}
                             onContextMenu={(event) => {
                                 onNodeContext ? onNodeContext(item, event) : true
                             }}
                        >
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
            {buildTree(data, 0).map(renderItem)}
        </>
    )
})
