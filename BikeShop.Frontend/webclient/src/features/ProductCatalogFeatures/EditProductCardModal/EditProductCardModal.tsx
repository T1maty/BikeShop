import React, {useEffect} from 'react'
import s from './EditProductCardModal.module.scss'
import {Modal} from '@mui/material'
import useEditProductCardModal from './EditProductCardModalStore'
import {Button, LoaderScreen} from '../../../shared/ui'
import {EditProductCardSpecifications} from "./EditProductCardSpecifications"
import {EditProductCardOption} from "./EditProductCardOption"
import {EditProductCardDescription} from "./EditProductCardDescription"
import {EditProductCardGallery} from "./EditProductCardGallery"
import {EditProductCardTags} from "./EditProductCardTags"
import {EditProductCardStatus} from "./EditProductCardStatus"
import {SubmitHandler, useForm} from "react-hook-form"
import {useSnackbar} from "notistack"
import {UpdateProductCardFormModel} from "./models/UpdateProductCardFormModel";
import {UpdateProductCardRequest} from "./models/UpdateProductCardRequest";
import {ProductImageRequest} from "./models/ProductImageRequest";
import {ProductOptionVariantBind, ProductSpecificationBind} from "../../../entities";

export const EditProductCardModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useEditProductCardModal(s => s.openEditProductCardModal)
    const setOpen = useEditProductCardModal(s => s.setOpenEditProductCardModal)
    const isLoading = useEditProductCardModal(s => s.isLoading)
    const isError = useEditProductCardModal(s => s.isError)

    const currentProduct = useEditProductCardModal(s => s.currentProduct)
    const getCardOptions = useEditProductCardModal(s => s.getCardOptions)
    const getSpecifications = useEditProductCardModal(s => s.getSpecifications)
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
            productImages: [],
            productTags: [],
        }
    })

    const onSubmit: SubmitHandler<UpdateProductCardFormModel> = (data: UpdateProductCardFormModel) => {

        var DATA = {} as UpdateProductCardRequest

        let specs: ProductSpecificationBind[] = []
        data.productSpecifications.forEach(n => {
            specs.push({
                id: 0,
                specificationId: n.id,
                sortOrder: 0,
                description: '',
                enabled: true
            } as ProductSpecificationBind)
        })

        let variants: { optionVariants: ProductOptionVariantBind[] }[] = []
        data.productOptions.forEach(n => {
            let vars: ProductOptionVariantBind[] = []
            n.variants.forEach(j => {
                vars.push({
                    id: 0,
                    enabled: true,
                    linkProductId: 0,
                    sortOrder: 0,
                    optionVariantId: j.id
                } as ProductOptionVariantBind)
            })
            variants.push({optionVariants: vars})
        })

        let tagIds: string[] = []
        data.productTags.forEach(n => {
            tagIds.push(n.id)
        })

        let prodImgs: ProductImageRequest[] = []
        data.productImages.forEach(n => {

        })

        DATA.id = currentProduct.product.id
        DATA.checkStatus = data.checkStatus
        DATA.productSpecifications = specs
        //DATA.productOptions = variants
        DATA.productCard = {
            description: data.productCard.description,
            shortDescription: data.productCard.shortDescription
        }
        DATA.productTags = tagIds
        DATA.productImages = prodImgs
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
        getCardOptions()
        getSpecifications()
    }, [])

    useEffect(() => {
        formControl.setValue('productTags', currentProduct.productTags)
        formControl.setValue('productImages', currentProduct.productImages)
        formControl.setValue("productSpecifications", currentProduct.productSpecifications)
        //formControl.setValue("productOptions", currentProduct.productOptions)
    }, [currentProduct])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <div className={s.editProductCardModal_mainBlock}>
                        <div className={s.editProductCardModal_leftSide}>
                            <EditProductCardTags control={formControl} name={'productTags'}/>
                            <EditProductCardStatus control={formControl} name={'checkStatus'}/>
                            <EditProductCardGallery control={formControl} name={'productImages'}/>
                        </div>

                        <EditProductCardDescription control={formControl} name={'productCard'}/>

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
            </Modal>
        )
    }
}