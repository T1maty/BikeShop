import React from 'react'
import s from "./ClientCard.module.scss";

interface ClientCardProps {
    user: {
        id: string
        lastName: string
        firstName: string
        patronymic: string
        phoneNumber: string
        balance: number
        creditLimit: number
    }
}

const ClientCard: React.FC<ClientCardProps> = ({user}) => {

    // const lastName = useClientCardStore(s => s.lastName)
    // const firstName = useClientCardStore(s => s.firstName)
    // const patronymic = useClientCardStore(s => s.patronymic)
    // const phoneNumber = useClientCardStore(s => s.phoneNumber)
    // // const email = useGlobalDataStore(s => s.email)
    // const balance = useClientCardStore(s => s.balance)
    // const creditLimit = useClientCardStore(s => s.creditLimit)

    return (
        <div className={s.clientCard_background}>
            <h3>Клиент</h3>
            <p><span>ФИО:</span> {user.lastName} {user.firstName} {user.patronymic}</p>
            <p><span>Номер телефона:</span> {user.phoneNumber ? user.phoneNumber : 'Нет данных'}</p>
            {/*<p><span>Почта:</span> {email}</p>*/}
            <p><span>Баланс:</span> {user.balance}</p>
            <p><span>Кредитный лимит:</span> {user.creditLimit}</p>
        </div>
    )
}

export default ClientCard;