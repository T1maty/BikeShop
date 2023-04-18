import React from 'react'
import s from './ConfirmModal.module.scss'
import {Button, CustomModal} from '../../shared/ui'
import useConfirmModal from './ConfirmModalStore'

interface ConfirmModalProps {
    title: string
    extraCallback: (data?: any) => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({title, extraCallback}) => {

    const open = useConfirmModal(s => s.openConfirmModal)
    const setOpen = useConfirmModal(s => s.setOpenConfirmModal)

    const confirmButtonHandler = () => {
        extraCallback()
        setOpen(false)
    }

    return (
        <CustomModal
            open={open}
            onClose={() => {setOpen(false)}}
        >
            <div className={s.confirmModal_mainBox}>
                <div className={s.confirmModal_title}>
                    {/*Вы действительно хотите сделать изменения?*/}
                    {title}
                </div>
                <div className={s.confirmModal_buttons}>
                    <Button  onClick={confirmButtonHandler}>
                        Подтвердить
                    </Button>
                    <div className={s.confirmModal_cancelButton}>
                        <Button  onClick={() => {setOpen(false)}}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>
        </CustomModal>
    );
};