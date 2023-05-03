import React from 'react'
import s from './TableProductItemAdditional.module.scss'
import {useCurrency} from "../../../entities"
import {DeleteButton, EditableSpan} from "../../../shared/ui"

interface TableItemAdditionalProps {
    name: string
    price: number
    count: number
    onChange: (desc: string, price: string) => void
}

export const TableProductItemAdditional: React.FC<TableItemAdditionalProps> = ({name, price, count, onChange}) => {

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)

    const deleteAdditionalWorkHandler = () => {
        onChange('', '0')
    }

    return (
        <div className={s.tableItem_box}>
            <div className={s.tableItem_title}>
                <EditableSpan title={name}
                              onChangeInput={(v) => {onChange(v, price.toString())}}
                              inputClassName={s.editableSpanInput_description}
                              spanClassName={s.editableSpanSpan_description}
                />
            </div>
            <div className={s.tableItem_numbers}>
                <div className={s.tableItem_price}>
                    <EditableSpan title={r(price * fbts.c).toString()}
                                  onChangeInput={(v) => {onChange(name, v)}}
                                  inputClassName={s.editableSpanInput_price}
                                  spanClassName={s.editableSpanSpan_price}
                    />
                    {fbts.s}
                </div>
                <DeleteButton size={25} onClick={deleteAdditionalWorkHandler}/>
            </div>
        </div>
    )
}