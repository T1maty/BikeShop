import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes,
    KeyboardEvent, ReactNode} from 'react'
import s from './CustomInput.module.scss'
import {Button} from "../Button/Button";
import CancelIcon from '../../assets/workspace/cancel-icon-white.svg'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

// здесь мы говорим, что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтобы не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: ReactNode
    helperText?: string
    divClassName?: string
    spanClassName?: string
    color?: 'black'
    searchInput?: 'white' | 'black'
}

// @ts-ignore
export const CustomInput: React.FC<SuperInputTextPropsType> = React.forwardRef((
    {
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        helperText, // error для Controlled InputUI (React Hook Forms)
        className,
        divClassName,
        spanClassName,
        color,
        searchInput,
        id,

        ...restProps // все остальные пропсы попадут в объект restProps
    }, forwardRef
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

    // чтобы изменить инпут на чёрный цвет, необходимо передать className={customInputBlack}
    // чтобы изменить инпут на поисковый, необходимо передать props searchInput={'white' | 'black'}
    // чтобы изменить стандартный див инпута, необходимо передать divClassName={your_className}
    const finalInputDivWrapperClassName = `${divClassName ? divClassName : s.inputWrapper}`

    const finalInputClassName = `${error ? s.errorInput : ''} 
        ${className ? className : s.customInput}
        ${color === 'black' ? s.customInputBlack : ''}
        ${searchInput === 'white' ? s.searchInput : ''}
        ${searchInput === 'black' ? s.searchInputBlack : ''}`

    const finalSpanClassName = `${error ? s.error : ''} ${spanClassName ? spanClassName : ''}`

    return (
        <div className={finalInputDivWrapperClassName}>
            <input
                id={id}
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            {/*<span className={s.cancelIcon}></span>*/}

            {
                error ?
                    <div className={s.errorWrapper}>
                        {error && <span className={finalSpanClassName}>{error}</span>}
                    </div>
                    : ''
            }

            {
                helperText ?
                    <div className={s.errorHelperText}>
                        {helperText && helperText}
                    </div>
                    : ''
            }

            {/*вариант строки с id*/}
            {/*<span*/}
            {/*    id={id ? id + '-span' : undefined}*/}
            {/*    className={finalSpanClassName}*/}
            {/*>*/}
            {/*    {error}*/}
            {/*</span>*/}
        </div>
    )
})