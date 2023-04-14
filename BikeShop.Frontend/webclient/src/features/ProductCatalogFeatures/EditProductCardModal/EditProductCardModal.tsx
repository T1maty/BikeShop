import React, {useEffect, useState} from 'react'
import s from './EditProductCardModal.module.scss'
import useEditProductCardModal from './EditProductCardModalStore'
import {SubmitHandler, useForm} from "react-hook-form"
import {useSnackbar} from "notistack"
import htmlToDraft from "html-to-draftjs"
import {ContentState, EditorState} from "draft-js"
import {Button, CustomModal, LoaderScreen} from '../../../shared/ui'
import {EditProductCardSpecifications} from "./EditProductCardSpecifications"
import {EditProductCardOption} from "./EditProductCardOption"
import {EditProductCardGallery} from "./EditProductCardGallery"
import {EditProductCardTags} from "./EditProductCardTags"
import {EditProductCardStatus} from "./EditProductCardStatus"
import {UpdateProductCardFormModel} from "./models/UpdateProductCardFormModel"
import {UpdateProductCardRequest} from "./models/UpdateProductCardRequest"
import {ProductImage} from "../../../entities"
import {EditProductCardDescriptionFull} from "./EditProductCardDescriptionFull"
import {EditProductCardDescriptionShort} from "./EditProductCardDescriptionShort"

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

        const DATA = {} as UpdateProductCardRequest

        let tagIds: string[] = []
        data.productTags.forEach(n => {
            tagIds.push(n.id)
        })

        DATA.id = currentProduct.product.id
        DATA.checkStatus = data.checkStatus
        DATA.productSpecifications = data.productSpecifications
        DATA.productOptions = data.productOptions
        DATA.productCard = {
            description: data.productCard.description,
            shortDescription: data.productCard.shortDescription
        }
        DATA.productTags = tagIds
        DATA.bindedProducts = []

        console.log('submitData', DATA)
        updateProductCard(DATA)
    }

    useEffect(() => {
        getAllOptions()
        getAllSpecifications()

        formControl.setValue('productTags', currentProduct.productTags)
        formControl.setValue('checkStatus', currentProduct.product?.checkStatus)
        formControl.setValue('productSpecifications', currentProduct.productSpecifications)
        formControl.setValue('productCard', {
            description: currentProduct.productCard !== undefined ? currentProduct.productCard.description : '',
            shortDescription: currentProduct.productCard !== undefined ? currentProduct.productCard.descriptionShort : ''
        })

        setImages(currentProduct.productImages)

        formControl.setValue('productOptions', currentProduct.productOptions)

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
                onClose={() => {
                    setOpen(false)
                }}
            >
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <div className={s.editProductCardModal_mainBlock}>
                        <div className={s.editProductCardModal_leftSide}>
                            <EditProductCardTags control={formControl} name={'productTags'}/>
                            <EditProductCardStatus control={formControl} name={'checkStatus'}/>
                            <EditProductCardGallery images={images} setImages={setImages}/>
                        </div>

                        <div className={s.leftSide_descriptionEditor}>
                            <EditProductCardDescriptionShort name={'productCard'}
                                                             control={formControl}
                            />
                            <EditProductCardDescriptionFull name={'productCard'}
                                                            control={formControl}
                                                            editorState={editorState}
                                                            setEditorState={setEditorState}
                            />
                        </div>

                        <div className={s.editProductCardModal_rightSide}>
                            <EditProductCardOption divClassName={s.rightSide_productDetails}
                                                   control={formControl}
                                                   name={'productOptions'}
                            />
                            <EditProductCardSpecifications divClassName={s.rightSide_productOptions}
                                                           control={formControl}
                                                           name={'productSpecifications'}
                            />
                            <div className={s.rightSide_mainButtons}>
                                <Button onClick={() => {
                                    setOpen(false)
                                }}>
                                    Отмена
                                </Button>
                                <Button type={'submit'}>
                                    Сохранить
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </CustomModal>
        )
    }
}