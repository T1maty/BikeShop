import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './CustomCheckbox.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type CheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

export const CustomCheckbox: React.FC<CheckboxPropsType> = (
    {
        type, // достаём и игнорируем, чтобы нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно, так как он затипизирован в React.FC

        ...restProps // все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    // const finalInputClassName = `${s.checkbox} ${className ? className : ''}`

    return (
        <label className={s.container}>
            {children}
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                // className={finalInputClassName}

                {...restProps} // отдаём инпуту остальные пропсы, если они есть (checked, например, там внутри)
            />
            {/*{children && <span className={s.checkmark}>{children}</span>}*/}
            <span className={s.checkmark}></span>
        </label> // благодаря label нажатие на спан передастся в инпут
    )
}