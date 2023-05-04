import React from 'react'
import s from './CheckStyles.module.scss'
import {BillWithProducts, useAuth, useCurrency} from "../../../entities"
import {formatDate} from "../../../shared/utils/formatDate"
import useCashboxStore from "../../../pages/workspace/Cashbox/CashboxStore"

export const CheckForShop = (props: { children: BillWithProducts }) => {

    const findCurrency = useCurrency(s => s.find)
    const user = useAuth(s => s.user)
    const client = useCashboxStore(s => s.user)
    const discount = false // пофиксить!

    return (
        <div className={s.workAct_wrapper}>
            <div className={s.workAct_mainBox}>

                <div className={s.shop_title}>
                    Веломагазин BikeShop
                </div>
                <div className={s.workAct_date}>
                    <div className={s.date_title}>
                        Чек №{props.children.bill.id}
                    </div>
                    <div className={s.date_date}>
                        от {formatDate(props.children.bill.createdAt)}
                    </div>
                </div>

                <div className={s.workAct_works}>
                    <div className={s.works_content}>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{width: '220px'}}>Название</th>
                                    <th style={{width: '50px'}}>Цена</th>
                                    <th style={{width: '34px'}}>Шт.</th>
                                    <th style={{width: '55px'}}>Итого</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.children.products.map((n) => {
                                        return (
                                            <tr>
                                                <td style={{width: '220px'}}>
                                                    {n.name}
                                                </td>
                                                <td style={{width: '50px'}}>
                                                    {n.price}
                                                </td>
                                                <td style={{width: '34px'}}>
                                                    {n.quantity}
                                                </td>
                                                <td style={{width: '55px'}}>
                                                    {n.price * n.quantity}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className={s.works_names}>
                        <div>
                            <span style={{textDecoration: 'underline'}}>Кассир:</span> {' '}
                            {user && user.lastName} {user && user.firstName} {user && user.patronymic}</div>
                        <div>
                            <span style={{textDecoration: 'underline'}}>Покупатель:</span> {' '}
                            {client ? client.lastName : 'Неизвестный'} {client ? client.firstName : 'покупатель'} {client ? client.patronymic : ''}
                        </div>
                    </div>
                    <div className={s.works_result}>
                        <div>
                            Всего: {' '}
                            <span style={{fontWeight: 'bold'}}>
                                {props.children.bill.total + props.children.bill.discount + findCurrency(props.children.bill.currencyId)?.symbol!}
                            </span>
                        </div>
                        {
                            discount ?
                                <div>
                                    Скидка: {' '}
                                    <span style={{fontWeight: 'bold'}}>
                                        {props.children.bill.discount + findCurrency(props.children.bill.currencyId)?.symbol!}
                                    </span>
                                </div>
                                : ''
                        }
                    </div>
                </div>
                <div className={s.workAct_result}>
                    К оплате: {props.children.bill.total + findCurrency(props.children.bill.currencyId)?.symbol!}
                </div>

            </div>
        </div>
    )
}