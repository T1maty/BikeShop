import React from 'react'
import s from "./EditProductCardDescriptionFull.module.scss"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import {Editor} from "react-draft-wysiwyg"
import {convertToRaw, EditorState} from "draft-js"
import {Controller, UseFormReturn} from "react-hook-form"

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
    editorState: EditorState
    setEditorState: (value: EditorState) => void
}

export const EditProductCardDescriptionFull = (props: ControlledProps) => {

    const {editorState, setEditorState} = props

    const onChangeEditorHandler = (editorState: any, field: any) => {
        setEditorState(editorState)
        const result = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        field.onChange({...field.value, description: result});
    }

    return (
        <Controller
            name={props.name}
            control={props.control.control}
            render={({field}: any) =>

                <div className={s.fullEditor}>
                    <div className={s.descriptionEditor_title}>
                        Детальное описание товара:
                    </div>
                    <div className={s.descriptionEditor_editorTextarea}>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={(editorState) => {
                                onChangeEditorHandler(editorState, field)
                            }}
                            placeholder={'Введите текст...'}
                            // wrapperClassName={s.wrapperClassName}
                            wrapperClassName="wrapperClassName"
                            // toolbarClassName="toolbarClassName"
                            toolbarClassName={s.editor_toolbar}
                            // editorClassName="editorClassName"
                            editorClassName={s.editorClassName}
                        />
                    </div>
                </div>

            }
        />
    )
}