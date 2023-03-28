import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import {Editor} from "react-draft-wysiwyg"
import {EditorState} from "draft-js"

export const EditProductCardDescription = () => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    return (
        <div className={s.leftSide_descriptionEditor}>
            <div className={s.descriptionEditor_title}>Описание товара:</div>
            {/*<div className={s.descriptionEditor_textarea}>*/}
            {/*    <textarea/>*/}
            {/*</div>*/}
            <div className={s.descriptionEditor_editorTextarea}>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName={s.editorClassName}
                    // editorClassName="editorClassName"
                    onEditorStateChange={(editorState) => {setEditorState(editorState)}}
                />
            </div>
        </div>
    )
}