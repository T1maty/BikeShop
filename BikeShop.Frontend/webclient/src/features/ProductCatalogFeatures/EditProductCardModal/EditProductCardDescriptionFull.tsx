import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import draftToHtml from 'draftjs-to-html'
import {Editor} from "react-draft-wysiwyg"
import {EditorState} from "draft-js"
import {Controller, UseFormReturn} from "react-hook-form"

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
}

export const EditProductCardDescriptionFull = (props: ControlledProps) => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    // console.log('editorState => ', draftToHtml(convertToRaw(editorState.getCurrentContent())))

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
                        <Editor {...field}
                                editorState={editorState}
                                placeholder={'Введите текст...'}
                                wrapperClassName="wrapperClassName"
                                // toolbarClassName="toolbarClassName"
                                toolbarClassName={s.editor_toolbar}
                                // editorClassName="editorClassName"
                                editorClassName={s.editorClassName}
                                onEditorStateChange={(editorState) => {
                                    setEditorState(editorState)
                                }}
                        />
                    </div>
                </div>
            }
        />
    )
}