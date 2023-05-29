import React from 'react'
import s from './TableProductItem.module.scss'
import {useCurrency} from "../../../entities"

interface TableItemProps {
    name: string
    price: number
    cPrice?: number
    count: number
    onPriceClick?: () => void,
    onDoubleClick?: () => void
    discount?: number
    unitName?: string
}

export const TableProductItem: React.FC<TableItemProps> = ({
                                                               name,
                                                               price,
                                                               count,
                                                               onPriceClick,
                                                               discount,
                                                               unitName,
                                                               onDoubleClick, cPrice
                                                           }) => {

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)

    return (
        <div className={s.tableItem_box} onDoubleClick={() => {
            onDoubleClick ? onDoubleClick() : true
        }}>
            <div className={s.tableItem_title}>{name}</div>
            <div className={s.tableItem_numbers}>
                <div className={s.tableItem_price}
                     onClick={() => {
                         onPriceClick != null ? onPriceClick() : false
                     }}
                >
                    <div>{r(price * fbts.c) + fbts.s}</div>
                    {//<div className={s.multiply}>x</div>
                    }
                    <div>{count} {unitName ? unitName : 'шт.'}</div>
                </div>
                <div className={s.tableItem_sum}>
                    {
                        discount ? discount > 0 ? <div>$ -0</div> : '' : ''
                    }
                    <div>{r((count * price + ((cPrice != undefined) ? cPrice : 0)) * fbts.c) + fbts.s}</div>
                </div>
            </div>
        </div>
    )
}