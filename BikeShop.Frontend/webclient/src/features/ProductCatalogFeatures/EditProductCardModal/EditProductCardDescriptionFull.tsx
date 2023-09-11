import React, {useEffect, useState} from 'react'
import s from "./EditProductCardDescriptionFull.module.scss"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {Editor} from "react-draft-wysiwyg"
import useEditProductCardModal from "./EditProductCardModalStore";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import {ContentState, convertToRaw, EditorState} from "draft-js"


export const EditProductCardDescriptionFull = () => {

    const setDescription = useEditProductCardModal(s => s.setDescription)
    const currentProduct = useEditProductCardModal(s => s.currentProduct)
    const open = useEditProductCardModal(s => s.openEditProductCardModal)

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [l, sl] = useState(true)


    useEffect(() => {
        if (l) return
        const result = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        setDescription(result);
    }, [editorState])

    useEffect(() => {
        if (open && currentProduct.productCard !== undefined) {
            let contentBlock = htmlToDraft(currentProduct.productCard.description)
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)
            }
            sl(false)
        }
    }, [open])

    return (
        <div className={s.fullEditor}>
            <div className={s.descriptionEditor_title}>
                Детальное описание товара:
            </div>
            <div className={s.descriptionEditor_editorTextarea}>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
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
    )
}