import React from 'react'
import s from "./ClientCard.module.scss"
import {useCurrency, User} from "../../../entities"

interface ClientCardProps {
    user: User | null
    onDoubleClick?: () => void
}

export const ClientCard: React.FC<ClientCardProps> = ({user, onDoubleClick}) => {

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)

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
            <p><span>Баланс:</span> {user?.balance ? r(user?.balance * fbts.c) + fbts.s : 0 + fbts.s}</p>
            <p><span>Кредитный лимит:</span> {user?.creditLimit ? r(user?.creditLimit * fbts.c) + fbts.s : 0 + fbts.s}
            </p>
        </div>
    )
}