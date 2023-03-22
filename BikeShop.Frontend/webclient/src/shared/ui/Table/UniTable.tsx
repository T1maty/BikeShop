import cls from "./UniTable.module.scss"
import {Loader} from "../Loader/Loader"
import React, {memo, useState} from "react"
import useEditProductCardModal from "../../../features/EditProductCardModal/EditProductCardModalStore"

export interface Column {
    id: string
    label: string
    minWidth?: number
    align?: 'right' | 'left'
}

interface ITableProps {
    rows: any[]
    columns: Column[]

    isLoading?: boolean
    className?: string
    rowOnClick?: (row: object) => object
    rowOnContext?: (row: object, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
    rowOnDoubleClick?: (row: object, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
}

interface TableRowProps {
    row: any
    columns: Column[]
    rowOnContext?: (row: object, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
    onRowDoubleClick?: (row: object, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void

    selected: any[]
    setSelected: (row: any) => void
}

export const UniTable = (props: ITableProps) => {

    const [selected, setSelected] = useState([])

    return (
        <div>
            <table className={`${props.className} ${cls.table}`}>
                <thead className={cls.thead}>
                    <TableHeadItem theadData={props.columns}/>
                </thead>
                <tbody className={cls.tbody}>
                {
                    !props.isLoading ?
                    props.rows.map((item: any) => {
                        return <TableRow key={item.id} row={item}
                                         columns={props.columns}
                                         onRowDoubleClick={props.rowOnDoubleClick}
                                         rowOnContext={props.rowOnContext}
                                         selected={selected}
                                         setSelected={setSelected}
                        />
                    })
                    : <tr style={{height: 250, display: "flex", justifyContent: 'center'}}>
                        <td><Loader variant={"ellipsis"}/></td>
                    </tr>
                }
                {/*{props.rows.length === 0 && !props.isLoading && <TableRow/>}*/}
                </tbody>
            </table>
        </div>
    );
};

const TableHeadItem = memo((props: { theadData: Column[] }) => {

    const {theadData} = props

    return (
        <tr className={cls.head__items}>
            {
                theadData.map((item: Column, index) =>
                    <td key={index} title={item.id} className={cls.head__item}>
                        {item.label}
                    </td>
                )
            }
        </tr>
    )
});

const TableRow = memo((props: TableRowProps) => {

    const setOpenEditProductCardModal = useEditProductCardModal(s => s.setOpenEditProductCardModal)

    return (
        <tr className={`${[props.selected].includes(props.row) ? cls.rowSelectedBackground : ''} ${cls.body__items}`}
            onDoubleClick={(event) => {
                props.onRowDoubleClick ? props.onRowDoubleClick(props.row, event) : true
            }}
            // onDoubleClick={() => {setOpenEditProductCardModal(true)}}

            onContextMenu={(event) => {
                props.setSelected(props.row)
                props.rowOnContext ? props.rowOnContext(props.row, event) : true
            }}
            onClick={() => {props.setSelected(props.row)}}
        >
            {
                props.columns.map((item, index) => {
                    return <td key={index}>
                        {props.row[item.id]}
                    </td>
                })
            }
        </tr>
    );
});