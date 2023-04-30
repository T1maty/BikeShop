import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes,
    KeyboardEvent, ReactNode} from 'react'
import s from './CustomTextarea.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>

type CustomTextareaPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: ReactNode
    helperText?: string
    divClassName?: string
    spanClassName?: string
}

export const CustomTextarea: React.FC<CustomTextareaPropsType> = ({
    // onChange,
    onChangeText,
    onKeyPress,
    onEnter,
    error,
    helperText, // error для Controlled InputUI (React Hook Forms)
    className,
    divClassName,
    ...restProps // все остальные пропсы попадут в объект restProps
}) => {
    const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // onChange && onChange(e);
        onChangeText && onChangeText(e.currentTarget.value);
    };
    const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter();
    };

    const finalTextareaDivWrapperClassName = `${divClassName ? divClassName : s.textarea_wrapper}`;

    return (
        <div className={finalTextareaDivWrapperClassName}>
            <textarea onChange={onChangeCallback} onKeyPress={onKeyPressCallback} {...restProps} />
        </div>
    )
}
