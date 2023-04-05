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
import {ProductImage, ProductOptionVariantBind} from "../../../entities"
import {ProductOptionsWithVariants} from "./models/ProductOptionsWithVariants"
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

        var DATA = {} as UpdateProductCardRequest

        let options: { optionVariants: ProductOptionVariantBind[] }[] = []
        data.productOptions.forEach(n => {
            let variants: ProductOptionVariantBind[] = []
            n.optionVariants.forEach(j => {
                variants.push({
                    id: 0,
                    enabled: true,
                    linkProductId: 0,
                    sortOrder: 0,
                    optionVariantId: j.id
                } as ProductOptionVariantBind)
            })
            options.push({optionVariants: variants})
        })

        let tagIds: string[] = []
        data.productTags.forEach(n => {tagIds.push(n.id)})

        DATA.id = currentProduct.product.id
        DATA.checkStatus = data.checkStatus
        DATA.productSpecifications = data.productSpecifications
        DATA.productOptions = options
        DATA.productCard = {
            description: data.productCard.description,
            shortDescription: data.productCard.shortDescription
        }
        DATA.productTags = tagIds
        console.log('submitData', DATA)
        updateProductCard(DATA)

        // if (isError) {
        //     enqueueSnackbar('Ошибка сервера: карточка не обновлена!',
        //         {variant: 'error', autoHideDuration: 3000,
        //             anchorOrigin: {vertical: 'bottom', horizontal: 'center'}})
        // } else {
        //     enqueueSnackbar('Карточка обновлена',
        //         {variant: 'success', autoHideDuration: 3000,
        //             anchorOrigin: {vertical: 'bottom', horizontal: 'center'}})
        // }

        // обновление карточки
        // updateProductCard(data).then((res: any) => {
        //     enqueueSnackbar('Карточка обновлена', {variant: 'success', autoHideDuration: 3000})
        // }).catch((error: any) => {
        //     let message = error(error.response.data.errorDescription).toString()
        //     // formControl.setError('name', {type: 'serverError', message: message})
        //     enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
        //     console.error(error.response.data)
        // })
    }

    useEffect(() => {
        getAllOptions()
        getAllSpecifications()
        formControl.setValue('productTags', currentProduct.productTags)
        formControl.setValue('checkStatus', currentProduct.product?.checkStatus)
        formControl.setValue("productSpecifications", currentProduct.productSpecifications)
        formControl.setValue("productCard", {
            description: currentProduct.productCard != undefined ? currentProduct.productCard.description : '',
            shortDescription: currentProduct.productCard != undefined ? currentProduct.productCard.descriptionShort : ''
        })

        setImages(currentProduct.productImages)

        let options: ProductOptionsWithVariants[] = []
        let ids: number[] = []
        currentProduct.productOptions?.forEach(n => {
            let newOption: ProductOptionsWithVariants
            if (!ids.includes(n.optionId)) {
                newOption = {
                    id: n.optionId,
                    name: n.optionName,
                    optionVariants: [],
                    createdAt: '',
                    updatedAt: '',
                    enabled: true,
                }
                ids.push(n.optionId)
                options.push(newOption)
            }
            options.find(n1 => n1.id === n.optionId)?.optionVariants.push({
                id: n.optionVariantId,
                name: n.name,
                optionId: n.optionId,
                optionName: n.optionName,
                createdAt: n.createdAt,
                updatedAt: n.updatedAt,
                enabled: n.enabled
            })
        })

        console.log("Глобальная установка дефолтных значений")

        if (currentProduct.productCard != undefined) {
            let contentBlock = htmlToDraft(currentProduct.productCard?.description)
            console.log('загружаем дефолтное значение', currentProduct.productCard.description)
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)
            }
        }
        formControl.setValue("productOptions", options)
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
                                <Button onClick={() => {setOpen(false)}}>
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