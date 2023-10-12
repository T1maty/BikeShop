import React, {useState} from 'react'
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

    const onClickEditSpanHandler = () => {
        setEditMode(true)
        setInputTitle(title)
    }

    const onClickNotEditSpanHandler = () => {
        if (inputTitle.length > 0 && inputTitle.length < 100) {
            onChangeInput(inputTitle)
            setEditMode(false)
        }
    }

    return (
        editMode
            ?
            <div className={inputDivClassName ? inputDivClassName : ''}>
                <textarea
                    className={inputClassName ? inputClassName : s.editableSpan_input}
                    value={inputTitle}
                    onChange={(event) => {
                        setInputTitle(event.currentTarget.value)
                    }}
                    onBlur={onClickNotEditSpanHandler}
                    onKeyDown={(event) => {
                        return event.key === 'Enter' ? onClickNotEditSpanHandler() : ''
                    }}
                    autoFocus
                />
            </div>
            : <span onDoubleClick={onClickEditSpanHandler}
                    className={spanClassName ? spanClassName : s.editableSpan_text}>
                {title}
        </span>
    );
})