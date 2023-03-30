import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import {Editor} from "react-draft-wysiwyg"
import {EditorState} from "draft-js"
import {Controller, UseFormReturn} from "react-hook-form"
import {EditProductCardDescriptionShort} from "./EditProductCardDescriptionShort"
import {EditProductCardDescriptionFull} from "./EditProductCardDescriptionFull"

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
}

export const EditProductCardDescription = (props: ControlledProps) => {

    // const [editorState, setEditorState] = useState(EditorState.createEmpty())
    // console.log('editorState => ', draftToHtml(convertToRaw(editorState.getCurrentContent())))

    return (
        <div className={s.leftSide_descriptionEditor}>

            <EditProductCardDescriptionShort control={props.control} name={'descriptionShort'}/>
            {/*<Controller*/}
            {/*    name={props.name}*/}
            {/*    control={props.control.control}*/}
            {/*    render={({field}: any) =>*/}

            {/*        <div className={s.shortEditor}>*/}
            {/*            <div className={s.shortEditor_title}>Краткое описание товара:</div>*/}
            {/*            <div className={s.shortEditor_textarea}>*/}
            {/*                <div className={s.shortEditor_textarea_wrapper}>*/}
            {/*                    <textarea {...field} placeholder={'Введите текст...'}/>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*    }*/}
            {/*/>*/}

            <EditProductCardDescriptionFull control={props.control} name={'description'}/>
            {/*<Controller*/}
            {/*    name={props.name}*/}
            {/*    control={props.control.control}*/}
            {/*    render={({field}: any) =>*/}
            {/*        */}
            {/*        <div className={s.fullEditor}>*/}
            {/*            <div className={s.descriptionEditor_title}>Детальное описание товара:</div>*/}
            {/*            <div className={s.descriptionEditor_editorTextarea}>*/}
            {/*                <Editor*/}
            {/*                    editorState={editorState}*/}
            {/*                    placeholder={'Введите текст...'}*/}
            {/*                    wrapperClassName="wrapperClassName"*/}
            {/*                    // toolbarClassName="toolbarClassName"*/}
            {/*                    toolbarClassName={s.editor_toolbar}*/}
            {/*                    // editorClassName="editorClassName"*/}
            {/*                    editorClassName={s.editorClassName}*/}
            {/*                    onEditorStateChange={(editorState) => {*/}
            {/*                        setEditorState(editorState)*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        */}
            {/*    }*/}
            {/*/>*/}
        </div>
    )
}