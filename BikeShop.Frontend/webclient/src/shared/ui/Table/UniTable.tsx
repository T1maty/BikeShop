import React, {memo, useState} from "react"
import cls from "./UniTable.module.scss"
import {Loader} from "../Loader/Loader"
import {EditableSpan} from "../EditableSpan/EditableSpan"
import {useSnackbar} from "notistack"

export interface Column {
    id: string
    label: string
    minWidth?: number
    align?: 'right' | 'left'
    isEditable?: boolean
    isNumber?: boolean
}

interface TableProps {
    rows: any[]
    setRows?: (rows: any[]) => void
    columns: any[]

    isLoading?: boolean
    className?: string
    rowOnClick?: (row: object) => void
    rowOnContext?: (row: object, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
    rowOnDoubleClick?: (row: object, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void

    selected?: any
    setSelected?: (value: any) => void
}

interface TableRowProps {
    row?: any
    setRow: (row: any) => void
    columns: any[]
    rowOnContext?: (row: object, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
    onRowDoubleClick?: (row: object, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void

    selected: any[]
    setSelected: (row: any) => void
}

export const UniTable = (props: TableProps) => {

    const [selected, setSelected] = useState([])
    const {enqueueSnackbar} = useSnackbar()

    return (
        <div>
            <table className={`${props.className} ${cls.table}`}>
                <thead className={cls.thead}>
                <TableHeadItem theadData={props.columns}/>
                </thead>
                <tbody className={cls.tbody}>
                {
                    !props.isLoading ?
                        props.rows?.map((item: any, index) => {
                            return <TableRow key={index}
                                             row={item}
                                             setRow={(newRow: any) => {
                                                 let newData: any[] = []
                                                 Object.assign(newData, props.rows)
                                                 newData[index] = newRow
                                                 console.log(newData)
                                                 props.setRows ? props.setRows(newData) : true
                                             }}
                                             columns={props.columns}
                                             onRowDoubleClick={props.rowOnDoubleClick}
                                             rowOnContext={props.rowOnContext}
                                             selected={props.selected != undefined ? props.selected : selected}
                                             setSelected={props.setSelected != undefined ? props.setSelected : setSelected}
                            />
                        })
                        : <tr style={{height: 250, display: 'flex', justifyContent: 'center'}}>
                            <td><Loader variant={"ellipsis"}/></td>
                        </tr>
                }
                </tbody>
            </table>
        </div>
    )
}


const TableHeadItem = memo((props: { theadData: Column[] }) => {

    const {theadData} = props

    return (
        <tr className={cls.head_items}>
            {
                theadData.map((item: Column, index) =>
                    <td key={index} title={item.id} className={cls.head_item}>
                        {item.label}
                    </td>
                )
            }
        </tr>
    )
})


const TableRow = memo((props: TableRowProps) => {

    return (
        <tr className={`${props.selected?.includes(props.row) ? cls.rowSelectedBackground : ''} ${cls.body_items}`}
            onDoubleClick={(event) => {
                props.onRowDoubleClick ? props.onRowDoubleClick(props.row, event) : true
            }}

            onContextMenu={(event) => {
                props.setSelected([props.row])
                props.rowOnContext ? props.rowOnContext(props.row, event) : true
            }}
            onClick={() => {
                props.setSelected([props.row])
            }}
        >
            {
                props.columns.map((item, index) => {
                    return <td key={index}>
                        {
                            item.isEditable ?
                                <EditableSpan title={props.row[item.id]}
                                              onChangeInput={(newInputValue) => {
                                                  if (item.isNumber) {
                                                      let newValue = Number.parseFloat(newInputValue).toString()
                                                      let newRow = props.row
                                                      if (newValue != 'NaN') {
                                                          newRow[item.id] = newValue
                                                          console.log('updated')
                                                      }
                                                      props.setRow(newRow)
                                                  }
                                              }}
                                              inputClassName={cls.inputClassName}
                                />
                                : props.row[item.id]
                        }
                    </td>
                })
            }
        </tr>
    )
})