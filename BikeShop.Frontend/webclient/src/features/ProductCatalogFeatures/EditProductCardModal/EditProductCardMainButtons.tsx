import React from 'react'
import s from './EditProductCardMainButtons.module.scss'
import {Button} from '../../../shared/ui'
import useEditProductCardModal from "./EditProductCardModalStore";
import {ProductFullData} from "../../../entities";

interface MainButtonsProps {
    setOpen: (value: boolean) => void
    onUpd: (p: ProductFullData) => void
}

export const EditProductCardMainButtons: React.FC<MainButtonsProps> = ({setOpen, onUpd}) => {
    const updateProductCard = useEditProductCardModal(s => s.updateProductCard)

    return (
        <div className={s.mainButtons}>
            <Button onClick={() => {
                setOpen(false)
            }}>
                Закрыть
            </Button>
            <Button onClick={() => {
                updateProductCard(onUpd)
            }}>
                Сохранить
            </Button>
        </div>
    )
}