import React from 'react'
import s from './DeleteButton.module.scss'
import RemoveIcon from '../../assets/workspace/remove-icon.svg'

interface DeleteButtonProps {
    size: number
    onClick: () => void
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({size, onClick}) => {

    return (
        <div className={s.deleteBox}>
            <img src={RemoveIcon} alt="remove-icon" width={size} height={size} onClick={onClick}/>
        </div>
    )
}