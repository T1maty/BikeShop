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
import {UpdateProductCard} from "../../../entities"

export const EditProductCardModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useEditProductCardModal(s => s.openEditProductCardModal)
    const setOpen = useEditProductCardModal(s => s.setOpenEditProductCardModal)
    const isLoading = useEditProductCardModal(s => s.isLoading)

    const currentProduct = useEditProductCardModal(s => s.currentProduct)
    const productCardDescription = useEditProductCardModal(s => s.productCardDescription)
    const getCardOptions = useEditProductCardModal(s => s.getCardOptions)
    const getSpecifications = useEditProductCardModal(s => s.getSpecifications)
    const galleryImages = useEditProductCardModal(s => s.galleryImages)
    const productTags = useEditProductCardModal(s => s.productTags)
    const updateProductCard = useEditProductCardModal(s => s.updateProductCard)

    const formControl = useForm<UpdateProductCard>({
        defaultValues: {
            product: {
                checkStatus: '',
            },
            productCard: {
                descriptionShort: '',
                description: '',
            },
            productOptions: [],
            productSpecifications: [],
            productImages: [],
            productTags: [],
        }
    })

    const onSubmit: SubmitHandler<UpdateProductCard> = (data: UpdateProductCard) => {
        data.product = {
            ...currentProduct.product, checkStatus: data.product.checkStatus
        }
        data.productCard = {
            ...currentProduct.productCard, description: productCardDescription
        }
        data.productImages = galleryImages
        data.productTags = productTags

        console.log('submitData', data)

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

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <Modal
                open={open}
                onClose={() => {setOpen(false)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <div className={s.editProductCardModal_mainBlock}>
                        <div className={s.editProductCardModal_leftSide}>
                            <EditProductCardTags control={formControl} name={'productTags'}/>
                            <EditProductCardStatus control={formControl} name={'product'}/>
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
            </Modal>
        )
    }
}