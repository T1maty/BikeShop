import React, {FC, memo, MouseEvent, useCallback, useEffect, useState} from "react";
import cls from './CustomTable.module.scss'
import {ContextMenu} from "../../../widgets/workspace/ContextMenu";

interface CustomTableProps {
    theadData: string[],
    tbodyData: object[],
    customClass?: string,
    onContext: any
}

interface TableHeadItemProps {
    theadData: string[]
}

interface TableRowProps {
    data: any,
    onOpen: (left: any, top: any, data: any) => void,
}

export const CustomTable: FC<CustomTableProps> = ({theadData, tbodyData, customClass, onContext}) => {
        const [state, setState] = useState({
            isOpen: false,
            left: 0,
            top: 0,
            data: [],
            variant: ''
        })
        useEffect(() => {
            if (state.variant) {
                onContext({data: state.data, variant: state.variant})
                setState({...state, variant: ''})
            }
        }, [state.variant])


        const onOpenHandler = useCallback((left: any, top: any, data: any) => {
            setState({...state, isOpen: true, left, top, data})
        }, [])

        const onCloseHandler = useCallback((variant?: string) => {
            setState({...state, isOpen: false, variant: variant || ''})
        },[])

        return (
            <>
                <table className={`${customClass} ${cls.table}`}>
                    <thead className={cls.thead}>
                    <TableHeadItem theadData={theadData}/>
                    </thead>
                        <tbody className={cls.tbody}>
                        {tbodyData.map((item: any) => {
                            return <TableRow key={item.id} data={item} onOpen={onOpenHandler}/>;
                        })}
                        </tbody>
                </table>
                <ContextMenu isOpen={state.isOpen}
                             onClose={onCloseHandler}
                             settings={'work-catalog-table'}
                             left={state.left}
                             top={state.top}
                />
    </>
        );
    }
;


const TableHeadItem: FC<TableHeadItemProps> = memo(({theadData}) => {
    return (
        <tr className={cls.head__items}>
            {
                theadData.map((item: any, index) =>
                    <td key={index} title={item} className={cls.head__item}>
                        {item}
                    </td>
                )
            }
        </tr>
    )
});


const TableRow = memo(({data, onOpen}: TableRowProps) => {
    const arr = [data.id, data.name, data.price, data.description]
    const onContextHandler = (e: MouseEvent) => {
        e.preventDefault()
        onOpen(e.clientX, e.clientY, data)
    }
    return (
        <tr className={cls.body__items} onContextMenu={(e) => onContextHandler(e)}>
            {arr.map((item,index) => {
                return <td key={index} className={cls.body__item}>{item}</td>;
            })}
        </tr>
    );
});
