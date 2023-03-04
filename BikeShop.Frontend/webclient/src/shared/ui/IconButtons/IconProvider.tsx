import React, {ButtonHTMLAttributes, FC, MouseEvent} from 'react';
import cls from './IconProvider.module.scss'
import {createRipple} from "./lib/ripple";

export const IconButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
    {
        onClick,
        className,
        children,
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
            onClick={onClickHandler}
            className={className + ' ' + cls.btn}
            {...otherProps}
        >
            {children}
        </button>
    )
};
