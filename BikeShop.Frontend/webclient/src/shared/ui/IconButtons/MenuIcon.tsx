import React, {ButtonHTMLAttributes, FC} from 'react'
import menuBurger from '../../assets/workspace/burger-light.svg'
import {IconButton} from "./IconProvider"

export const MenuIcon: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <IconButton {...props}>
            <img alt='icon' src={menuBurger} width={25} height={35}/>
        </IconButton>
    )
}


