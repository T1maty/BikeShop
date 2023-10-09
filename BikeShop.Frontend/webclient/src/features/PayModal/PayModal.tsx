import React, {useState} from 'react'
import {Button, CustomCheckbox, CustomModal} from '../../shared/ui'
import s from './PayModal.module.scss'
import {ClientCard} from "../../widgets"
import {LocalStorage, PaymentData, useCurrency, User} from "../../entities"
import {TerminalConfirmModal} from "./TerminalConfirmModal";
import cashIcon from './../../shared/assets/workspace/cash-svgrepo-com.svg'
import cardIcon from './../../shared/assets/workspace/card-svgrepo-com.svg'
import {CashConfirmModal} from "./CashConfirmModal";

interface PayModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    user: User | null
    summ: number
    result: (value: PaymentData, isPrint: boolean) => void
}

export const PayModal = (props: PayModalProps) => {

    const [cash, setCash] = useState<number>()
    const [isFiscal, setIsFiscal] = useState<boolean>(true)
    const [isPrint, setIsPrint] = useState<boolean>(true)
    const [openTerminalConfirm, setOpenTerminalConfirm] = useState<boolean>(false)
    const [openCashConfirm, setOpenCashConfirm] = useState<boolean>(false)

    const r = useCurrency(f => f.roundUp)

    const CashPayHandler = () => {
        props.result({
            isFiscal: isFiscal,
            cash: props.summ,
            card: 0,
            bankCount: 0,
            personalBalance: 0
        }, isPrint)
        props.setOpen(false)
    }
    const CardPayHandler = () => {
        props.result({
            isFiscal: isFiscal,
            cash: 0,
            card: props.summ,
            bankCount: 0,
            personalBalance: 0
            //parseFloat(r(props.summ * LocalStorage.currency.fbts()))
        }, isPrint)
        props.setOpen(false)
    }
    const BalancePayHandler = () => {
        props.result({
            isFiscal: isFiscal,
            cash: 0,
            card: 0,
            bankCount: 0,
            personalBalance: props.summ
        }, isPrint)
        props.setOpen(false)
    }


    return (
        <CustomModal
            open={props.open}
            onClose={() => {
                props.setOpen(false)
            }}
        >
            <div className={s.payModal_mainBox}>
                <TerminalConfirmModal open={openTerminalConfirm} setOpen={setOpenTerminalConfirm}
                                      onConfirm={CardPayHandler} onCancel={() => {
                }} amount={props.summ}/>
                <CashConfirmModal open={openCashConfirm} setOpen={setOpenCashConfirm} onConfirm={CashPayHandler}
                                  amount={props.summ}/>
                <div className={s.payModal_header}>
                    <div className={s.header_text}>
                        К оплате:
                    </div>
                    <div className={s.header_sum}>
                        {r(props.summ * LocalStorage.currency.fbts()) + LocalStorage.currency.symbol()!}
                    </div>
                </div>

                <div className={s.payModal_clientCard}>
                    {
                        props.user ? <ClientCard user={props.user}/>
                            : <div style={{textAlign: 'center'}}>'Покупатель не выбран'</div>
                    }
                </div>

                <div className={s.payModal_payType}>

                    <Button onClick={BalancePayHandler}
                            disabled={props.user === null || (props.user.balance + props.user.creditLimit) < props.summ}>
                        {(props.user != null && (props.user.balance + props.user.creditLimit) < props.summ) ? "Недостатньо коштів на балансі" : "Оплатити з балансу"}
                    </Button>
                </div>

                <div className={s.payModal_cashbackBlock}>
                    <div className={s.cashbackBlock_info}>
                    </div>
                    <div className={s.cashbackBlock_buttons}>

                        <CustomCheckbox checked={isFiscal} onChangeChecked={setIsFiscal} children={'Фискализация'}/>
                        <br/>
                        <br/>
                        <CustomCheckbox checked={isPrint} onChangeChecked={setIsPrint} children={'Печать'}/>
                        <div className={s.cashbackBlock_buttons_icons}>
                            <img className={s.cash} src={cashIcon} onClick={() => setOpenCashConfirm(true)}/>
                            <img className={s.card} src={cardIcon} onClick={() => setOpenTerminalConfirm(true)}/>
                        </div>
                        <Button buttonDivWrapper={s.cancelButton}
                                onClick={() => props.setOpen(false)}
                        >
                            Отмена
                        </Button>
                    </div>
                </div>

            </div>
        </CustomModal>
    )
}