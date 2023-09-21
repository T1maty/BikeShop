import React, {useEffect, useState} from 'react'
import s from './EditProductCardModal.module.scss'
import useEditProductCardModal from './EditProductCardModalStore'
import {useSnackbar} from 'notistack'
import {CustomModal, LoaderScreen} from '../../../shared/ui'
import {EditProductCardGallery} from './EditProductCardGallery'
import {EditProductCardStatus} from './EditProductCardStatus'
import {ProductFullData, ProductImage} from '../../../entities'
import {EditProductCardDescriptionFull} from './EditProductCardDescriptionFull'
import {EditProductCardOptionBind} from './EditProductCardOptionBind'
import {EditProductCardMainButtons} from './EditProductCardMainButtons'

export const EditProductCardModal = (p: { onUpd?: (p: ProductFullData) => void }) => {

    const {enqueueSnackbar} = useSnackbar()

    const [images, setImages] = useState<ProductImage[]>([])

    const open = useEditProductCardModal(s => s.openEditProductCardModal)
    const setOpen = useEditProductCardModal(s => s.setOpenEditProductCardModal)
    const isLoading = useEditProductCardModal(s => s.isLoading)
    const errorStatus = useEditProductCardModal(s => s.errorStatus)
    const currentProduct = useEditProductCardModal(s => s.currentProduct)
    const getAllOptions = useEditProductCardModal(s => s.getAllOptions)

    useEffect(() => {
        open ? getAllOptions() : null
        setImages(currentProduct.productImages)
    }, [open])

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
                onClose={() => {
                    setOpen(false)
                }}
            >

                <div className={s.editProductCardModal}>

                    <div className={s.editProductCardModal_mainBlock}>
                        <div className={s.editProductCardModal_header}>
                            <div className={s.productInfo}>
                                Product Info
                            </div>
                            <EditProductCardStatus name={'checkStatus'}/>
                            <EditProductCardMainButtons setOpen={setOpen} onUpd={(prod) => {
                                p.onUpd ? p.onUpd(prod) : null
                            }}/>
                        </div>

                        <div className={s.editProductCardModal_scrollContainer}>
                            <div className={s.optionBind_wrapper}>
                                <EditProductCardOptionBind product={currentProduct}
                                                           images={images}
                                                           setImages={setImages}
                                />
                            </div>
                            <div className={s.imageGallery}>
                                <EditProductCardGallery images={images} setImages={setImages}/>
                            </div>
                            <div className={s.fullEditor}>
                                <EditProductCardDescriptionFull/>
                            </div>

                        </div>
                    </div>
                </div>

            </CustomModal>
        )
    }
}