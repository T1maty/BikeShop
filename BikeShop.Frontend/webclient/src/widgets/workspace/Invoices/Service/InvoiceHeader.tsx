import React from 'react'
import {Shop} from "../../../../entities"
import s from "../../WorkActs/ActHeader.module.scss"

export const InvoiceHeader = (props: { fn: string, ln: string, ptr: string, phone: string, shop: Shop }) => {

    return (
        <>
            <div className={s.workAct_header}>
                <div className={s.header_customer}>
                    <div className={s.header_title}>Замовник</div>
                    <div className={s.header_content}>
                        <div>{props.fn}</div>
                        <div>{props.ln}</div>
                        <div>{props.ptr}</div>
                        <div>{props.phone}</div>
                    </div>
                </div>
                <div className={s.header_master}>
                    <div className={s.header_title}>Виконавець</div>
                    <div className={s.header_content}>
                        <div>{props.shop.name}</div>
                        <div>{props.shop.address}</div>
                        <div>bikelove.com.ua</div>
                        <div>+38(093) 211 89 30</div>
                    </div>
                </div>
            </div>
        </>
    )
}