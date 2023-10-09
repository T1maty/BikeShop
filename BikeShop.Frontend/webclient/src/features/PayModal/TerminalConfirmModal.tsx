import React, {useEffect, useState} from 'react'
import {CustomModal} from '../../shared/ui'
import s from './PayModal.module.scss'
import {Loader} from "../../shared/ui/Loader/Loader";
import {useApp} from "../../entities/globalStore/AppStore";
import {v4} from "uuid";
import {useSnackbar} from "notistack";
import pos from './../../shared/assets/workspace/card-machine-atm-svgrepo-com.svg'
import {HubConnectionState} from "@microsoft/signalr";
import {LocalStorage, useCurrency} from "../../entities";

interface p {
    open: boolean
    setOpen: (v: boolean) => void
    onConfirm: () => void
    onCancel: () => void
    amount: number
}

export const TerminalConfirmModal = (props: p) => {
    const {enqueueSnackbar} = useSnackbar()

    const AgentHubConnection = useApp(s => s.AgentHubConnection)
    const setAgentTerminalConfirm = useApp(s => s.setAgentTerminalConfirm)
    const setAgentTerminalCancel = useApp(s => s.setAgentTerminalCancel)
    const AgentHubStartConnection = useApp(s => s.AgentHubStartConnection)
    const r = useCurrency(s => s.roundUp)
    const [uuid, seTuuid] = useState('')

    useEffect(() => {
        let u = v4()
        seTuuid(u)

        if (props.open) {
            setAgentTerminalConfirm((data) => {
                if (data.Id === uuid) {
                    props.onConfirm()
                    enqueueSnackbar('Оплата получена', {variant: 'success', autoHideDuration: 3000})
                    props.setOpen(false)
                }
            })
            setAgentTerminalCancel((data) => {
                if (data.Id === uuid) {
                    props.onCancel()
                    enqueueSnackbar('Оплата не получена', {variant: 'error', autoHideDuration: 3000})
                    props.setOpen(false)
                }
            })
            if (AgentHubConnection?.state === HubConnectionState.Connected) {
                console.log("sanding")
                AgentHubConnection?.send("RequestPayment", {
                    Id: u,
                    AgentId: 1,
                    Amount: parseFloat(r(props.amount * LocalStorage.currency.fbts()))
                })
            } else if (AgentHubConnection?.state === HubConnectionState.Disconnected) {
                AgentHubStartConnection(() => {
                    console.log("sanding2")
                    AgentHubConnection?.send("RequestPayment", {
                        Id: u,
                        AgentId: 1,
                        Amount: r(props.amount * LocalStorage.currency.fbts())
                    })
                }, () => {
                });
            }
        }
    }, [props.open])


    return (
        <CustomModal
            open={props.open}
            onClose={() => {
            }}
        >
            <div className={s.confirm_modal}>
                <div className={s.confirm_modal_label}>Очікуємо оплати через термінал</div>
                {AgentHubConnection?.state === HubConnectionState.Connected ?
                    <Loader variant={"ellipsis"}/>
                    :
                    <div className={s.warning}>Немає підключення до СервераТерміналу (обновіть сторінку)</div>
                }
                <img src={pos} className={s.pos}/>
                <div className={s.hc} onClick={() => {
                    props.onConfirm()
                    enqueueSnackbar('Підтверджено вручну', {variant: 'warning', autoHideDuration: 3000})
                    props.setOpen(false)
                }}>Підтвердити вручну (не чіпай)
                </div>
            </div>
        </CustomModal>
    )
}