import React from 'react'
import s from './EditProductCardMainButtons.module.scss'
import {Button} from '../../../shared/ui'
import useEditProductCardModal from "./EditProductCardModalStore";

interface MainButtonsProps {
    setOpen: (value: boolean) => void
}

export const EditProductCardMainButtons: React.FC<MainButtonsProps> = ({setOpen}) => {
    const updateProductCard = useEditProductCardModal(s => s.updateProductCard)

    return (
        <div className={s.mainButtons}>
            <Button onClick={() => {
                setOpen(false)
            }}>
                Закрыть
            </Button>
            <Button onClick={updateProductCard}>
                Сохранить
            </Button>
        </div>
    )
}