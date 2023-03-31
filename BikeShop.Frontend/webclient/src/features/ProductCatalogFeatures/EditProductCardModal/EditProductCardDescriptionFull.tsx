import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import {Editor} from "react-draft-wysiwyg"
import {EditorState, convertToRaw} from "draft-js"
import {Controller, UseFormReturn} from "react-hook-form"
import useEditProductCardModal from "./EditProductCardModalStore";

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
}

export const EditProductCardDescriptionFull = (props: ControlledProps) => {

    const productCardDescription = useEditProductCardModal(s => s.productCardDescription)
    const setProductCardDescription = useEditProductCardModal(s => s.setProductCardDescription)

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))

    const onChangeEditorHandler = (editorState: any) => {
        setEditorState(editorState)
        const result = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        console.log('конвертация:', result)
        setProductCardDescription(result)
        console.log('хтмл в стор:', productCardDescription)
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
                        <Editor {...field}
                                // editorState={field.value.description}
                                // onEditorStateChange={(value) => {
                                //     field.onChange({...field.value,
                                //         description: draftToHtml(convertToRaw(value.getCurrentContent()))
                                //     })
                                // }}
                                editorState={editorState}
                                onEditorStateChange={(editorState) => {
                                    onChangeEditorHandler(editorState)
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