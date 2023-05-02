import React from 'react'
import s from './TableProductItemAdditional.module.scss'
import {useCurrency} from "../../../entities"
import {DeleteButton} from "../../../shared/ui"

interface TableItemAdditionalProps {
    name: string
    price: number
    count: number
}

export const TableProductItemAdditional: React.FC<TableItemAdditionalProps> = ({name, price, count}) => {

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)

    const deleteAdditionalWorkHandler = () => {
        // code here
    }

    return (
        <div className={s.tableItem_box}>
            <div className={s.tableItem_title}>{name}</div>
            <div className={s.tableItem_numbers}>
                <div className={s.tableItem_price}>
                    {r(price * fbts.c) + fbts.s}
                </div>
                <DeleteButton size={25} onClick={deleteAdditionalWorkHandler}/>
            </div>
        </div>
    )
}