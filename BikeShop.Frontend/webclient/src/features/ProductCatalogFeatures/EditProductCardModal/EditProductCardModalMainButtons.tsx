import React from 'react'
import s from './EditProductCardMainButtons.module.scss'
import {Button} from '../../../shared/ui'

interface MainButtonsProps {
    setOpen: (value: boolean) => void
}

export const EditProductCardModalMainButtons: React.FC<MainButtonsProps> = ({setOpen}) => {

    return (
        <div className={s.mainButtons}>
            <Button onClick={() => {setOpen(false)}}>
                Отмена
            </Button>
            <Button type={'submit'}>
                Сохранить
            </Button>
        </div>
    )
}