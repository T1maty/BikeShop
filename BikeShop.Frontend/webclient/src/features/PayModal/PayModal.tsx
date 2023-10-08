import React, {useState} from 'react'
import {Button, CustomCheckbox, CustomInput, CustomModal} from '../../shared/ui'
import s from './PayModal.module.scss'
import {ClientCard} from "../../widgets"
import {LocalStorage, PaymentData, useCurrency, User} from "../../entities"
import {TerminalConfirmModal} from "./TerminalConfirmModal";

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

    const r = useCurrency(f => f.roundUp)

    return (
        <CustomModal
            open={props.open}
            onClose={() => {
                props.setOpen(false)
            }}
        >
            <div className={s.payModal_mainBox}>
                <TerminalConfirmModal open={openTerminalConfirm} setOpen={setOpenTerminalConfirm} onConfirm={() => {
                    props.result({
                        isFiscal: isFiscal,
                        cash: 0,
                        card: props.summ,
                        bankCount: 0,
                        personalBalance: 0
                        //parseFloat(r(props.summ * LocalStorage.currency.fbts()))
                    }, isPrint)
                    props.setOpen(false)
                }} onCancel={() => {
                }} amount={1}/>
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

                    <Button onClick={() => {
                        props.result({
                            isFiscal: isFiscal,
                            cash: 0,
                            card: 0,
                            bankCount: 0,
                            personalBalance: props.summ
                        }, isPrint)
                        props.setOpen(false)
                    }} disabled={props.user === null || (props.user.balance + props.user.creditLimit) < props.summ}>
                        {(props.user != null && (props.user.balance + props.user.creditLimit) < props.summ) ? "Недостатньо коштів на балансі" : "Оплатити з балансу"}
                    </Button>
                </div>

                <CustomInput
                    value={cash}
                    onChange={(e) => {
                        setCash(Number(e.currentTarget.value))
                    }}
                    placeholder={'Полученная сумма наличными'}
                />

                <div className={s.payModal_cashback}>
                    <div className={s.cashback_text}>
                        Сдача:
                    </div>
                    <div className={s.cashback_sum}>
                        {cash ? (cash - props.summ * LocalStorage.currency.fbts()) : 0} {LocalStorage.currency.symbol()!}
                    </div>
                </div>

                <div className={s.payModal_cashbackBlock}>
                    <div className={s.cashbackBlock_info}>
                    </div>
                    <div className={s.cashbackBlock_buttons}>

                        <CustomCheckbox checked={isFiscal} onChangeChecked={setIsFiscal} children={'Фискализация'}/>
                        <br/>
                        <br/>
                        <CustomCheckbox checked={isPrint} onChangeChecked={setIsPrint} children={'Печать'}/>
                        <br/>
                        <br/>

                        <Button onClick={() => setOpenTerminalConfirm(true)}>
                            Использовать терминал
                        </Button>
                        <br/>
                        <Button onClick={() => {
                            props.result({
                                isFiscal: isFiscal,
                                cash: props.summ,
                                card: 0,
                                bankCount: 0,
                                personalBalance: 0
                            }, isPrint)
                            props.setOpen(false)
                        }}
                        >
                            Наличка
                        </Button>
                        <br/>
                        <Button buttonDivWrapper={s.cancelButton}
                                onClick={() => {
                                    props.setOpen(false)
                                }}
                        >
                            Отмена
                        </Button>
                    </div>
                </div>

            </div>
        </CustomModal>
    )
}