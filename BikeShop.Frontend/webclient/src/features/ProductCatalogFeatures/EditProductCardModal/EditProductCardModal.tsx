import React, {useState, useEffect, useCallback, ChangeEvent} from 'react'
import s from './EditProductCardModal.module.scss'
import {Modal} from '@mui/material'
import useEditProductCardModal from './EditProductCardModalStore'
import {Button, ControlledSelect, EditableSpan} from '../../../shared/ui'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Errors} from '../../../entities/errors/workspaceErrors'
import {Editor} from 'react-draft-wysiwyg'
import {EditorState, convertToRaw} from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import draftToHtml from 'draftjs-to-html'
import RemoveIcon from '../../../shared/assets/workspace/remove-icon.svg'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import {
    ProductCardOption, ProductCardOptionVariant,
    ProductCardSpecification, ProductCardUserSpecification
} from '../../../entities/models/ProductCardModels'

interface EditProductCardModalProps {
    productCardData?: any
}

export const EditProductCardModal: React.FC<EditProductCardModalProps> = ({productCardData}) => {

    const open = useEditProductCardModal(s => s.openEditProductCardModal)
    const setOpen = useEditProductCardModal(s => s.setOpenEditProductCardModal)

    const cardOptions = useEditProductCardModal(s => s.cardOptions)
    const getCardOptions = useEditProductCardModal(s => s.getCardOptions)
    const currentCardOptions = useEditProductCardModal(s => s.currentCardOptions)
    const setCurrentCardOption = useEditProductCardModal(s => s.setCurrentCardOption)

    const specifications = useEditProductCardModal(s => s.specifications)
    const getSpecifications = useEditProductCardModal(s => s.getSpecifications)
    // const currentSpecifications = useEditProductCardModal(s => s.currentSpecifications)
    // const setCurrentSpecification = useEditProductCardModal(s => s.setCurrentSpecification)

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

    // ----------------------------------- //

    // тестовые данные
    // const [options, setOptions] = useState<any>([
    //     // {
    //     //     id: '1',
    //     //     name: 'Размер шлема',
    //     //     optionsArray: [{id: '4', name: 'S'}, {id: '5', name: 'M'}, {id: '6', name: 'L'}]
    //     // },
    // ])

    const [selectedOption, setSelectedOption] = useState(null)
    const [selectedOptionVariant, setSelectedOptionVariant] = useState(null)
    const [selectedSpecification, setSelectedSpecification] = useState(null)

    const [currentSpecifications, setCurrentSpecifications] = useState([
        { id: 150, name: 'New Spec'},
        { id: 120, name: 'New Spec2'},
    ])

    // ----------------------------------- //

    const [currentSpecificationTitle, setCurrentSpecificationTitle] = useState<string>('Введите текст')

    const changeSpecificationTitleHandler = useCallback((specItem: any) => {
        // setCurrentSpecificationTitle(newInputValue)
        // setCurrentSpecifications(currentSpecifications.map(spec => spec.id === specItem.id ? {...spec, name: currentSpecificationTitle} : spec))
    }, [])

    const addNewSpecification = () => {
        // const newSpecification: any = { id: 100, name: selectedSpecification }
        // setCurrentSpecification(newSpecification)
    }

    // ----------------------------------- //

    // const formControl = useForm<any>({
    //     defaultValues: {
    //         option: '',
    //         specification: '',
    //     }
    // })
    //
    // const onSubmit: SubmitHandler<any> = (data: any) => {
    //     // тестовые данные
    //     const newDetail = {id: '555', name: 'New Characteristic', description: data.detail}
    //     setSpecifications([newDetail, ...specifications])
    //
    //     // добавление карточки
    //     //     addNewService(data).then((res: any) => {
    //     //         setIsCreating(false)
    //     //         enqueueSnackbar('Ремонт добавлен', {variant: 'success', autoHideDuration: 3000})
    //     //     }).catch((error: any) => {
    //     //         let message = error(error.response.data.errorDescription).toString()
    //     //         formControl.setError('name', {type: 'serverError', message: message})
    //     //         enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
    //     //         console.error(error.response.data)
    //     //     })
    // }

    // функции для селектов
    const deleteOptionsListHandler = (optionsItem: any) => {
        // setOptions(options.filter((el: any) => el.id !== optionsItem.id))
    }
    const deleteOptionHandler = (listId: number, optionId: number) => {
        // setOptions(options.map((el: any) => el.id === listId ? {
        //     ...el, optionsArray: el.optionsArray.filter((opt: any) => opt.id !== optionId)
        // } : el))
    }
    const deleteSpecHandler = (specItem: ProductCardUserSpecification) => {
        setCurrentSpecifications(currentSpecifications.filter((el: ProductCardUserSpecification) => el.id !== specItem.id))
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
        setGalleryImages(galleryImages.filter((img: any) => img.id !== imgId))
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
        getCardOptions()
        getSpecifications()
    }, [])

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.editProductCardModal_mainBlock}>
                <div className={s.editProductCardModal_leftSide}>
                    <div className={s.rightSide_tagEditor}>
                        <div className={s.tagEditor_title}>Редактор тегов товара</div>
                        <div className={s.tagEditor_tags}>{productCardData}</div>
                    </div>

                    <div className={s.rightSide_productStatus}>
                        Статус товара
                    </div>

                    <div className={s.leftSide_imageGallery}>
                        <div className={s.imageGallery_imageList}>
                            {
                                galleryImages.length === 0 ? <div>Фотографий нет</div> :

                                    galleryImages.map((img: any, key: number) => {
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
                                    })
                            }
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

                <div className={s.editProductCardModal_rightSide}>
                    <div className={s.rightSide_productOptions}>
                        <div className={s.productOptions_optionsList}>
                            {
                                cardOptions.length === 0 ? <div style={{textAlign: 'center'}}>Добавьте опции</div> :

                                    cardOptions.map((option: ProductCardOption) => {
                                        return (
                                            <div className={s.optionsList_item}
                                                 key={option.option.id}
                                            >
                                                <fieldset className={s.options_box}>
                                                    <legend>{option.option.name}</legend>
                                                    <div className={s.options_rowItems}>
                                                        <div className={s.rowItems_item}>
                                                            <div className={s.item_deleteFullItem}
                                                                 onClick={() => {deleteOptionsListHandler(option)}}
                                                            >
                                                                Удалить опцию
                                                            </div>
                                                            {
                                                                option.optionVariants.map((variant: ProductCardOptionVariant) => {
                                                                    return (
                                                                        <div className={s.item_content}
                                                                             style={{marginBottom: '5px'}}
                                                                             key={variant.id}
                                                                        >
                                                                            <div className={s.item_title}>
                                                                                {variant.name}
                                                                            </div>
                                                                            <img src={RemoveIcon} alt="remove-icon"
                                                                                 onClick={() => {deleteOptionHandler(option.option.id, variant.id)}}
                                                                            />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <div className={s.rowItems_chooseItem}>
                                                            <Button buttonDivWrapper={s.options_button}>+</Button>
                                                            {/*<ControlledSelect control={formControl}*/}
                                                            {/*                  name={'optionVersion'}*/}
                                                            {/*                  label={'Разновидность опции'}*/}
                                                            {/*                  className={s.options_search}*/}
                                                            {/*                  data={option.optionsArray.map((el: any) => {*/}
                                                            {/*                      return {*/}
                                                            {/*                          id: el.id,*/}
                                                            {/*                          value: el.name ? el.name : 'Нет имени'*/}
                                                            {/*                      }*/}
                                                            {/*                  })}*/}
                                                            {/*/>*/}

                                                            <Select
                                                                className={s.options_search}
                                                                options={option.optionVariants}
                                                                placeholder="Разновидность опции"
                                                                // isSearchable={true}
                                                                value={selectedOptionVariant}
                                                                onChange={(value: any) => {setSelectedOptionVariant(value)}}
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
                            <Button buttonDivWrapper={s.options_button}
                                    onClick={() => {
                                        console.log(selectedOption)
                                    }}
                            >
                                +
                            </Button>

                            {/*<ControlledSelect control={formControl}*/}
                            {/*                  name={'option'}*/}
                            {/*                  label={'Опции'}*/}
                            {/*                  className={s.options_search}*/}
                            {/*                  data={options.map((el) => {*/}
                            {/*                      return {id: el.id, value: el.name ? el.name : 'Нет опции'}*/}
                            {/*                  })}*/}
                            {/*/>*/}

                            <Select
                                className={s.options_search}
                                options={cardOptions}
                                placeholder="Опции"
                                isSearchable={true}
                                value={selectedOption}
                                onChange={(value: any) => {setSelectedOption(value)}}
                                getOptionLabel={label => label!.option.name}
                                getOptionValue={value => value!.option.name}
                                noOptionsMessage={() => 'Опция не найдена'}
                            />
                        </div>
                    </div>

                    <div className={s.rightSide_productDetails}>
                        <div className={s.productOptions_optionsList}>
                            {
                                currentSpecifications.length === 0 ?
                                    <div style={{textAlign: 'center'}}>Добавьте характеристики</div> :

                                    currentSpecifications.map((spec: ProductCardUserSpecification) => {
                                        return (
                                            <div className={s.optionsList_item}
                                                 key={spec.id}
                                            >
                                                <fieldset className={s.options_box}>
                                                    <legend>{spec.name}</legend>
                                                    <div className={s.options_rowItems}>
                                                        <div className={s.rowItems_item}>
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between'
                                                            }}>
                                                                <div className={s.item_content}>
                                                                    {/*Здесь будет редактор текста*/}
                                                                    <EditableSpan title={currentSpecificationTitle}
                                                                                  onChangeInput={() => {changeSpecificationTitleHandler(spec)}}
                                                                    />
                                                                </div>
                                                                <div className={s.item_deleteDetailsItem}>
                                                                    <img src={RemoveIcon} alt="remove-icon"
                                                                         onClick={() => {deleteSpecHandler(spec)}}
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
                        {/*<form onSubmit={formControl.handleSubmit(onSubmit)}>*/}
                        <div className={s.productOptions_selectRow}>
                            <Button buttonDivWrapper={s.options_button}
                                    onClick={addNewSpecification}
                            >
                                +
                            </Button>
                            <Select
                                className={s.options_search}
                                options={specifications}
                                placeholder={'Характеристика'}
                                isSearchable={true}
                                value={selectedSpecification}
                                onChange={(value: any) => {setSelectedSpecification(value)}}
                                getOptionLabel={label => label!.name}
                                getOptionValue={value => value!.name}
                                noOptionsMessage={() => 'Характеристика не найдена'}
                            />
                            {/*<AsyncSelect*/}
                            {/*    className={s.options_search}*/}
                            {/*    loadOptions={getSpecifications}*/}
                            {/*    placeholder={'Характеристика'}*/}
                            {/*    isSearchable={true}*/}
                            {/*    value={selectedSpecification}*/}
                            {/*    onChange={(value: any) => {setSelectedSpecification(value)}}*/}
                            {/*    getOptionLabel={label => label.name}*/}
                            {/*    getOptionValue={value => value.name}*/}
                            {/*/>*/}
                        </div>
                        {/*</form>*/}
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