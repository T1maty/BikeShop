import React, {type ButtonHTMLAttributes, type FC, MouseEvent} from 'react'
import cls from './Button.module.scss'
import {Animate, createRipple} from "./lib/ripple";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    // variant?: string
    onAnimate?: boolean
    viewAnimate?: Animate
    buttonDivWrapper?: any
}

/**
 * @param props is default PropsButton
 * @param className NOT USE, NOT WORK
 * @return customButton jsx
 */

export const Button: FC<ButtonProps> = (
    {
        children,
        // variant,
        className,
        onClick,
        viewAnimate,
        onAnimate = true,
        buttonDivWrapper,
        ...otherProps
    }
) => {

    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        onClick && onClick(e)
        onAnimate && createRipple(e, cls, viewAnimate)
    }

    return (
        <div className={buttonDivWrapper}>
            <button
                type='button'
                onClick={onClickHandler}
                className={clsx(cls.btn, className)}
                {...otherProps}
            >
                {children}
            </button>
        </div>
    )
}