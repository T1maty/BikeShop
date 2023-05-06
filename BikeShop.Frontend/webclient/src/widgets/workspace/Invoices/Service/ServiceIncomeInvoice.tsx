import React, {useEffect, useState} from 'react'
import s from '../../WorkActs/ActGetStuffService.module.scss'
import {AuthAPI, ServiceWithData, useAuth, User} from "../../../../entities"
import {formatDate} from "../../../../shared/utils/formatDate"
import {InvoiceHeader} from "./InvoiceHeader"

export const ServiceIncomeInvoice = (props: { children: ServiceWithData }) => {

    const shop = useAuth(s => s.shop)
    const employee = useAuth(s => s.user)

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        AuthAPI.User.getUserById(props.children.service.clientId).then((r) => {
            setUser(r.data)
        })
    }, [props.children])

    return (
        <div className={s.workAct_wrapper}>
            <div className={s.workAct_mainBox}>

                <InvoiceHeader client={user} shop={shop!}/>

                <div className={s.workAct_date}>
                    <div className={s.date_title}>
                        № {props.children.service.id}
                    </div>
                    <div className={s.date_date}>
                        {formatDate(props.children.service.createdAt)}
                    </div>
                </div>

                <div className={s.workAct_title}>
                    <div className={s.title_title}>
                        Техника, передаваемая на ремонт:
                    </div>
                    <div className={s.title_info}>
                        {props.children.service.name}
                    </div>
                </div>

                <div className={s.client_info}>
                    <div className={s.info_title}>
                        Пожелания заказчика:
                    </div>
                    <div className={s.info_content}>
                        {props.children.service.clientDescription}
                    </div>
                </div>
                <div className={s.agreement_policy}>
                    С правилами и условиями настоящего Соглашения в полном объеме
                    до начала использования Сервиса ознакомлен и согласен
                </div>
                <div className={s.shop_signature}>
                    <div style={{fontWeight: 'bold'}}>Подпись сотрудника</div>
                    <div>{employee?.firstName + ' ' + employee?.lastName!}</div>
                </div>
                <div className={s.client_signature}>
                    <div style={{fontWeight: 'bold'}}>Подпись клиента</div>
                    <div>{user?.lastName + ' ' + user?.firstName}</div>
                </div>
            </div>
        </div>
    )
}