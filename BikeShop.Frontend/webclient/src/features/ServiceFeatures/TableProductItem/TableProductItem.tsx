import React from 'react'
import s from './TableProductItem.module.scss'
import {useCurrency} from "../../../entities"

interface TableItemProps {
    name: string
    price: number
    count: number
    onPriceClick?: () => void
}

export const TableProductItem: React.FC<TableItemProps> = ({name, price, count, onPriceClick}) => {

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)

    const discount = true

    return (
        <div className={s.tableItem_box}>
            <div className={s.tableItem_title}>{name}</div>
            <div className={s.tableItem_numbers}>
                <div className={s.tableItem_price}
                     onClick={() => {
                         onPriceClick != null ? onPriceClick() : false
                     }}
                >
                    <div>{r(price * fbts.c) + fbts.s}</div>
                    <div className={s.multiply}>x</div>
                    <div>{count}</div>
                </div>
                <div className={s.tableItem_sum}>
                    {
                        discount ? <div>$ -195</div> : ''
                    }
                    <div>{r(count * price * fbts.c) + fbts.s}</div>
                </div>
            </div>
        </div>
    )
}