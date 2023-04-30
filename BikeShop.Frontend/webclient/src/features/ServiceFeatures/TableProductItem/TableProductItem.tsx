import React from 'react'
import s from './TableProductItem.module.scss'
import {useCurrency} from "../../../entities"

interface TableItemProps {
    name: string
    price: number
    count: number
}

export const TableProductItem: React.FC<TableItemProps> = ({name, price, count}) => {

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)

    return (
        <div className={s.tableItem_box}>
            <div className={s.tableItem_title}>{name}</div>
            <div className={s.tableItem_numbers}>
                <div className={s.tableItem_price}>
                    <div>{r(price * fbts.c) + fbts.s}</div>
                    <div className={s.multiply}>x</div>
                    <div>{count}</div>
                </div>
                <div className={s.tableItem_sum}>{r(count * price * fbts.c) + fbts.s}</div>
            </div>
        </div>
    )
}