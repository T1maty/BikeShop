import React from 'react';
import {Modal} from "@mui/material";
import {Button} from '../../shared/ui'
import s from './PayModal.module.scss'
import {ClientCard} from "../../widgets";
import {User} from "../../entities";

interface props {
    open: boolean,
    setOpen: (value: boolean) => void,
    user?: User,
    summ: number
    result: (value: {
        cash: number,
        bankCount: number,
        card: number,
        personalBalance: number,
    }) => void
}

export const PayModal = (props: props) => {

    return (
        <Modal
            open={props.open}
            onClose={() => {
                props.setOpen(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.payModal_mainBox}>
                <div className={s.payModal_header}>
                    <div className={s.header_text}>
                        К оплате:
                    </div>
                    <div className={s.header_sum}>
                        {props.summ}
                    </div>
                </div>
                <div className={s.payModal_clientCard}>
                    {props.user ? <ClientCard user={props.user}/> : 'Пользователь не выбран'}
                </div>
                <div className={s.payModal_payType}>
                    <Button onClick={() => {
                    }}>
                        Использовать терминал
                    </Button>
                    <Button onClick={() => {
                    }}>
                        Оплата с баланса
                    </Button>
                </div>
                <div className={s.payModal_cashbackBlock}>
                    <div className={s.cashbackBlock_info}>
                    </div>
                    <div className={s.cashbackBlock_buttons}>
                        <Button onClick={() => {
                            props.result({cash: props.summ, card: 0, bankCount: 0, personalBalance: 0})
                        }}>
                            Оплатить
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};