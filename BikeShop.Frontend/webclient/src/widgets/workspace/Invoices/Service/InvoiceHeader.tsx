import React from 'react'
import {Shop, User} from "../../../../entities"
import s from "../../WorkActs/ActHeader.module.scss"

export const InvoiceHeader = (props: { client: User | null, shop: Shop }) => {

    return (
        <>
            <div className={s.workAct_header}>
                <div className={s.header_customer}>
                    <div className={s.header_title}>Заказчик</div>
                    <div className={s.header_content}>
                        {
                            props.client === null ?
                            <div>Загрузка</div>
                            :
                            <>
                                <div>{props.client.firstName}</div>
                                <div>{props.client.lastName}</div>
                                <div>{props.client.patronymic}</div>
                                <div>{props.client.phoneNumber}</div>
                            </>
                        }
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