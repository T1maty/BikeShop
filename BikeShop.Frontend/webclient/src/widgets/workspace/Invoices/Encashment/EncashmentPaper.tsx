import React from 'react';
import {Encashment, useCurrency} from "../../../../entities";
import {formatDate} from "../../../../shared/utils/formatDate";
import s from './EncashmentPaper.module.scss'

export const EncashmentPaper = (props: { encashmant: Encashment }) => {
    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)
    return (
        <div className={s.wrapper}>
            <div>Инкассация</div>
            <div>Дата: {formatDate(props.encashmant.createdAt)}</div>
            <div>Наличка: {r(props.encashmant.cash * fbts.c) + fbts.s}</div>
            <div>Терминал:{r(props.encashmant.card * fbts.c) + fbts.s}</div>
            <div>Остаток:{r(props.encashmant.card * fbts.c) + fbts.s}</div>
            <div>Id юзера:{props.encashmant.userCreated}</div>
            <div>Id магазина:{props.encashmant.shopId}</div>
            <div>Описание:{props.encashmant.description}</div>
        </div>
    );
};