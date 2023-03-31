import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import {Editor} from "react-draft-wysiwyg"
import {convertToRaw, EditorState} from "draft-js"
import {Controller, UseFormReturn} from "react-hook-form"

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
}

export const EditProductCardDescriptionFull = (props: ControlledProps) => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onChangeEditorHandler = (editorState: any, field: any) => {
        setEditorState(editorState)
        const result = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        field.onChange({...field.value, description: result});
        console.log('конвертация:', result)
        
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
                            // editorState={field.value.description}
                            // onEditorStateChange={(value) => {
                            //     field.onChange({...field.value,
                            //         description: draftToHtml(convertToRaw(value.getCurrentContent()))
                            //     })
                            // }}
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