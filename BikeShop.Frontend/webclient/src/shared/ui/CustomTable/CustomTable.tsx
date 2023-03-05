import React, {FC, memo, MouseEvent, useCallback, useEffect, useState} from "react";
import cls from './CustomTable.module.scss'
import {ContextMenu} from "../../../widgets/workspace/ContextMenu";
import {Loader} from "../Loader/Loader";

interface CustomTableProps {
    theadData: string[],
    tbodyData: object[],
    customClass?: string,
    callBackData: (data: any) => void
    isLoading: boolean
    contextData: Array<string>
}

interface DataProps {
    id: number
    name: string
    price: number
    description: string
}

export const CustomTable = (props: CustomTableProps) => {
        const {
            theadData,
            tbodyData,
            customClass,
            callBackData,
            isLoading,
            contextData
        } = props

        const [state, setState] = useState({
            isOpen: false,
            left: 0,
            top: 0,
            data: {},
            variant: ''
        })

        const onOpenHandler = useCallback((left: number, top: number, data: DataProps) => {
            setState({...state, isOpen: true, left, top, data})
        }, [])

        const onCloseHandler = useCallback((variant?: string) => {
            setState({...state, isOpen: false, variant: variant || ''})
            callBackData({data: state.data, variant})
        }, [state])

        return (
            <>
                <table className={`${customClass} ${cls.table}`}>
                    <thead className={cls.thead}>
                    <TableHeadItem theadData={theadData}/>
                    </thead>
                    <tbody className={cls.tbody}>
                    {!isLoading ?
                        tbodyData.map((item: any) => {
                            return <TableRow key={item.id} data={item} onOpen={onOpenHandler}/>;
                        })
                        : <tr style={{height: 250, display: "flex", justifyContent: 'center'}}>
                            <td><Loader variant={"ellipsis"}/></td>
                        </tr>
                    }
                    {tbodyData.length === 0 && !isLoading && <TableRow empty onOpen={onOpenHandler}/>}
                    </tbody>
                </table>
                <ContextMenu isOpen={state.isOpen}
                             onClose={onCloseHandler}
                             settings={contextData}
                             left={state.left}
                             top={state.top}
                />
            </>
        );
    }
;

const TableHeadItem = memo((props: { theadData: string[] }) => {
    const {theadData} = props

    return (
        <tr className={cls.head__items}>
            {
                theadData.map((item: string, index) =>
                    <td key={index} title={item} className={cls.head__item}>
                        {item}
                    </td>
                )
            }
        </tr>
    )
});


interface TableRowProps {
    data?: any,
    onOpen: (left: number, top: number, data: DataProps) => void,
    empty?: boolean
}

const TableRow = memo((props: TableRowProps) => {
    const {data, onOpen, empty} = props

    let arr = [data?.id, data?.name, data?.price, data?.description]

    empty && (arr = ['Пусто'])

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
