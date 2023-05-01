import React from 'react'
import s from './ConfirmModal.module.scss'
import {Button, CustomModal} from '../../shared/ui'

interface ConfirmModalProps {
    title: string
    extraCallback: () => void
    open: boolean
    setOpen: (v: boolean,) => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({title, extraCallback, setOpen, open}) => {

    const confirmButtonHandler = () => {
        extraCallback()
        setOpen(false)
    }

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <div className={s.confirmModal_mainBox}>
                <div className={s.confirmModal_title}>
                    {title}
                </div>
                <div className={s.confirmModal_buttons}>
                    <Button onClick={confirmButtonHandler}>
                        Подтвердить
                    </Button>
                    <div className={s.confirmModal_cancelButton}>
                        <Button onClick={() => {
                            setOpen(false)
                        }}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}