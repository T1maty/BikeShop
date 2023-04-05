import React, {ButtonHTMLAttributes, FC} from 'react'
import icon from '../../assets/workspace/notification-light.svg'
import {IconButton} from "./IconProvider"

export const NotificationIcon: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <IconButton {...props}>
            <img alt='icon' src={icon} width={25} height={35}/>
        </IconButton>
    )
}


