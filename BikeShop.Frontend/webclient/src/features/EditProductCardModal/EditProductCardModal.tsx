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
                <div className={s.editProductCardModal_leftSide}>
                    <div className={s.leftSide_imageGallery}>1</div>
                    <div className={s.leftSide_descriptionEditor}>2</div>
                </div>
                <div className={s.editProductCardModal_rightSide}>
                    <div className={s.rightSide_tagEditor}>1</div>
                    <div className={s.rightSide_productOptions}>2</div>
                    <div className={s.rightSide_productDetails}>3</div>
                </div>
            </div>
        </Modal>
    )
}