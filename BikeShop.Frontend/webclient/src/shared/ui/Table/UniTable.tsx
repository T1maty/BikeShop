import React, {memo, useState} from 'react'
import cls from './UniTable.module.scss'
import {Loader} from '../Loader/Loader'
import {EditableSpan} from '../EditableSpan/EditableSpan'
import {UniTableColumn, useCurrency} from '../../../entities'
import {usePopperTooltip} from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'

interface TableProps {
    rows: any[]
    setRows?: (rows: any[]) => void
    columns: any[]

    isLoading?: boolean
    className?: string
    rowOnClick?: (row: object) => void
    rowOnContext?: (row: object, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
    rowOnDoubleClick?: (row: object, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void

    selected?: any[]
    setSelected?: (value: any[]) => void
}

interface TableRowProps {
    row?: any
    setRow: (row: any) => void
    columns: UniTableColumn[]
    rowOnContext?: (row: object, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
    onRowDoubleClick?: (row: object, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void

    selected: any[]
    setSelected: (row: any[]) => void
}

export const UniTable = (props: TableProps) => {

    const [selected, setSelected] = useState<any[]>([])

    const getSelect = () => {
        if (props.selected != null) return props.selected
        else return selected
    }
    const getSetSelect = () => {
        if (props.setSelected != null) return props.setSelected
        else return setSelected
    }
    return (
        <>
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
                                             selected={getSelect()}
                                             setSelected={getSetSelect()}
                            />
                        })
                        : <tr style={{height: 250, display: 'flex', justifyContent: 'center'}}>
                            <td><Loader variant={'ellipsis'}/></td>
                        </tr>
                }
                </tbody>
            </table>
        </>
    )
}


const TableHeadItem = memo((props: { theadData: UniTableColumn[] }) => {

    const {theadData} = props
    // const {getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible} = usePopperTooltip()

    return (
        <tr className={cls.head_items}>
            {
                theadData.map((item: UniTableColumn, index) =>
                    <>
                        <td key={index}
                            title={item.id}
                            className={cls.head_item}
                            style={{width: `${item.width!}%`}}
                            // ref={setTriggerRef}
                        >
                            {item.label}
                        </td>
                        {/*{*/}
                        {/*    visible &&*/}
                        {/*    <>*/}
                        {/*    <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>*/}
                        {/*        {item.label}*/}
                        {/*    </div>*/}
                        {/*    <div {...getArrowProps({ className: 'tooltip-arrow' })} />*/}
                        {/*    </>*/}
                        {/*}*/}
                    </>
                )
            }
        </tr>
    )
})


const TableRow = memo((props: TableRowProps) => {

    const {getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible} = usePopperTooltip()

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)

    return (
        <>
            {//props.selected?.includes(props.row) ? <div className={cls.rowBG}/> : <></>
            }
            <tr className={`${props.selected?.includes(props.row) ? cls.rowSelectedBackground : ''} ${cls.body_items}`}
                style={{backgroundColor: `${props.row.color != undefined ? props.row.color : ''}`}}
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
                        if (item.isCurrency) item.isNumber = true
                        return (
                            <>
                                <td key={index}
                                    style={{textAlign: `${item.align!}`, width: `${item.width!}%`}}
                                    ref={setTriggerRef}
                                >
                                    {
                                        item.isCurrency ?
                                            item.isEditable ?
                                                //Ячейка редактируемая + валюта
                                                <div className={cls.price_column}>
                                                    <EditableSpan title={r(props.row[item.id] * fbts.c).toString()}
                                                                  onChangeInput={(newInputValue) => {
                                                                      if (item.isNumber) {
                                                                          let newValue = (Number.parseFloat(newInputValue) * fstb.c).toString()
                                                                          let newRow = {...props.row}
                                                                          if (newValue != 'NaN') {
                                                                              newRow[item.id] = newValue
                                                                              console.log('updated')
                                                                          }
                                                                          props.setRow(newRow)
                                                                      }
                                                                  }}
                                                                  inputClassName={cls.currency_inputClassName1}
                                                                  spanClassName={cls.currency_spanClassName1}
                                                    />
                                                    <div>{fbts.s}</div>
                                                </div>
                                                //Ячейка нередактируемая + валюта
                                                : <div>{r(props.row[item.id] * fbts.c) + ' ' + fbts.s}</div>

                                            : item.isEditable ?
                                                //Ячейка редактируемая + не валюта
                                                <EditableSpan title={props.row[item.id]}
                                                              onChangeInput={(newInputValue) => {
                                                                  if (item.isNumber) {
                                                                      let newValue = Number.parseFloat(newInputValue).toString()
                                                                      let newRow = {...props.row}
                                                                      if (newValue != 'NaN') {
                                                                          newRow[item.id] = newValue
                                                                          console.log('updated')
                                                                      }
                                                                      props.setRow(newRow)
                                                                  }
                                                              }}
                                                              inputClassName={cls.currency_inputClassName2}
                                                              spanClassName={cls.currency_spanClassName2}
                                                />
                                                //Ячейка не редактируемая + не валюта
                                                : <div style={{alignContent: 'center'}}>{props.row[item.id]}</div>
                                    }
                                </td>
                                {/*{*/}
                                {/*    visible &&*/}
                                {/*    <>*/}
                                {/*        <div ref={setTooltipRef} {...getTooltipProps({className: 'tooltip-container'})}>*/}
                                {/*            {item.label}*/}
                                {/*        </div>*/}
                                {/*        <div {...getArrowProps({className: 'tooltip-arrow'})} />*/}
                                {/*    </>*/}
                                {/*}*/}
                            </>
                        )
                    })
                }
            </tr>
        </>
    )
})