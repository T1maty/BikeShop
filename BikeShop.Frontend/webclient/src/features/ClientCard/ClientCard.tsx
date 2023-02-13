import React from 'react'
import s from "./ClientCard.module.scss";

const ClientCard = () => {

    return (
        <div className={s.clientCard_background}>
            <h3>Клиент</h3>
            <p>Панкратов Евгений Владимирович</p>
            <p>Номер телефона: +7-9033-11-22-33</p>
            <p>Почта: example@gmail.com</p>
            <p>Баланс: 10 000</p>
            <p>Кредитный лимит: 1000</p>
        </div>
    )
}

export default ClientCard;