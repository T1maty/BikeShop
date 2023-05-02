import React from 'react'
import {Button} from '../../../shared/ui'
import s from './ServiceTable.module.scss'
import {ServiceItemProductWork} from "../../../entities/models/Service/ServiceItem"
import {TableProductItem, TableProductItemAdditional} from "../../../features"
import {useCurrency} from "../../../entities"

type ServiceTableProps = {
    data: ServiceItemProductWork[] | null
    buttonTitle: string
    serviceTableCallback: () => void
    disabledButton: boolean
    summ: number
}

export const ServiceTable: React.FC<ServiceTableProps> = ({data, buttonTitle, serviceTableCallback,
                                                              disabledButton, summ}) => {
    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)

    const userClickHandler = () => {
        serviceTableCallback()
    }

    return (
        <div className={s.tableBox}>
            <div className={s.tableBox_buttons}>
                <div className={s.buttons_editBtn}>
                    <Button onClick={userClickHandler} disabled={disabledButton}>
                        {buttonTitle}
                    </Button>
                </div>
                <div className={s.buttons_discountField}>
                    <div className={s.discountField_title}>
                        Скидка
                    </div>
                    <div className={s.discountField_value}>
                        30%
                    </div>
                </div>
                <div className={s.buttons_resultField}>
                    {fbts.s + ' ' + r(summ * fbts.c)}
                </div>
            </div>
            <div className={s.tableBox_table}>
                <div className={s.scroll_wrapper}>
                    {
                        (data != null) && (data.length != 0) ?
                            data.map((item, index) => {
                                return (
                                    <>
                                        <TableProductItem key={index}
                                                          name={item.name}
                                                          price={item.price}
                                                          count={item.quantity}
                                        />

                                        <TableProductItemAdditional key={index}
                                                                    name={item.name}
                                                                    price={item.price}
                                                                    count={item.quantity}
                                        />
                                    </>
                                )
                            })
                            : <div>Список пуст</div>
                    }
                </div>
            </div>
        </div>
    )
}