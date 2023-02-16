import React from 'react'
import s from "./ClientCard.module.scss";
import useClientCard from './ClientCardStore';

const ClientCard = () => {

    const firstName = useClientCard(s => s.firstName)
    const lastName = useClientCard(s => s.lastName)
    const patronymic = useClientCard(s => s.patronymic)
    const phoneNumber = useClientCard(s => s.phoneNumber)
    const email = useClientCard(s => s.email)
    const balance = useClientCard(s => s.balance)
    const creditLimit = useClientCard(s => s.creditLimit)

    return (
        <div className={s.clientCard_background}>
            <h3>Клиент</h3>
            <p><span>ФИО:</span> {lastName} {firstName} {patronymic}</p>
            <p><span>Номер телефона:</span> {phoneNumber}</p>
            {/*<p><span>Почта:</span> {email}</p>*/}
            <p><span>Баланс:</span> {balance}</p>
            <p><span>Кредитный лимит:</span> {creditLimit}</p>
        </div>
    )
}

export default ClientCard;