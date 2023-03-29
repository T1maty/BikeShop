import React from 'react'
import s from './AddProductCardTagModal.module.scss'
import {Modal} from "@mui/material"
import useAddProductCardTagModal from "./AddProductCardTagModalStore"

interface AddProductCardTagModalProps {
    extraCallback?: () => void
}

export const AddProductCardTagModal: React.FC<AddProductCardTagModalProps> = ({extraCallback}) => {

    const open = useAddProductCardTagModal(s => s.openAddProductCardTagModal)
    const setOpen = useAddProductCardTagModal(s => s.setOpenAddProductCardTagModal)

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.addProductCardTagModal_mainBox}>
                <div className={s.addProductCardTagModal_content}>
                    Модалка по добавлению тегов
                </div>
            </div>
        </Modal>
    );
};