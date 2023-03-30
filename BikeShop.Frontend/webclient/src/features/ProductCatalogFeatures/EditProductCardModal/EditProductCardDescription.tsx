import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import {Editor} from "react-draft-wysiwyg"
import {EditorState} from "draft-js"

export const EditProductCardDescription = () => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    return (
        <div className={s.leftSide_descriptionEditor}>
            <div className={s.briefEditor}>
                <div className={s.briefEditor_title}>Краткое описание товара:</div>
                <div className={s.briefEditor_textarea}>
                    <div className={s.briefEditor_textarea_wrapper}>
                        <textarea/>
                    </div>
                </div>
            </div>

            <div className={s.fullEditor}>
                <div className={s.descriptionEditor_title}>Детальное описание товара:</div>
                <div className={s.descriptionEditor_editorTextarea}>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="wrapperClassName"
                        // toolbarClassName="toolbarClassName"
                        toolbarClassName={s.editor_toolbar}
                        // editorClassName="editorClassName"
                        editorClassName={s.editorClassName}
                        onEditorStateChange={(editorState) => {setEditorState(editorState)}}
                    />
                </div>
            </div>
        </div>
    )
}