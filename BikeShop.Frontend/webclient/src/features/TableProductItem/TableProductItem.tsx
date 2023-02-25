import React from 'react'
import s from './TableProductItem.module.scss'

interface TableItemProps {
    name: string
    price: number
    count: number
}

const TableProductItem: React.FC<TableItemProps> = ({name, price, count}) => {

    return (
        <div className={s.tableItem_box}>
            <div className={s.tableItem_title}>{name}</div>
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