import React, {useEffect, useState} from 'react'
import s from './EditProductCardModal.module.scss'
import useEditProductCardModal from './EditProductCardModalStore'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useSnackbar} from 'notistack'
import htmlToDraft from 'html-to-draftjs'
import {ContentState, EditorState} from 'draft-js'
import {CustomModal, LoaderScreen} from '../../../shared/ui'
import {EditProductCardSpecifications} from './EditProductCardSpecifications'
import {EditProductCardGallery} from './EditProductCardGallery'
import {EditProductCardStatus} from './EditProductCardStatus'
import {UpdateProductCardFormModel} from './models/UpdateProductCardFormModel'
import {ProductImage} from '../../../entities'
import {EditProductCardDescriptionFull} from './EditProductCardDescriptionFull'
import {EditProductCardDescriptionShort} from './EditProductCardDescriptionShort'
import {EditProductCardOptionBind} from './EditProductCardOptionBind'
import {EditProductCardMainButtons} from './EditProductCardMainButtons'

export const EditProductCardModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [images, setImages] = useState<ProductImage[]>([])

    const open = useEditProductCardModal(s => s.openEditProductCardModal)
    const setOpen = useEditProductCardModal(s => s.setOpenEditProductCardModal)
    const isLoading = useEditProductCardModal(s => s.isLoading)
    const errorStatus = useEditProductCardModal(s => s.errorStatus)

    const currentProduct = useEditProductCardModal(s => s.currentProduct)
    const getAllOptions = useEditProductCardModal(s => s.getAllOptions)
    const getAllSpecifications = useEditProductCardModal(s => s.getAllSpecifications)
    const updateProductCard = useEditProductCardModal(s => s.updateProductCard)

    const formControl = useForm<UpdateProductCardFormModel>({
        defaultValues: {
            checkStatus: '',
            productCard: {
                shortDescription: '',
                description: '',
            },
            productOptions: [],
            productSpecifications: [],
            productTags: [],
        }
    })

    const onSubmit: SubmitHandler<UpdateProductCardFormModel> = (data: UpdateProductCardFormModel) => {
        console.log('submitData', data)
        updateProductCard(data)
    }

    useEffect(() => {
        open && getAllOptions()
        open && getAllSpecifications()

        formControl.setValue('id', currentProduct.product?.id)
        formControl.setValue('productTags', currentProduct.productTags)
        formControl.setValue('checkStatus', currentProduct.product?.checkStatus)
        formControl.setValue('productSpecifications', currentProduct.productSpecifications)
        formControl.setValue('productCard', {
            description: currentProduct.productCard !== undefined ? currentProduct.productCard.description : '',
            shortDescription: currentProduct.productCard !== undefined ? currentProduct.productCard.descriptionShort : ''
        })
        formControl.setValue('productOptions', currentProduct.productOptions)
        formControl.setValue('bindedProducts', currentProduct.bindedProducts)

        setImages(currentProduct.productImages)

        if (currentProduct.productCard !== undefined) {
            let contentBlock = htmlToDraft(currentProduct.productCard?.description)
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)
            }
        }
    }, [currentProduct])

    useEffect(() => {
        if (errorStatus === 'success') {
            enqueueSnackbar('Изменения сохранены', {variant: 'success', autoHideDuration: 3000})
        }
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <CustomModal
                open={open}
                onClose={() => {setOpen(false)}}
            >
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <div className={s.editProductCardModal}>

                        <div className={s.editProductCardModal_mainBlock}>
                            <div className={s.editProductCardModal_header}>
                                <div className={s.productInfo}>
                                    Product Info
                                    {/*{currentProduct.product.name} {'|'} {''}*/}
                                    {/*Catalog Key: {currentProduct.product.catalogKey}*/}
                                </div>
                                <EditProductCardStatus control={formControl} name={'checkStatus'}/>
                                <EditProductCardMainButtons setOpen={setOpen}/>
                            </div>

                            <div className={s.editProductCardModal_scrollContainer}>
                                <div className={s.optionBind_wrapper}>
                                    <EditProductCardOptionBind product={currentProduct}
                                                               control={formControl}
                                                               images={images}
                                                               setImages={setImages}
                                    />
                                </div>
                                <EditProductCardGallery images={images} setImages={setImages}/>
                                <EditProductCardDescriptionFull name={'productCard'}
                                                                control={formControl}
                                                                editorState={editorState}
                                                                setEditorState={setEditorState}
                                />
                                <div className={s.specs_wrapper}>
                                    <EditProductCardDescriptionShort name={'productCard'}
                                                                     control={formControl}
                                    />
                                    <EditProductCardSpecifications control={formControl}
                                                                   name={'productSpecifications'}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </CustomModal>
        )
    }
}