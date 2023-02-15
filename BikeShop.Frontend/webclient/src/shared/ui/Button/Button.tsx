import React, {type ButtonHTMLAttributes, type FC, MouseEvent} from 'react'
import cls from './Button.module.css'

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
        createRipple(e)
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

const createRipple = (event: MouseEvent<HTMLButtonElement>): void => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${(event.clientY + document.body.scrollTop) - button.offsetTop - radius}px`;

    circle.classList.add(cls.ripple);
    const ripple = button.getElementsByClassName(cls.ripple);

    if (ripple.length > 3) {
        ripple[0].remove()
    }

    button.appendChild(circle);
}
