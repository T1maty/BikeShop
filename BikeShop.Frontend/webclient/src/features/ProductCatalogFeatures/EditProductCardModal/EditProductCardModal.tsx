import React, {useEffect, useState} from 'react'
import s from './EditProductCardModal.module.scss'
import useEditProductCardModal from './EditProductCardModalStore'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useSnackbar} from 'notistack'
import htmlToDraft from 'html-to-draftjs'
import {ContentState, EditorState} from 'draft-js'
import {Button, CustomModal, LoaderScreen} from '../../../shared/ui'
import {EditProductCardSpecifications} from './EditProductCardSpecifications'
import {EditProductCardGallery} from './EditProductCardGallery'
import {EditProductCardStatus} from './EditProductCardStatus'
import {UpdateProductCardFormModel} from './models/UpdateProductCardFormModel'
import {ProductImage} from '../../../entities'
import {EditProductCardDescriptionFull} from './EditProductCardDescriptionFull'
import {EditProductCardDescriptionShort} from './EditProductCardDescriptionShort'
import {EditProductCardOptionBind} from './EditProductCardOptionBind'

export const EditProductCardModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [images, setImages] = useState<ProductImage[]>([])

    const open = useEditProductCardModal(s => s.openEditProductCardModal)
    const setOpen = useEditProductCardModal(s => s.setOpenEditProductCardModal)
    const isLoading = useEditProductCardModal(s => s.isLoading)

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
        getAllOptions()
        getAllSpecifications()

        formControl.setValue('id', currentProduct.product?.id)
        formControl.setValue('productTags', currentProduct.productTags)
        formControl.setValue('checkStatus', currentProduct.product?.checkStatus)
        formControl.setValue('productSpecifications', currentProduct.productSpecifications)
        formControl.setValue('productCard', {
            description: currentProduct.productCard !== undefined ? currentProduct.productCard.description : '',
            shortDescription: currentProduct.productCard !== undefined ? currentProduct.productCard.descriptionShort : ''
        })

        setImages(currentProduct.productImages)

        formControl.setValue('productOptions', currentProduct.productOptions)

        console.log(currentProduct.bindedProducts)
        formControl.setValue('bindedProducts', currentProduct.bindedProducts)

        if (currentProduct.productCard !== undefined) {
            let contentBlock = htmlToDraft(currentProduct.productCard?.description)
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)
            }
        }

    }, [currentProduct])

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
                        <div className={s.editProductCardModal_container}>
                            <div className={s.editProductCardModal_mainBlock}>

                                <EditProductCardGallery images={images} setImages={setImages}/>
                                <div className={s.description_wrapper}>
                                    <EditProductCardStatus control={formControl} name={'checkStatus'}/>
                                    <EditProductCardDescriptionShort name={'productCard'}
                                                                     control={formControl}
                                    />
                                </div>

                                <div className={s.optionBind_wrapper}>
                                    <EditProductCardOptionBind product={currentProduct}
                                                               control={formControl}
                                                               images={images}
                                                               setImages={setImages}
                                    />
                                </div>

                                <EditProductCardDescriptionFull name={'productCard'}
                                                                control={formControl}
                                                                editorState={editorState}
                                                                setEditorState={setEditorState}
                                />

                                <div className={s.specs_wrapper}>
                                    <EditProductCardSpecifications control={formControl}
                                                                   name={'productSpecifications'}
                                    />
                                    <div className={s.mainButtons}>
                                        <Button onClick={() => {setOpen(false)}}>
                                            Отмена
                                        </Button>
                                        <Button type={'submit'}>
                                            Сохранить
                                        </Button>
                                    </div>
                                </div>


                                {/*прежний враиант*/}
                                {/*<div className={s.editProductCardModal_leftSide}>*/}
                                {/*    <EditProductCardStatus control={formControl} name={'checkStatus'}/>*/}
                                {/*    <EditProductCardGallery images={images} setImages={setImages}/>*/}
                                {/*</div>*/}

                                {/*<div className={s.leftSide_descriptionEditor}>*/}
                                {/*    <EditProductCardDescriptionShort name={'productCard'}*/}
                                {/*                                     control={formControl}*/}
                                {/*    />*/}
                                {/*    <EditProductCardDescriptionFull name={'productCard'}*/}
                                {/*                                    control={formControl}*/}
                                {/*                                    editorState={editorState}*/}
                                {/*                                    setEditorState={setEditorState}*/}
                                {/*    />*/}
                                {/*</div>*/}

                                {/*<div className={s.editProductCardModal_rightSide}>*/}
                                {/*    <EditProductCardSpecifications divClassName={s.rightSide_productOptions}*/}
                                {/*                                   control={formControl}*/}
                                {/*                                   name={'productSpecifications'}*/}
                                {/*    />*/}
                                {/*    <div className={s.rightSide_mainButtons}>*/}
                                {/*        <Button onClick={() => {setOpen(false)}}>*/}
                                {/*            Отмена*/}
                                {/*        </Button>*/}
                                {/*        <Button type={'submit'}>*/}
                                {/*            Сохранить*/}
                                {/*        </Button>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*</div>*/}

                                {/*<EditProductCardOptionBind product={currentProduct}*/}
                                {/*                           control={formControl}*/}
                                {/*                           images={images}*/}
                                {/*                           setImages={setImages}*/}
                                {/*/>*/}


                            </div>
                        </div>
                    </div>
                </form>
            </CustomModal>
        )
    }
}