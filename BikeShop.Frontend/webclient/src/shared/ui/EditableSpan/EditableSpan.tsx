import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react'
import s from './EditableSpan.module.scss'

type EditableSpanPropsType = {
    title: string
    onChangeInput: (newInputValue: string) => void
    inputDivClassName?: any
    inputClassName?: any
    spanClassName?: any
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({
                                                                             title,
                                                                             onChangeInput,
                                                                             inputDivClassName,
                                                                             inputClassName,
                                                                             spanClassName
                                                                         }) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputTitle, setInputTitle] = useState<string>('')
    // const [error, setError] = useState<string | null>(null)

    const onClickEditSpanHandler = () => {
        setEditMode(true)
        setInputTitle(title)
    }

    const onClickNotEditSpanHandler = () => {
        if (inputTitle.length > 0 && inputTitle.length < 100) {
            onChangeInput(inputTitle)
            setEditMode(false)
        } else {
            // setError(`${MESSAGE_INPUT_VALUE_LENGTH}`)
            // setLabel(`${MESSAGE_INPUT_VALUE_LENGTH}`)
        }

    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(event.currentTarget.value)
    }

    const enterChangeTitle = (event: KeyboardEvent<HTMLInputElement>) => {
        return event.key === 'Enter' ? onClickNotEditSpanHandler() : ''
    }

    useEffect(() => {
        // if (inputTitle.length < 1 && inputTitle.length > 100) {
        // setError(`${MESSAGE_INPUT_VALUE_LENGTH}`)
        // setLabel(`${MESSAGE_INPUT_VALUE_LENGTH}`)
        // }
    }, [])

    return (
        editMode
            ?
            <div className={inputDivClassName ? inputDivClassName : ''}>
                <input
                    className={inputClassName ? inputClassName : s.editableSpan_input}
                    value={inputTitle}
                    onChange={onChangeInputHandler}
                    onBlur={onClickNotEditSpanHandler}
                    onKeyDown={enterChangeTitle}
                    autoFocus
                    // error={!!error}
                />
            </div>
            : <span onDoubleClick={onClickEditSpanHandler}
                    className={spanClassName ? spanClassName : s.editableSpan_text}>
                {title}
        </span>
    );
})