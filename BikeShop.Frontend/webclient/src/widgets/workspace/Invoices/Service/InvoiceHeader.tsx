import React from 'react'
import {Shop} from "../../../../entities"
import s from "../../WorkActs/ActHeader.module.scss"

export const InvoiceHeader = (props: { fn: string, ln: string, ptr: string, phone: string, shop: Shop }) => {

    return (
        <>
            <div className={s.workAct_header}>
                <div className={s.header_customer}>
                    <div className={s.header_title}>Заказчик</div>
                    <div className={s.header_content}>
                        <div>{props.fn}</div>
                        <div>{props.ln}</div>
                        <div>{props.ptr}</div>
                        <div>{props.phone}</div>
                    </div>
                </div>
                <div className={s.header_master}>
                    <div className={s.header_title}>Исполнитель</div>
                    <div className={s.header_content}>
                        <div>{props.shop.name}</div>
                        <div>{props.shop.address}</div>
                        <div>BikeShop59.store</div>
                        <div>8-9033-11-22-33</div>
                    </div>
                </div>
            </div>
        </>
    )
}