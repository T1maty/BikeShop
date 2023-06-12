import React from 'react'
import s from './CheckStyles.module.scss'
import {ServiceWithData, useCurrency} from "../../../entities"
import {formatDate} from "../../../shared/utils/formatDate"

export const CheckForServiceWork = (props: { children: ServiceWithData }) => {

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)

    return (
        <div className={s.workAct_wrapper}>
            <div className={s.workAct_mainBox}>

                <div className={s.workAct_date}>
                    <div className={s.date_title}>
                        Чек №{props.children.service.id}
                    </div>
                    <div className={s.date_date}>
                        {formatDate(props.children.service.createdAt)}
                    </div>
                </div>
                <div className={s.workAct_title}>
                    <div className={s.title_title}>
                        Ремонтируемая техника:
                    </div>
                    <div className={s.title_info}>
                        {props.children.service.name}
                    </div>
                </div>
                {
                    props.children.works.length > 0 ?
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
                                        props.children.works.map((n) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td style={{width: '220px', textAlign: 'left'}}>
                                                            {
                                                                n.complicationPrice > 0 ?
                                                                    <>
                                                                        <div>{n.name}</div>
                                                                        <div style={{
                                                                            fontStyle: 'italic',
                                                                            fontSize: '14px',
                                                                            paddingLeft: '10px'
                                                                        }}>
                                                                            {n.description} (+ {r(n.complicationPrice * fbts.c) + fbts.s})
                                                                        </div>
                                                                    </>
                                                                    : n.name
                                                            }
                                                        </td>
                                                        <td style={{width: '50px'}}>
                                                            {r(n.price * fbts.c) + fbts.s}
                                                        </td>
                                                        <td style={{width: '34px'}}>
                                                            {n.quantity}
                                                        </td>
                                                        <td style={{width: '55px'}}>
                                                            {r((n.price * n.quantity + n.complicationPrice) * fbts.c) + fbts.s}
                                                        </td>
                                                    </tr>
                                                    {/*{*/}
                                                    {/*    n.complicationPrice > 0 ?*/}
                                                    {/*        <tr>*/}
                                                    {/*            <td style={{width: '220px', fontStyle: 'italic',*/}
                                                    {/*                textAlign: 'left', fontSize: '14px'}}>*/}
                                                    {/*                {n.description}*/}
                                                    {/*            </td>*/}
                                                    {/*            <td style={{width: '50px'}}>*/}
                                                    {/*                {n.complicationPrice}*/}
                                                    {/*            </td>*/}
                                                    {/*            <td style={{width: '34px'}}>*/}
                                                    {/*                1*/}
                                                    {/*            </td>*/}
                                                    {/*            <td style={{width: '55px'}}>*/}
                                                    {/*                {n.complicationPrice}*/}
                                                    {/*            </td>*/}
                                                    {/*        </tr>*/}
                                                    {/*        : ''*/}
                                                    {/*}*/}
                                                </>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <div className={s.works_result}>
                                {
                                    props.children.service.discountWork > 0 ?
                                        <div>
                                            Скидка: <span style={{fontWeight: 'bold'}}>
                                            {r(props.children.service.discountWork * fbts.c) + fbts.s}</span>
                                        </div> : ''
                                }
                                <div>
                                    Всего услуг: <span style={{fontWeight: 'bold'}}>
                                    {r(props.children.service.totalWork * fbts.c) + fbts.s}
                                    </span>
                                </div>
                            </div>
                        </div> : ''
                }

                {
                    props.children.products.length > 0 ?
                        <div className={s.workAct_products}>
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
                                                        {r(n.price * fbts.c) + fbts.s}
                                                    </td>
                                                    <td style={{width: '34px'}}>
                                                        {n.quantity}
                                                    </td>
                                                    <td style={{width: '55px'}}>
                                                        {r(n.price * n.quantity * fbts.c) + fbts.s}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <div className={s.works_result}>
                                <div>Скидка: <span
                                    style={{fontWeight: 'bold'}}>
                                        {r(props.children.service.discountProduct * fbts.c) + fbts.s}
                                    </span>
                                </div>
                                <div>Всего товаров: <span
                                    style={{fontWeight: 'bold'}}>
                                        {r(props.children.service.totalProduct * fbts.c) + fbts.s}
                                    </span>
                                </div>
                            </div>
                        </div> : ''
                }

                <div className={s.workAct_discount}>
                    {
                        props.children.service.discount > 0 ?
                            <>
                                <div>Сумма без скидки: <span
                                    style={{fontWeight: 'bold'}}>
                                        {r(props.children.service.total - props.children.service.discount * fbts.c) + fbts.s}
                                    </span>
                                </div>
                                <div>Скидка: <span
                                    style={{fontWeight: 'bold'}}>
                                        {r(props.children.service.discount * fbts.c) + fbts.s}
                                    </span>
                                </div>
                            </> : ''
                    }
                </div>
                <div className={s.workAct_result}>
                    К оплате: {r(props.children.service.total * fbts.c) + fbts.s}
                </div>

            </div>
        </div>
    )
}