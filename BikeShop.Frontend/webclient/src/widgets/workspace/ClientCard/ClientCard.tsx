import React from 'react'
import s from "./ClientCard.module.scss";
import {IUser} from "../../../entities";

interface ClientCardProps {
    user: IUser
}

const ClientCard: React.FC<ClientCardProps> = ({user}) => {

    return (
        <div className={s.clientCard_background}>
            <h3>Клиент</h3>
            <p><span>ФИО:</span> {user.lastName} {user.firstName} {user.patronymic}</p>
            <p><span>Номер телефона:</span> {user.phoneNumber}</p>
            {/*<p><span>Почта:</span> {email}</p>*/}
            <p><span>Баланс:</span> {user.balance}</p>
            <p><span>Кредитный лимит:</span> {user.creditLimit}</p>
        </div>
    )
}

export default ClientCard;