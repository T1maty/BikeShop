import React from 'react'
import s from "./ClientCard.module.scss";
import useClientCardStore from './ClientCardStore';

const ClientCard = () => {

    const lastName = useClientCardStore(s => s.lastName)
    const firstName = useClientCardStore(s => s.firstName)
    const patronymic = useClientCardStore(s => s.patronymic)
    const phoneNumber = useClientCardStore(s => s.phoneNumber)
    // const email = useGlobalDataStore(s => s.email)
    const balance = useClientCardStore(s => s.balance)
    const creditLimit = useClientCardStore(s => s.creditLimit)

    return (
        <div className={s.clientCard_background}>
            <h3>Клиент</h3>
            <p><span>ФИО:</span> {lastName} {firstName} {patronymic}</p>
            <p><span>Номер телефона:</span> {phoneNumber ? phoneNumber : 'Нет данных'}</p>
            {/*<p><span>Почта:</span> {email}</p>*/}
            <p><span>Баланс:</span> {balance}</p>
            <p><span>Кредитный лимит:</span> {creditLimit}</p>
        </div>
    )
}

export default ClientCard;