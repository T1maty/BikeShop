import React from 'react'
import s from './TableProductItem.module.scss'

type TableItemProps = {
    title: string
    price: number
    count: number
}

const TableProductItem: React.FC<TableItemProps> = ({title, price, count}) => {

    return (
        <div className={s.tableItem_box}>
            <div className={s.tableItem_title}>{title}</div>
            <div className={s.tableItem_numbers}>
                <div className={s.tableItem_price}>
                    <div>{price}</div>
                    <div>x</div>
                    <div>{count}</div>
                </div>
                <div className={s.tableItem_sum}>{price*count}</div>
            </div>
        </div>
    )
}

export default TableProductItem;