import React from 'react';
import {Encashment} from "../../../../entities";
import {formatDate} from "../../../../shared/utils/formatDate";
import s from './EncashmentPaper.module.scss'

export const EncashmentPaper = (props: { encashmant: Encashment }) => {
    return (
        <div className={s.wrapper}>
            <div>Инкассация</div>
            <div>Дата: {formatDate(props.encashmant.createdAt)}</div>
            <div>Наличка: {props.encashmant.cash}</div>
            <div>Терминал:{props.encashmant.card}</div>
            <div>Остаток:{props.encashmant.cashRemain}</div>
            <div>Id юзера:{props.encashmant.userCreated}</div>
            <div>Id магазина:{props.encashmant.shopId}</div>
            <div>Описание:{props.encashmant.description}</div>
        </div>
    );
};