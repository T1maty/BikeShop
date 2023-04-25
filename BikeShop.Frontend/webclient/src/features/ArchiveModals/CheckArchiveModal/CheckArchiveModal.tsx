import React from 'react'
import s from './CheckArchiveModal.module.scss'
import useCheckArchiveModal from "./CheckArchiveModalStore"
import {CustomModal} from "../../../shared/ui"

export const CheckArchiveModal = () => {

    const open = useCheckArchiveModal(s => s.openCheckArchiveModal)
    const setOpen = useCheckArchiveModal(s => s.setOpenCheckArchiveModal)

    return (
        <CustomModal
            open={open}
            onClose={() => {setOpen(false)}}
        >
            <div className={s.checkArchiveModal_mainBox}>
                CheckArchiveModal
            </div>
        </CustomModal>
    )
}