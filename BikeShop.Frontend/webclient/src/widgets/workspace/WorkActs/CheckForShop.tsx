import React from 'react'
import s from './CheckStyles.module.scss'
import {BillWithProducts} from "../../../entities";

export const CheckForShop = (props: { children: BillWithProducts }) => {

    return (
        <div className={s.workAct_wrapper}>
            <div className={s.workAct_mainBox}>

                <div className={s.workAct_date}>
                    <div className={s.date_title}>
                        Чек №{props.children.bill.id}
                    </div>
                    <div className={s.date_date}>
                        от {props.children.bill.createdAt}
                    </div>
                </div>
                <div className={s.workAct_works}>
                    <div className={s.works_content}>
                        {props.children.products.map((n) => {
                            return (
                                <div>
                                    {n.name}
                                    <br/>
                                </div>)
                        })}
                    </div>
                    <div className={s.works_result}>
                        <div>Всего: <span
                            style={{fontWeight: 'bold'}}>{props.children.bill.total + props.children.bill.discount}</span>
                        </div>
                        <div>Скидка: <span style={{fontWeight: 'bold'}}>{props.children.bill.discount}</span></div>
                    </div>
                </div>
                <div className={s.workAct_result}>
                    К оплате: {props.children.bill.total}
                </div>

            </div>
        </div>
    )
}