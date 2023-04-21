import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './CustomRadioButton.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

export const CustomRadioButton: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    // map options with key
    const mappedOptions: any[] = options ? options.map((option, i) => (
        <label key={name + '-' + i} className={s.container}>
            <input
                type={'radio'}
                name={name}
                checked={option === value}
                value={option}
                onChange={onChangeCallback}
                {...restProps}
            />
            <span className={s.checkmark}></span>
            {option}
        </label>
    )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
}