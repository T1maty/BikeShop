import React from 'react'
import s from './ConfirmModal.module.scss'
import {Modal} from "@mui/material"
import {Button} from '../../shared/ui'
import useConfirmModal from './ConfirmModalStore'

interface ConfirmModalProps {
    extraCallback: () => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({extraCallback}) => {
    const open = useConfirmModal(s => s.openConfirmModal)
    const setOpen = useConfirmModal(s => s.setOpenConfirmModal)

    const confirmButtonHandler = () => {
        extraCallback()
        setOpen(false)
    }

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.confirmModal_mainBox}>
                <div className={s.confirmModal_title}>
                    Вы действительно хотите сделать изменения?
                </div>
                <div className={s.confirmModal_buttons}>
                    <Button  onClick={confirmButtonHandler}>
                        Подтвердить
                    </Button>
                    <Button  onClick={() => {setOpen(false)}}>
                        Отмена
                    </Button>
                </div>
            </div>
        </Modal>
    );
};