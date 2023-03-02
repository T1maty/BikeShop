import React, {FC, memo, MouseEvent, useCallback, useEffect, useState} from "react";
import cls from './CustomTable.module.scss'
import {ContextMenu} from "../../../widgets/workspace/ContextMenu";
import {Loader} from "../Loader/Loader";

interface CustomTableProps {
    theadData: string[],
    tbodyData: object[],
    customClass?: string,
    onContext: (data: any) => void
    isLoading: boolean
}

interface TableHeadItemProps {
    theadData: string[]
}

interface TableRowProps {
    data: any,
    onOpen: (left: any, top: any, data: any) => void,
}

export const CustomTable = (props: CustomTableProps) => {
        const {theadData, tbodyData, customClass, onContext, isLoading} = props

        const [state, setState] = useState({
            isOpen: false,
            left: 0,
            top: 0,
            data: [],
            variant: ''
        })

        const onOpenHandler = useCallback((left: any, top: any, data: any) => {
            setState({...state, isOpen: true, left, top, data})
        }, [])

        const onCloseHandler = useCallback((variant?: string) => {
            setState({...state, isOpen: false, variant: variant || ''})
            onContext({data: state.data, variant: variant})
        }, [state])

        return (
            <>
                <table className={`${customClass} ${cls.table}`}>
                    <thead className={cls.thead}>
                    <TableHeadItem theadData={theadData}/>
                    </thead>
                    <tbody className={cls.tbody}>
                    {!isLoading?
                        tbodyData.map((item: any) => {
                            return <TableRow key={item.id} data={item} onOpen={onOpenHandler}/>;
                        })
                        : <tr style={{height: 250, display: "flex", justifyContent: 'center'}}><td><Loader variant={"ellipsis"}/></td></tr>
                    }
                    {tbodyData.length === 0 && !isLoading && <tr style={{height: 250, display: "flex", justifyContent: 'center'}}><td>Пусто</td></tr>}
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
            {arr.map((item, index) => {
                return <td key={index} className={cls.body__item}>{item}</td>;
            })}
        </tr>
    );
});
