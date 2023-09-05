import React, {memo, useEffect, useRef, useState} from 'react'
import cls from './UniTable.module.scss'
import {Loader} from '../Loader/Loader'
import {EditableSpan} from '../EditableSpan/EditableSpan'
import {UniTableColumn, useCurrency} from '../../../entities'
import {Tooltip} from "react-tooltip";

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

function darkenColor(hexColor: string, percent: number): string {
    // Ensure the percent is between 0 and 1
    const ratio = 1 - Math.min(Math.max(percent, 0), 1);

    // Convert hex to RGB
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);

    // Calculate the adjustment value for each color component
    const adjust = (color: number) => Math.round(color * ratio);

    // Return the darkened color in hex format
    return `#${adjust(r).toString(16).padStart(2, '0')}${adjust(g).toString(16).padStart(2, '0')}${adjust(b).toString(16).padStart(2, '0')}`;
}

interface TableRowProps {
    row?: any
    setRow: (row: any) => void
    columns: UniTableColumn[]
    rowOnContext?: (row: object, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
    onRowDoubleClick?: (row: object, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void

    selected: any[]
    setSelected: (row: any[]) => void

    onMouseEnter: () => void
    onMouseLeave: () => void
    color?: string
}

export const UniTable = (props: TableProps) => {

    const [selected, setSelected] = useState<any[]>([])
    const [hover, setHover] = useState<number | null>(null)

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
                                             onMouseEnter={() => {
                                                 setHover(index)
                                             }}
                                             onMouseLeave={() => {
                                                 setHover(null)
                                             }}
                                             color={(index === hover && item.color != undefined) ? darkenColor(item.color, 0.2) : item.color}

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

    return (
        <tr className={cls.head_items}>
            {
                theadData.map((item: UniTableColumn, index) =>
                    <>
                        <td key={index}
                            title={item.id}
                            className={cls.head_item}
                            style={{width: `${item.width!}%`}}
                        >
                            {item.label}
                        </td>
                    </>
                )
            }
        </tr>
    )
})


const TableRow = memo((props: TableRowProps) => {

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)

    const ref = useRef<HTMLTableRowElement | null>(null);
    const [isInViewport, setIsInViewport] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInViewport(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref]);

    const scrollToRef = () => {
        if (!isInViewport) {
            ref.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    useEffect(() => {
        if (props.selected?.includes(props.row)) scrollToRef()
    }, [props.selected])

    return (
        <>
            <tr ref={ref} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}
                className={`${props.selected?.includes(props.row) ? cls.rowSelectedBackground : ''} ${cls.body_items}`}
                style={{backgroundColor: `${props.color != undefined ? props.color : ''}`}}
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
                        let cellId = props.row.id + '_' + item.id

                        let limitedData = props.row[item.id]
                        let shopTip = item.limit! < props.row[item.id]?.toString().length
                        if (item.limit != undefined && shopTip) limitedData = props.row[item.id].slice(0, item.limit) + '...'

                        return (
                            <>
                                <td key={index}
                                    style={{textAlign: `${item.align!}`, width: `${item.width!}%`}}
                                    id={cellId}
                                >
                                    <>
                                        {
                                            item.isCurrency ?
                                                item.isEditable ?
                                                    //Ячейка редактируемая + валюта
                                                    <div className={cls.price_column}>
                                                        <EditableSpan
                                                            title={r(props.row[item.id] * fbts.c).toString()}
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
                                                    : <div style={{alignContent: 'center'}}>{limitedData}</div>
                                        }

                                        <Tooltip
                                            anchorId={cellId}
                                            positionStrategy="fixed"
                                            place="bottom"
                                            content={props.row[item.id]}
                                            clickable
                                            hidden={!shopTip}
                                        />

                                    </>
                                </td>


                            </>
                        )
                    })
                }
            </tr>
        </>
    )
})