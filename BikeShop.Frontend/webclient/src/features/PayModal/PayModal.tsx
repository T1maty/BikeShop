import React from 'react';
import {Modal} from "@mui/material";
import {Button} from '../../shared/ui'
import s from './PayModal.module.scss'
import usePayModal from './PayModalStore';
import {ClientCard} from "../../widgets";
import useCashboxStore from "../../pages/workspace/Cashbox/CashboxStore";

export const PayModal = () => {

    const open = usePayModal(s => s.openPayModal)
    const setOpen = usePayModal(s => s.setOpenPayModal)
    const user = useCashboxStore(s => s.user)

    const chooseButtonHandler = () => {
        // code here
        setOpen(false)
    }

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.payModal_mainBox}>
                <div className={s.payModal_header}>
                    <div className={s.header_text}>
                        К оплате:
                    </div>
                    <div className={s.header_sum}>
                        10 590
                    </div>
                </div>
                <div className={s.payModal_clientCard}>
                    <ClientCard user={user}/>
                </div>
                <div className={s.payModal_payType}>
                    <Button onClick={() => {}}>
                        Использовать терминал
                    </Button>
                    <Button onClick={() => {}}>
                        Оплата с баланса
                    </Button>
                </div>
                <div className={s.payModal_cashValue}>
                    Полученная сумма наличными
                </div>
                <div className={s.payModal_cashbackBlock}>
                    <div className={s.cashbackBlock_info}>
                        <div className={s.cashbackBlock_text}>Сдача:</div>
                        <div className={s.cashbackBlock_value}>410</div>
                    </div>
                    <div className={s.cashbackBlock_buttons}>
                        <Button onClick={chooseButtonHandler}>
                            Оплатить
                        </Button>
                        <Button onClick={() => {setOpen(false)}}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};