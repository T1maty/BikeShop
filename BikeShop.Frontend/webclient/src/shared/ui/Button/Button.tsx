import React, {type ButtonHTMLAttributes, type FC, MouseEvent} from 'react'
import cls from './Button.module.scss'
import {createRipple} from "./lib/ripple";

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;


type defaultColor = 'white' | 'black'
type Color = RGB | RGBA | HEX | defaultColor

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    variant?: string
    colorText?: Color
}

/**
 * @param props is default PropsButton
 * @param colorText white or black, or custom RGB, RGBA, HEX
 * @param className NOT USE, NOT WORK
 * @return customButton jsx
 */

export const Button: FC<ButtonProps> = (
    {
        children,
        style,
        variant,
        className ,
        colorText = '',
        onClick,
        ...otherProps
    }
) => {

    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        onClick && onClick(e)
        createRipple(e, cls)
    }

    return (
        <button
            type='button'
            style={{color: colorText, ...style}}
            onClick={onClickHandler}
            className={cls.btn + ' ' + className}
            {...otherProps}
        >
            {children}
        </button>
    )
}


