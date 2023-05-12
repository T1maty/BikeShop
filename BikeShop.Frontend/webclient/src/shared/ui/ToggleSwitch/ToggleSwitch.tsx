import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './ToggleSwitch.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type CheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

export const ToggleSwitch: React.FC<CheckboxPropsType> = (
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

    return (
        <>
            <label className={s.switch}>
                <input type={'checkbox'}
                       onChange={onChangeCallback}
                />
                    <span className={`${s.slider} ${s.round}`}></span>

                    {/*Квадратный переключатель*/}
                    {/*<span className={s.slider}></span>*/}
            </label>
        </>
    )
}