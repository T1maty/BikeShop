import React, {useState} from 'react'
import s from './TableProductItem.module.scss'
import {useCurrency, User} from "../../../entities"
import SelectEmployeeModal from "../../SelectEmployeeModal/SelectEmployeeModal";
import useService from "../../../pages/workspace/Service/ServiceStore";

interface TableItemProps {
    name: string
    userLastName?: string
    price: number
    cPrice?: number
    count: number
    onPriceClick?: () => void,
    onDoubleClick?: () => void
    discount?: number
    unitName?: string
    setUser: (u: User) => void
    setQuantity: (q: number) => void
}

export const TableProductItem: React.FC<TableItemProps> = ({
                                                               name,
                                                               price,
                                                               count,
                                                               onPriceClick,
                                                               discount,
                                                               unitName,
                                                               onDoubleClick, cPrice, setQuantity, userLastName, setUser
                                                           }) => {

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)
    const masters = useService(s => s.masters)

    const [oSE, sOSE] = useState(false)

    return (
        <div className={s.tableItem_box} onDoubleClick={() => {
            onDoubleClick ? onDoubleClick() : true
        }}>
            <SelectEmployeeModal open={oSE} setOpen={sOSE} Users={masters} OnSelect={(User) => {
                setUser(User)
                console.log(User)
            }}/>
            <div className={s.tableItem_employee} onClick={() => {
                sOSE(true)
            }}>{userLastName ? userLastName : "NotFound"}</div>
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
                    <div className={s.tableItemQuantity}>
                        <div className={s.removeButton} onClick={() => {
                            setQuantity(count - 1)
                        }}>-
                        </div>
                        {count} {unitName ? unitName : 'шт'}
                        <div className={s.addButton} onClick={() => {
                            setQuantity(count + 1)
                        }}>+
                        </div>
                    </div>
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