import React, {useState, useEffect, ChangeEvent} from 'react'
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
import {ProductCardOption, ProductCardOptionVariant,
    ProductCardUserSpecification} from '../../../entities/models/ProductCardModels'

interface EditProductCardModalProps {
    productCardData?: any
}

export const EditProductCardModal: React.FC<EditProductCardModalProps> = ({productCardData}) => {

    const open = useEditProductCardModal(s => s.openEditProductCardModal)
    const setOpen = useEditProductCardModal(s => s.setOpenEditProductCardModal)

    const cardOptions = useEditProductCardModal(s => s.cardOptions)
    const getCardOptions = useEditProductCardModal(s => s.getCardOptions)
    const currentCardOptions = useEditProductCardModal(s => s.currentCardOptions)
    const setCurrentCardOptions = useEditProductCardModal(s => s.setCurrentCardOptions)
    const addCurrentCardOption = useEditProductCardModal(s => s.addCurrentCardOption)
    const currentOptionVariants = useEditProductCardModal(s => s.currentOptionVariants)
    const setCurrentOptionsVariants = useEditProductCardModal(s => s.setCurrentOptionsVariants)
    const addCurrentOptionVariant = useEditProductCardModal(s => s.addCurrentOptionVariant)

    const specifications = useEditProductCardModal(s => s.specifications)
    const getSpecifications = useEditProductCardModal(s => s.getSpecifications)
    const currentSpecifications = useEditProductCardModal(s => s.currentSpecifications)
    const setCurrentSpecifications = useEditProductCardModal(s => s.setCurrentSpecifications)
    const addCurrentSpecification = useEditProductCardModal(s => s.addCurrentSpecification)

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

    // текущие значения селектов
    const [selectedOption, setSelectedOption] = useState<any>(null) // опция
    const [selectedOptionVariant, setSelectedOptionVariant] = useState<any>(null) // разновидность опции
    const [selectedSpecification, setSelectedSpecification] = useState<any>(null) // характеристика

    // тестовые данные для характеристик
    // const [currentSpecifications, setCurrentSpecifications] = useState([
    //     { id: 150, name: 'New Spec', title: 'Введите текст' },
    //     { id: 120, name: 'New Spec2', title: 'Введите текст2' },
    // ])

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

    // ----------------------------------- //

    // функции для опций
    const addOptionListHandler = () => {
        const newOption = cardOptions.find(el => el.option.id === selectedOption.option.id)
        addCurrentCardOption(newOption!)
    }

    const deleteOptionListHandler = (optionsItem: ProductCardOption) => {
        setCurrentCardOptions(currentCardOptions.filter(el => el.option.id !== optionsItem.option.id))
    }

    const addOptionVariantHandler = () => {
        // исправить
        const newOptionVariant = currentCardOptions.find(el => el.optionVariants.find(ov => ov.id === selectedOptionVariant.id))
        // addCurrentOptionVariant(newOptionVariant!)

        console.log('разновидность опции', currentOptionVariants)
        console.log('опции', currentCardOptions)
        console.log('новая опция', newOptionVariant)

    }
    const deleteOptionVariantHandler = (optionId: number, variantId: number) => {
        // исправить
        setCurrentCardOptions(currentCardOptions.map(el => el.option.id === optionId ? {
            ...el, optionVariants: el.optionVariants.filter(variant => variant.id !== variantId)
        } : el))
    }

    // ----------------------------------- //

    // функции для характеристик
    const addSpecificationHandler = () => {
        const newSpecification: ProductCardUserSpecification =
            { id: Date.now(), name: selectedSpecification.name, title: 'Введите текст' }
        addCurrentSpecification(newSpecification)
        // для тестового варианта (локальный стейт)
        // setCurrentSpecifications([newSpecification, ...currentSpecifications])
        // console.log('new spec', newSpecification)
    }

    const deleteSpecificationHandler = (specItem: ProductCardUserSpecification) => {
        setCurrentSpecifications(currentSpecifications.filter(el => el.id !== specItem.id))
        // для тестового варианта (локальный стейт)
        // setCurrentSpecifications(currentSpecifications.filter(el => el.id !== specItem.id))
    }

    const changeSpecificationTitleHandler = (specId: number, newInputValue: string) => {
        setCurrentSpecifications(currentSpecifications.map(spec => spec.id === specId ?
            {...spec, title: newInputValue} : spec))
        // для тестового варианта (локальный стейт)
        // setCurrentSpecifications(currentSpecifications.map(spec => spec.id === specId ?
        //     {...spec, title: newInputValue} : spec))
        // console.log(newInputValue)
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
                                currentCardOptions.length === 0 ? <div style={{textAlign: 'center'}}>
                                        Для добавления выберите опции
                                </div> :

                                    currentCardOptions.map((currentOption: ProductCardOption) => {
                                        return (
                                            <div className={s.optionsList_item}
                                                 key={currentOption.option.id}
                                            >
                                                <fieldset className={s.options_box}>
                                                    <legend>{currentOption.option.name}</legend>
                                                    <div className={s.options_rowItems}>
                                                        <div className={s.rowItems_item}>
                                                            <div className={s.item_deleteFullItem}
                                                                 onClick={() => {deleteOptionListHandler(currentOption)}}
                                                            >
                                                                Удалить опцию
                                                            </div>
                                                            {
                                                                currentOptionVariants.map((variant: ProductCardOptionVariant) => {
                                                                    return (
                                                                        <div className={s.item_content}
                                                                             style={{marginBottom: '5px'}}
                                                                             key={variant.id}
                                                                        >
                                                                            <div className={s.item_title}>
                                                                                {variant.name}
                                                                            </div>
                                                                            <img src={RemoveIcon} alt="remove-icon"
                                                                                 onClick={() => {deleteOptionVariantHandler(currentOption.option.id, variant.id)}}
                                                                            />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <div className={s.rowItems_chooseItem}>
                                                            <Button buttonDivWrapper={s.options_button}
                                                                    onClick={addOptionVariantHandler}
                                                                    // onClick={() => {console.log(currentOption.optionVariants)}}
                                                                    disabled={selectedOptionVariant === null}
                                                            >
                                                                +
                                                            </Button>
                                                            <Select
                                                                className={s.options_search}
                                                                options={currentOption.optionVariants}
                                                                placeholder="Разновидность опции"
                                                                isSearchable={true}
                                                                value={selectedOptionVariant}
                                                                onChange={(value: any) => {setSelectedOptionVariant(value)}}
                                                                getOptionLabel={label => label!.name}
                                                                getOptionValue={value => value!.name}
                                                                noOptionsMessage={() => 'Опция не найдена'}
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
                                    onClick={addOptionListHandler}
                                    disabled={selectedOption === null}
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
                                    <div style={{textAlign: 'center'}}>
                                        Для добавления выберите характеристики
                                    </div> :

                                    currentSpecifications.map((spec: ProductCardUserSpecification) => {

                                        const onChangeTitleHandler = (newInputValue: string) => {
                                            changeSpecificationTitleHandler(spec.id, newInputValue)
                                        }

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
                                                                    <EditableSpan title={spec.title}
                                                                                  onChangeInput={onChangeTitleHandler}
                                                                    />
                                                                </div>
                                                                <div className={s.item_deleteDetailsItem}>
                                                                    <img src={RemoveIcon} alt="remove-icon"
                                                                         onClick={() => {deleteSpecificationHandler(spec)}}
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
                                    onClick={addSpecificationHandler}
                                    disabled={selectedSpecification === null}
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