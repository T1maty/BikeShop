import React, {useState} from 'react'
import {Button, CustomInput, CustomModal} from '../../shared/ui'
import s from './PayModal.module.scss'
import {ClientCard} from "../../widgets"
import {LocalStorage, PaymentData, User} from "../../entities"

interface PayModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    user: User | null
    summ: number
    result: (value: PaymentData) => void
}

export const PayModal = (props: PayModalProps) => {

    const [cash, setCash] = useState<number>()

    return (
        <CustomModal
            open={props.open}
            onClose={() => {
                props.setOpen(false)
            }}
        >
            <div className={s.payModal_mainBox}>

                <div className={s.payModal_header}>
                    <div className={s.header_text}>
                        К оплате:
                    </div>
                    <div className={s.header_sum}>
                        {props.summ * LocalStorage.currency.fbts() + LocalStorage.currency.symbol()!}
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
                    }} disabled={props.user === null}>
                        Оплата с баланса
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

                        <Button onClick={() => {
                            props.result({
                                cash: 0,
                                card: props.summ,
                                bankCount: 0,
                                personalBalance: 0
                            })
                            props.setOpen(false)
                        }}>
                            Использовать терминал
                        </Button>
                        <br/>
                        <Button onClick={() => {
                            props.result({
                                cash: props.summ,
                                card: 0,
                                bankCount: 0,
                                personalBalance: 0
                            })
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