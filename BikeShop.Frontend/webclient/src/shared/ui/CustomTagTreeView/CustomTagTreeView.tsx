import React, {MouseEvent, useState} from 'react';
import {IProductTag} from "../../../entities";
import cls from './CustomTagTreeView.module.scss'
// const CustomTagTreeView = (props: any) => {
//     console.log(props.data)
//     function createTree(parentId: string = '0') {
//         const nodesToAdd: IProductTag[] = [];
//
//         if (props.data.length > 0) {
//             props.data.map((n: any) => {
//                 if (n.parentId == parentId) nodesToAdd.push(n);
//             });
//         }
//         const onClickHandler = (e: MouseEvent, id: any) => {
//             console.log(id)
//             e.stopPropagation()
//             const children = e.currentTarget.querySelector('ul')
//             if (children){
//                 children.className = children.className === cls.none ? '': cls.none
//             }
//         }
//         if (nodesToAdd.length > 0) {
//             return nodesToAdd?.map((n) => {
//                 return (
//                     <li key={n.id}
//                         onClick={(e) => onClickHandler(e, n.id)}>
//                         <ul className={cls.none} >
//                             <span className={cls.content}>{n.name}</span>
//                             {createTree(n.id)}
//                         </ul>
//                     </li>
//                 );
//             });
//         }
//     }
//
//     return (
//         <div className={cls.tree}>
//                <ul>
//                    {props.data.length > 0 && createTree()}
//                </ul>
//         </div>
//     );
// };
//
// export default CustomTagTreeView;

const CustomTagTreeView = ({data}: any) => {
    const [expandedItems, setExpandedItems] = useState<any>([]);
    console.log(expandedItems)
    const handleExpand = (id: any) => {
        setExpandedItems([...expandedItems, id]);
    };

    const handleCollapse = (id: any) => {
        setExpandedItems(expandedItems.filter((item: any) => item !== id));
    };

    const renderItem = (item: any) => {
        const isExpanded = expandedItems.includes(item.id);
        const hasChildren = item.children && item.children.length > 0;
        return (
            <div key={item.id}>
                <div
                    style={{cursor: hasChildren ? 'pointer' : 'default'}}
                    onClick={() => {
                        if (hasChildren && isExpanded) {
                            handleCollapse(item.id)
                        } else if (!hasChildren) {
                            console.log('none children')
                        } else {
                            handleExpand(item.id)
                        }
                    }}
                    className={cls.child}
                >
                    <div>
                        <div style={{
                            width: 16,
                            display: "inline-block"
                        }}>{hasChildren && (isExpanded ? '\\/' : '>')}</div>
                        {item.label}
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

    return <div>{data.map(renderItem)}</div>;
};

export default CustomTagTreeView;
