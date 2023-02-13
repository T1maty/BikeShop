import React, {type ButtonHTMLAttributes, Children, cloneElement, type FC, MouseEvent} from 'react'
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
 * @return customButton jsx
 */

const Button: FC<ButtonProps> = (
    {
        className = '',
        children,
        variant = '',
        colorText = '',
        onClick,
        ...otherProps
    }
) => {
    return (
        <ProviderButtonRipple>
            <button
                type='button'
                style={{color: colorText}}
                onClick={onClick}
                className={cls.btn}
                {...otherProps}
            >
                {children}
            </button>
        </ProviderButtonRipple>
    )
}


type ProviderButtonProps = {
    children: React.ReactElement
}

const ProviderButtonRipple = (props: ProviderButtonProps) => {

    const {children} = props

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

    return cloneElement(Children.only(children), {
        onClick: (e: MouseEvent<HTMLButtonElement>) => {
            Children.only(children).props.onClick()
            createRipple(e)
        }
    })

};

export default Button
// -------------------ProviderButton------------------------
// <>
//     {React.Children.map(children, child => {
//         console.log(child.props)
//         return React.cloneElement(child, {
//             onClick: (e: MouseEvent<HTMLButtonElement>) => {
//                 child.props.onClick()
//                 createRipple(e)
//             }
//         })
//     })}
// </>
// 2 вариант
