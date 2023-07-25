import React from 'react';
import s from './ClientsBalanceManager.module.scss'
import {UniTable} from "../../shared/ui";

const ClientsBalanceManager = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.left}>
                <UniTable rows={} columns={}/>
            </div>
            <div className={s.right}>right</div>
        </div>
    );
};

export default ClientsBalanceManager;