import React, {useState} from 'react'
import s from './EditProductCardModal.module.scss'
import {Modal} from '@mui/material'
import useEditProductCardModal from './EditProductCardModalStore'
import {Button, ControlledInput, ControlledSelect} from '../../shared/ui'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Errors} from '../../entities/errors/workspaceErrors'
import {Editor} from 'react-draft-wysiwyg'
import {EditorState, convertToRaw} from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import draftToHtml from 'draftjs-to-html'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

export const EditProductCardModal = () => {

    const open = useEditProductCardModal(s => s.openEditProductCardModal)
    const setOpen = useEditProductCardModal(s => s.setOpenEditProductCardModal)

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    // console.log('editorState => ', draftToHtml(convertToRaw(editorState.getCurrentContent())))

    const [options, setOptions] = useState([
        {
            id: '1',
            name: 'Размер шлема',
            optionsArray: [{id: '4', name: 'S'}, {id: '5', name: 'M'}, {id: '6', name: 'L'}]
        },
        {
            id: '2',
            name: 'Цвет шлема',
            optionsArray: [{id: '7', name: 'Red'}, {id: '8', name: 'Blue'}, {id: '9', name: 'White'}]
        },
    ])

    const [details, setDetails] = useState([
        {id: '1', name: 'Характеристика 1', description: 'Описание 1'},
        {id: '2', name: 'Характеристика 2', description: 'Описание 2'},
        {id: '3', name: 'Характеристика 3', description: 'Описание 3'},
    ])

    const [images, setImages] = useState([
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ])

    const formControl = useForm<any>({
        defaultValues: {
            option: '',
            detail: '',
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        const newDetail = {id: '555', name: 'New Characteristic', description: data.detail}
        setDetails([newDetail, ...details])

        // добавление характеристики
        // if (isCreating) {
        //     data.shopId = 1
        //
        //     addNewService(data).then((res: any) => {
        //         setIsCreating(false)
        //         enqueueSnackbar('Ремонт добавлен', {variant: 'success', autoHideDuration: 3000})
        //
        //     }).catch((error: any) => {
        //         let message = error(error.response.data.errorDescription).toString()
        //         formControl.setError('name', {type: 'serverError', message: message})
        //         enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
        //         console.error(error.response.data)
        //     })
        // }
    }

    const deleteOptionsListHandler = (optionsItem: any) => {
        setOptions(options.filter(el => el.id !== optionsItem.id))
    }
    const deleteOptionHandler = (listId: string, optionId: string) => {
        setOptions(options.map(el => el.id === listId ? {
            ...el, optionsArray: el.optionsArray.filter(opt => opt.id !== optionId)} : el))
    }

    const deleteDetailsListHandler = (detailsItem: any) => {
        setDetails(details.filter(el => el.id !== detailsItem.id))
    }

    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.editProductCardModal_mainBlock}>
                <div className={s.editProductCardModal_leftSide}>
                    {/*<div className={s.leftSide_imageGallery}>*/}
                    {/*    Фотографии*/}
                    {/*</div>*/}
                    <div className={s.leftSide_imageGallery}>
                        <ImageGallery items={images}
                                      showPlayButton={false}
                                      showFullscreenButton={false}
                                      showIndex={true}
                                      // showNav={false}
                                      thumbnailPosition={'left'}
                        />
                    </div>
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
                </div>

                <div className={s.editProductCardModal_rightSide}>
                    <div className={s.rightSide_tagEditor}>
                        <div className={s.tagEditor_title}>Редактор тегов товара</div>
                        <div className={s.tagEditor_tags}>Здесь будут теги</div>

                    </div>

                    <div className={s.rightSide_productOptions}>
                        <div className={s.productOptions_optionsList}>
                            {
                                options.map(option => {
                                    return (
                                        <div className={s.optionsList_item}
                                             key={option.id}
                                        >
                                            <fieldset className={s.options_box}>
                                                <legend>{option.name}</legend>
                                                <div className={s.options_rowItems}>
                                                    <div className={s.rowItems_item}>
                                                        <div className={s.item_deleteFullItem}
                                                             onClick={() => {
                                                                 deleteOptionsListHandler(option)
                                                             }}
                                                        >
                                                            Удалить
                                                        </div>
                                                        {
                                                            option.optionsArray.map(el => {
                                                                return (
                                                                    <div className={s.item_content}
                                                                         key={el.id}
                                                                    >
                                                                        <div className={s.item_title}>{el.name}</div>
                                                                        <div className={s.item_delete}
                                                                             onClick={() => {
                                                                                 deleteOptionHandler(option.id, el.id)
                                                                             }}
                                                                        >
                                                                            X
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className={s.rowItems_chooseItem}>
                                                        <Button buttonDivWrapper={s.options_button}>+</Button>
                                                        <ControlledSelect control={formControl}
                                                                          name={'optionVersion'}
                                                                          label={'Разновидность опции'}
                                                                          className={s.options_search}
                                                                          data={option.optionsArray.map((el: any) => {
                                                                              return {
                                                                                  id: el.id,
                                                                                  value: el.name ? el.name : 'Нет имени'
                                                                              }
                                                                          })}
                                                        />
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={s.productOptions_selectRow}>
                            <Button buttonDivWrapper={s.options_button}>+</Button>
                            <ControlledSelect control={formControl}
                                              name={'option'}
                                              label={'Опция'}
                                              className={s.options_search}
                                              data={options.map((el) => {
                                                  return {id: el.id, value: el.name ? el.name : 'Нет опции'}
                                              })}
                            />
                        </div>
                    </div>


                    <div className={s.rightSide_productDetails}>
                        <div className={s.productOptions_optionsList}>
                            {
                                details.map(detail => {
                                    return (
                                        <div className={s.optionsList_item}
                                             key={detail.id}
                                        >
                                            <fieldset className={s.options_box}>
                                                <legend>{detail.name}</legend>
                                                <div className={s.options_rowItems}>
                                                    <div className={s.rowItems_item}>
                                                        <div className={s.item_deleteFullItem}
                                                             onClick={() => deleteDetailsListHandler(detail)}
                                                        >
                                                            Удалить
                                                        </div>
                                                        <div className={s.item_content}>
                                                            {detail.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <form onSubmit={formControl.handleSubmit(onSubmit)}>
                            <div className={s.productOptions_selectRow}>
                                <Button type={'submit'} buttonDivWrapper={s.options_button}>+</Button>
                                <ControlledInput name={'detail'}
                                                 label={'Характеристика'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                                 divClassName={s.options_search}
                                />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </Modal>
    )
}