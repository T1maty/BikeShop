import React from 'react';
import {Modal} from "@mui/material";
import Button from '../../shared/ui/Button/Button';
import s from './PayModal.module.scss'
import usePayModal from './PayModalStore';
import {ClientCard} from '../index';

const PayModal = () => {
    const open = usePayModal(s => s.payModal)
    const setOpen = usePayModal(s => s.setPayModal)

    const chooseButtonHandler = () => {
        // code here
        setOpen(false);
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
                    <ClientCard/>
                </div>
                <div className={s.payModal_payType}>
                    <Button text={'Использовать терминал'} onClick={() => {}}/>
                    <Button text={'Оплата баланса'} onClick={() => {}}/>
                </div>
                <div className={s.payModal_cashValue}>
                    Полученная сумма наличными
                </div>
                <div className={s.payModal_cashbackBlock}>
                    <div className={s.cashbackBlock_text}>Сдача:</div>
                    <div className={s.cashbackBlock_value}>410</div>
                    <div className={s.cashbackBlock_buttons}>
                        <Button text={'Оплатить'} onClick={chooseButtonHandler}/>
                        <Button text={'Отмена'} onClick={() => {setOpen(false)}}/>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PayModal;