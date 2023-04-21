import React from 'react'
import s from './GetPutMoneyModal.module.scss'
import {Button, CustomModal} from '../../../shared/ui'
import useGetPutMoneyModal from "./GetPutMoneyModalStore"

export const GetPutMoneyModal = () => {

    const open = useGetPutMoneyModal(s => s.openGetPutMoneyModal)
    const setOpen = useGetPutMoneyModal(s => s.setOpenGetPutMoneyModal)

    return (
        <CustomModal
            open={open}
            onClose={() => {setOpen(false)}}
        >
            <div className={s.getPutMoneyModal_mainBox}>
                1
            </div>
        </CustomModal>
    )
}