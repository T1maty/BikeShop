import React from 'react'
import s from './EncashmentModal.module.scss'
import {Button, CustomModal} from '../../../shared/ui'
import useEncashmentModal from "./EncashmentModalStore"

export const EncashmentModal = () => {

    const open = useEncashmentModal(s => s.openEncashmentModal)
    const setOpen = useEncashmentModal(s => s.setOpenEncashmentModal)

    return (
        <CustomModal
            open={open}
            onClose={() => {setOpen(false)}}
        >
            <div className={s.encashmentModal_mainBox}>
                1
            </div>
        </CustomModal>
    )
}