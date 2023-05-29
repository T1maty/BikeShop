import React from 'react'
import s from "./ClientCard.module.scss"
import {User} from "../../../entities"

interface ClientCardProps {
    user: User | null
    onDoubleClick?: () => void
}

export const ClientCard: React.FC<ClientCardProps> = ({user, onDoubleClick}) => {

    return (
        <div className={s.clientCard_background}
             onDoubleClick={() => {
                 onDoubleClick ? onDoubleClick() : true
             }}
        >
            <h3>Клиент</h3>
            <p className={s.fio}>
                <span>ФИО:</span> {''}
                {user?.lastName ? user?.lastName : 'Клиент'} {''}
                {user?.firstName ? user?.firstName : 'не'} {''}
                {user?.patronymic ? user?.patronymic : 'выбран'}
            </p>
            <p><span>Номер телефона:</span> {user?.phoneNumber ? user?.phoneNumber : 'Клиент не выбран'}</p>
            {/*<p><span>Почта:</span> {email}</p>*/}
            <p><span>Баланс:</span> {user?.balance ? user?.balance : 0}</p>
            <p><span>Кредитный лимит:</span> {user?.creditLimit ? user?.creditLimit : 0}</p>
        </div>
    )
}