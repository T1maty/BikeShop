import React from 'react'
import s from './DeleteButton.module.scss'
import RemoveIcon from '../../assets/workspace/remove-icon.svg'

interface DeleteButtonProps {
    size: number
    className?: any
    absolute?: boolean
    onClick: () => void
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({size, className, absolute = false, onClick}) => {

    return (
        <div className={className ? className : s.deleteBox}>
            <img src={RemoveIcon}
                 alt="remove-icon"
                 className={absolute ? s.deleteImgAbsolute : s.deleteImg}
                 width={size}
                 height={size}
                 onClick={onClick}
            />
        </div>
    )
}