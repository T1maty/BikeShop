import React, {useEffect, useState} from 'react'
import {CustomModal} from '../../shared/ui'
import s from './PayModal.module.scss'
import {Loader} from "../../shared/ui/Loader/Loader";
import {useApp} from "../../entities/globalStore/AppStore";
import {v4} from "uuid";
import {useSnackbar} from "notistack";

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
    const [uuid, seTuuid] = useState('')

    useEffect(() => {
        let u = v4()
        seTuuid(u)

        if (props.open) {
            setAgentTerminalConfirm((data) => {
                console.log("Conf")
                enqueueSnackbar('Оплата получена', {variant: 'success', autoHideDuration: 3000})
                props.setOpen(false)
            })
            setAgentTerminalCancel((data) => {
                enqueueSnackbar('Оплата не получена', {variant: 'error', autoHideDuration: 3000})
                props.setOpen(false)
            })
            
            AgentHubConnection?.send("RequestPayment", {Id: u, AgentId: 1, Amount: props.amount})
        }
    }, [props.open])


    return (
        <CustomModal
            open={props.open}
            onClose={() => {
            }}
        >
            <div className={s.confirm_modal}>
                <Loader variant={"ellipsis"}/>
            </div>
        </CustomModal>
    )
}