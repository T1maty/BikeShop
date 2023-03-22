import React, {useState, useEffect, ChangeEvent} from 'react'
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
import RemoveIcon from '../../shared/assets/workspace/remove-icon.svg'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Select from 'react-select/base'

// interface AutocompleteOption {
//     name: string
// }

interface EditProductCardModalProps {
    productCardData?: any
}

export const EditProductCardModal: React.FC<EditProductCardModalProps> = ({productCardData}) => {

    const open = useEditProductCardModal(s => s.openEditProductCardModal)
    const setOpen = useEditProductCardModal(s => s.setOpenEditProductCardModal)

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    // console.log('editorState => ', draftToHtml(convertToRaw(editorState.getCurrentContent())))

    const [currentImageKey, setCurrentImageKey] = useState<any>(null)

    const [galleryImages, setGalleryImages] = useState([
        {id: '1', thumbnail: 'https://picsum.photos/id/1018/250/150/'},
        {id: '2', thumbnail: 'https://picsum.photos/id/1015/250/150/'},
        {id: '3', thumbnail: 'https://picsum.photos/id/1019/250/150/'},
        {id: '4', thumbnail: 'https://picsum.photos/id/1018/250/150/'},
        {id: '5', thumbnail: 'https://picsum.photos/id/1015/250/150/'},
        {id: '6', thumbnail: 'https://picsum.photos/id/1019/250/150/'},
        {id: '7', thumbnail: 'https://picsum.photos/id/1018/250/150/'},
        {id: '8', thumbnail: 'https://picsum.photos/id/1015/250/150/'},
        {id: '9', thumbnail: 'https://picsum.photos/id/1019/250/150/'},
    ])

    // const [selectedOptions, setSelectedOptions] = useState<any>()
    // const [inputValue, setInputValue] = useState('')
    //
    // const optionList = [
    //     { value: "red", label: "Red" },
    //     { value: "green", label: "Green" },
    //     { value: "yellow", label: "Yellow" },
    //     { value: "blue", label: "Blue" },
    //     { value: "white", label: "White" }
    // ]
    //
    // function handleSelect(data: any) {
    //     setSelectedOptions(data)
    // }

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

    // ----------------------------------- //

    const formControl = useForm<any>({
        defaultValues: {
            option: '',
            detail: '',
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        // тестовые данные
        const newDetail = {id: '555', name: 'New Characteristic', description: data.detail}
        setDetails([newDetail, ...details])

        // добавление карточки
        //     addNewService(data).then((res: any) => {
        //         setIsCreating(false)
        //         enqueueSnackbar('Ремонт добавлен', {variant: 'success', autoHideDuration: 3000})
        //     }).catch((error: any) => {
        //         let message = error(error.response.data.errorDescription).toString()
        //         formControl.setError('name', {type: 'serverError', message: message})
        //         enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
        //         console.error(error.response.data)
        //     })
    }

    // функции для селектов
    const deleteOptionsListHandler = (optionsItem: any) => {
        setOptions(options.filter(el => el.id !== optionsItem.id))
    }
    const deleteOptionHandler = (listId: string, optionId: string) => {
        setOptions(options.map(el => el.id === listId ? {
            ...el, optionsArray: el.optionsArray.filter(opt => opt.id !== optionId)
        } : el))
    }
    const deleteDetailsListHandler = (detailsItem: any) => {
        setDetails(details.filter(el => el.id !== detailsItem.id))
    }

    // ----------------------------------- //

    // загрузка изображения
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)

            // перепроверить максимальный размер файла
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    console.log('file64: ', file64)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    // функции для изображения
    const setImageHandler = (imgKey: number) => {
        setCurrentImageKey(imgKey)
    }

    const deleteImageHandler = (imgId: string) => {
        setGalleryImages(galleryImages.filter(img => img.id !== imgId))
        setCurrentImageKey(null)
    }

    const onMoveBackwardHandler = (imgKey: number) => {
        if (imgKey === 0) return
        const items = [...galleryImages]
        const index = imgKey - 1
        const itemAbove = items[index]
        items[imgKey - 1] = items[imgKey]
        items[imgKey] = itemAbove
        console.log(items)
        setGalleryImages(items)
        setCurrentImageKey(null)
    }

    const onMoveForwardHandler = (imgKey: number) => {
        const items = [...galleryImages]
        if (imgKey === items.length - 1) return
        const index = imgKey + 1
        const itemBelow = items[index]
        items[imgKey + 1] = items[imgKey]
        items[imgKey] = itemBelow
        setGalleryImages(items)
        setCurrentImageKey(null)
    }

    // ----------------------------------- //

    useEffect(() => {

    }, [])

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

                    {/*<div className={s.leftSide_imageGallery}>*/}
                    {/*    <ImageGallery items={images}*/}
                    {/*                  showPlayButton={false}*/}
                    {/*                  showFullscreenButton={false}*/}
                    {/*                  showNav={false}*/}
                    {/*                  showIndex={true}*/}
                    {/*                  thumbnailPosition={'left'}*/}
                    {/*    />*/}
                    {/*    <div className={s.imageGallery_sortButtons}>*/}
                    {/*        /!*<div>Переместить назад</div>*!/*/}
                    {/*        <Button onClick={() => {alert('назад')}}>Переместить назад</Button>*/}
                    {/*        /!*<div>Переместить вперёд</div>*!/*/}
                    {/*        <Button onClick={() => {alert('вперёд')}}>Переместить вперёд</Button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className={s.rightSide_tagEditor}>
                        <div className={s.tagEditor_title}>Редактор тегов товара</div>
                        <div className={s.tagEditor_tags}>{productCardData}</div>
                    </div>

                    <div className={s.rightSide_productStatus}>
                        Статус товара
                    </div>

                    <div className={s.leftSide_imageGallery}>
                        <div className={s.imageGallery_imageList}>
                            {galleryImages.map((img, key) => {
                                return (
                                    <div key={img.id}
                                         onDoubleClick={() => {setImageHandler(key)}}
                                         className={s.imageList_item}
                                    >
                                        <img className={currentImageKey === key ? s.active_image : ''}
                                             src={img.thumbnail} alt="img-thumbnail"
                                        />
                                        <div className={s.imageList_imageCount}>
                                            {key + 1}/{galleryImages.length}
                                        </div>
                                        <img src={RemoveIcon} alt="remove-icon"
                                             className={s.imageList_deleteItem}
                                             onClick={() => {deleteImageHandler(img.id)}}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <div className={s.imageGallery_buttons}>
                            <div className={s.imageGallery_sortButtons}>
                                <Button disabled={currentImageKey === null || currentImageKey === 0}
                                        onClick={() => {onMoveBackwardHandler(currentImageKey)}}
                                >
                                    Переместить назад
                                </Button>
                                <Button
                                    disabled={currentImageKey === null || currentImageKey === (galleryImages.length - 1)}
                                    onClick={() => {onMoveForwardHandler(currentImageKey)}}
                                >
                                    Переместить вперёд
                                </Button>
                            </div>
                            <div className={s.imageGallery_addImage}>
                                <input type="file" id="file"
                                       accept="image/png, image/jpeg"
                                       onChange={uploadHandler}
                                       className={s.inputFile}
                                />
                            </div>

                        </div>
                    </div>

                    {/*<div className={s.leftSide_descriptionEditor}>*/}
                    {/*    <div className={s.descriptionEditor_title}>Описание товара:</div>*/}
                    {/*    /!*<div className={s.descriptionEditor_textarea}>*!/*/}
                    {/*    /!*    <textarea/>*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*    <div className={s.descriptionEditor_editorTextarea}>*/}
                    {/*        <Editor*/}
                    {/*            editorState={editorState}*/}
                    {/*            toolbarClassName="toolbarClassName"*/}
                    {/*            wrapperClassName="wrapperClassName"*/}
                    {/*            editorClassName={s.editorClassName}*/}
                    {/*            // editorClassName="editorClassName"*/}
                    {/*            onEditorStateChange={(editorState) => {*/}
                    {/*                setEditorState(editorState)*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
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
                            onEditorStateChange={(editorState) => {
                                setEditorState(editorState)
                            }}
                        />
                    </div>
                </div>

                <div className={s.editProductCardModal_rightSide}>
                    {/*<div className={s.rightSide_tagEditor}>*/}
                    {/*    <div className={s.tagEditor_title}>Редактор тегов товара</div>*/}
                    {/*    <div className={s.tagEditor_tags}>{productCardData}</div>*/}
                    {/*</div>*/}

                    {/*<div className={s.rightSide_productStatus}>*/}
                    {/*    Статус товара*/}
                    {/*</div>*/}

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
                                                             onClick={() => {deleteOptionsListHandler(option)}}
                                                        >
                                                            Удалить опцию
                                                        </div>
                                                        {
                                                            option.optionsArray.map(el => {
                                                                return (
                                                                    <div className={s.item_content} key={el.id} style={{marginBottom: '5px'}}>
                                                                        <div className={s.item_title}>{el.name}</div>
                                                                        {/*<div className={s.item_delete}*/}
                                                                        {/*     onClick={() => {deleteOptionHandler(option.id, el.id)}}*/}
                                                                        {/*>*/}
                                                                        {/*    X*/}
                                                                        {/*</div>*/}
                                                                        <img src={RemoveIcon} alt="remove-icon"
                                                                             onClick={() => {deleteOptionHandler(option.id, el.id)}}
                                                                        />
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
                                              label={'Опции'}
                                              className={s.options_search}
                                              data={options.map((el) => {
                                                  return {id: el.id, value: el.name ? el.name : 'Нет опции'}
                                              })}
                            />

                            {/*<Autocomplete*/}
                            {/*    disablePortal*/}
                            {/*    id="combo-box-demo"*/}
                            {/*    options={options}*/}
                            {/*    sx={{ width: 300 }}*/}
                            {/*    renderInput={(params) => <TextField {...params} label="Опции" />}*/}
                            {/*/>*/}

                            {/*<Select*/}
                            {/*    options={optionList}*/}
                            {/*    placeholder="Опции"*/}
                            {/*    isSearchable={true}*/}
                            {/*    value={selectedOptions}*/}
                            {/*    onChange={handleSelect}*/}
                            {/*    inputValue={inputValue}*/}
                            {/*    onInputChange={handleSelect}*/}
                            {/*    onMenuOpen={() => {}}*/}
                            {/*    onMenuClose={() => {}}*/}
                            {/*/>*/}
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
                                                        {/*<div className={s.item_deleteFullItem}*/}
                                                        {/*     onClick={() => deleteDetailsListHandler(detail)}*/}
                                                        {/*>*/}
                                                        {/*    Удалить*/}
                                                        {/*</div>*/}
                                                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                            <div className={s.item_content}>
                                                                {detail.description}
                                                            </div>
                                                            <div className={s.item_deleteDetailsItem}>
                                                                <img src={RemoveIcon} alt="remove-icon"
                                                                     onClick={() => {deleteDetailsListHandler(detail)}}
                                                                />
                                                            </div>
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

                    <div className={s.rightSide_mainButtons}>
                        <Button onClick={() => {setOpen(false)}}>
                            Отмена
                        </Button>
                        <Button onClick={() => {}}>
                            Сохранить
                        </Button>
                    </div>

                </div>
            </div>
        </Modal>
    )
}