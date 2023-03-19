import React from 'react'
import s from "./EditProductCardModal.module.scss"
import {Modal} from "@mui/material"
import useEditProductCardModal from "./EditProductCardModalStore"

export const EditProductCardModal = () => {

    const open = useEditProductCardModal(s => s.openEditProductCardModal)
    const setOpen = useEditProductCardModal(s => s.setOpenEditProductCardModal)

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.editProductCardModal_mainBlock}>

            </div>
        </Modal>
    )
}