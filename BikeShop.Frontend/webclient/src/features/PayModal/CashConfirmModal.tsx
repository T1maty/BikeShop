import React, {useEffect, useRef, useState} from 'react'
import {Button, CustomInput, CustomModal} from '../../shared/ui'
import s from './PayModal.module.scss'
import {useSnackbar} from "notistack";
import {LocalStorage, useCurrency} from "../../entities";
import twenty from './../../shared/assets/workspace/UAH/20.png';
import fifty from './../../shared/assets/workspace/UAH/50.png';
import hundred from './../../shared/assets/workspace/UAH/100.png';
import twoHundreds from './../../shared/assets/workspace/UAH/200.png';
import fiveHundreds from './../../shared/assets/workspace/UAH/500.png';
import Thousand from './../../shared/assets/workspace/UAH/1000.png';

interface p {
    open: boolean
    setOpen: (v: boolean) => void
    onConfirm: () => void
    amount: number
}

export const CashConfirmModal = (props: p) => {
    const {enqueueSnackbar} = useSnackbar()
    const [inp, setInp] = useState("0")
    const r = useCurrency(f => f.roundUp)
    const inputRef = useRef<HTMLInputElement>(null);

    const [cashBack, setCashBack] = useState(0)
    useEffect(() => {


        if (props.open) {
            setInp("0")
        }
    }, [props.open])

    const plus = (am: number) => {
        let val = parseFloat(inp)
        setInp((val + am).toString())
    }
    const minus = (am: number) => {
        let val = parseFloat(inp)
        let q = val - am
        setInp(q < 0 ? "0" : q.toString())
    }

    useEffect(() => {
        let cb = parseFloat(inp) - parseFloat(r(props.amount * LocalStorage.currency.fbts()))
        cb < 0 ? setCashBack(0) : setCashBack(cb)
    }, [props.amount, inp])


    return (
        <CustomModal
            open={props.open}
            onClose={() => props.setOpen(false)}
        >
            <div className={s.cash_conf}>
                <div className={s.cash_conf_data}>
                    <div>До сплати:</div>
                    <div style={{
                        fontWeight: 800,
                        fontSize: "24px"
                    }}>{r(props.amount * LocalStorage.currency.fbts()) + LocalStorage.currency.symbol()!}</div>
                </div>
                <div className={s.cash_conf_input}>
                    <div style={{backgroundColor: "#a64e4e"}} className={s.cash_conf_input_butt} onClick={() => {
                        minus(10)
                    }}>10
                    </div>
                    <div style={{backgroundColor: "#a64e4e"}} className={s.cash_conf_input_butt} onClick={() => {
                        minus(1)
                    }}>1
                    </div>
                    <div style={{width: "100px"}}>
                        <div style={{color: "white", fontSize: "12px", padding: "3px"}}>Отримано:</div>
                        <CustomInput inputRef={inputRef} value={inp} onChange={(v) => {
                            if (!isNaN(parseFloat(v.target.value))) setInp(v.target.value)
                        }} onClick={() => {
                            inputRef.current?.select()
                        }}/>
                    </div>
                    <div style={{backgroundColor: "#468c55"}} className={s.cash_conf_input_butt} onClick={() => {
                        plus(1)
                    }}>1
                    </div>
                    <div style={{backgroundColor: "#468c55"}} className={s.cash_conf_input_butt} onClick={() => {
                        plus(10)
                    }}>10
                    </div>
                </div>
                <div className={s.cash_conf_bills}>
                    <div className={s.cash_conf_bills_row}>
                        <img className={s.cash_conf_bills_row_bill} src={twenty} onClick={() => {
                            plus(20)
                        }}/>
                        <img className={s.cash_conf_bills_row_bill} src={fifty} onClick={() => {
                            plus(50)
                        }}/>
                    </div>
                    <div className={s.cash_conf_bills_row}>
                        <img className={s.cash_conf_bills_row_bill} src={hundred} onClick={() => {
                            plus(100)
                        }}/>
                        <img className={s.cash_conf_bills_row_bill} src={twoHundreds} onClick={() => {
                            plus(200)
                        }}/>

                    </div>
                    <div className={s.cash_conf_bills_row}>
                        <img className={s.cash_conf_bills_row_bill} src={fiveHundreds} onClick={() => {
                            plus(500)
                        }}/>
                        <img className={s.cash_conf_bills_row_bill} src={Thousand} onClick={() => {
                            plus(1000)
                        }}/>
                    </div>
                </div>
                <div className={s.cashback}>
                    <div>Здача:</div>
                    <div style={{fontSize: "24px", fontWeight: 600}}>{cashBack + LocalStorage.currency.symbol()!}</div>
                </div>
                <Button onClick={props.onConfirm} children={"Гроші отримано"} style={{width: "250px", height: "40px"}}/>

            </div>
        </CustomModal>
    )
}