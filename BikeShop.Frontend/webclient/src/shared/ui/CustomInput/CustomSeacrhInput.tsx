import React, {
    ChangeEvent, DetailedHTMLProps, InputHTMLAttributes,
    KeyboardEvent, ReactNode
} from 'react'
import s from './CustomSearchInput.module.scss'
import CancelIcon from '../../assets/workspace/cancel-icon-white.svg'
import CancelIconBlack from '../../assets/workspace/cancel-icon-black.svg'
import GlassIcon from '../../assets/workspace/magnifying-glass-white.svg'
import GlassIconBlack from '../../assets/workspace/magnifying-glass-black.svg'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

// здесь мы говорим, что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтобы не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    clearInputValue: () => void
    // error?: ReactNode
    helperText?: string
    divClassName?: string
    spanClassName?: string
    color?: 'black'
}

export const CustomSearchInput: React.FC<SuperInputTextPropsType> = (
    {
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        clearInputValue,
        // error,
        helperText, // error для Controlled InputUI (React Hook Forms)
        className,
        divClassName,
        spanClassName,
        color,
        id,
        ...restProps // все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    const finalInputWrapperClassName = `${s.inputWrapper} 
        ${color === 'black' ? s.inputWrapperBlack : ''}`

    const finalInputClassName = //${error ? s.errorInput : ''}
        `${className ? className : s.customSearchInput}
        ${color === 'black' ? s.customSearchInputBlack : ''}`

    // const finalSpanClassName = `${error ? s.error : ''} ${spanClassName ? spanClassName : ''}`

    return (
        <div className={finalInputWrapperClassName}>
            <div className={s.glassIcon}>
                <img src={color === 'black' ? GlassIconBlack : GlassIcon} alt="glass-icon"/>
            </div>
            <div className={s.inputMainBox}>
                <input
                    id={id}
                    type={'text'}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalInputClassName}
                    {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                />
            </div>

            <div>
                <button className={s.clearButton}
                        onClick={clearInputValue}
                >
                    <img src={color === 'black' ? CancelIconBlack : CancelIcon} alt="cancel-icon"/>
                </button>
            </div>

            {/*<div className={s.errorWrapper}>*/}
            {/*    {error && <span className={finalSpanClassName}>{error}</span>}*/}
            {/*</div>*/}
            {/*<div className={s.errorHelperText}>*/}
            {/*    {helperText && helperText}*/}
            {/*</div>*/}

            {/*вариант строки с id*/}
            {/*<span*/}
            {/*    id={id ? id + '-span' : undefined}*/}
            {/*    className={finalSpanClassName}*/}
            {/*>*/}
            {/*    {error}*/}
            {/*</span>*/}
        </div>
    )
}