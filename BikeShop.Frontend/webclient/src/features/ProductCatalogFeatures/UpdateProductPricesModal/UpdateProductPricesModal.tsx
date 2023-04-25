import React, {useEffect} from 'react'
import s from "./UpdateProductPricesModal.module.scss"
import useUpdateProductPricesModal from "./UpdateProductPricesModalStore"
import {Button, ControlledCustomInput, CustomModal, LoaderScreen} from "../../../shared/ui"
import {useSnackbar} from "notistack"
import {SubmitHandler, useForm} from "react-hook-form"
import {Errors} from "../../../entities/errors/workspaceErrors"
import {Product, UpdateProductPrices} from "../../../entities"

export const UpdateProductPricesModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useUpdateProductPricesModal(s => s.openUpdateProductPricesModal)
    const setOpen = useUpdateProductPricesModal(s => s.setOpenUpdateProductPricesModal)
    const isLoading = useUpdateProductPricesModal(s => s.isLoading)
    const errorStatus = useUpdateProductPricesModal(s => s.errorStatus)

    const product = useUpdateProductPricesModal(s => s.product)
    const updateProductPrices = useUpdateProductPricesModal(s => s.updateProductPrices)

    const formControl = useForm<UpdateProductPrices>({
        defaultValues: {
            productId: product.id,
            incomePrice: product.incomePrice,
            retailPrice: product.retailPrice,
            dealerPrice: product.dealerPrice
        }
    })

    const onSubmit: SubmitHandler<UpdateProductPrices> = (data: UpdateProductPrices) => {
        data.user = 'f82f8597-31c4-4ea7-937c-61234db6ab73'
        // data.user = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        console.log(data)
        updateProductPrices(data)
    }

    useEffect(() => {
        if (errorStatus === 'success') {
            enqueueSnackbar('Операция выполнена', {variant: 'success', autoHideDuration: 3000})
            formControl.reset()
        }
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        formControl.setValue('productId', product.id)
        formControl.setValue('incomePrice', product ? product.incomePrice : 0)
        formControl.setValue('retailPrice', product ? product.retailPrice : 0)
        formControl.setValue('dealerPrice', product ? product.dealerPrice : 0)
    }, [product])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <CustomModal
                open={open}
                onClose={() => {setOpen(false, {} as Product)}}
            >
                <div className={s.changeProductPricesModal_mainBox}>
                    <div className={s.changeProductPricesModal_title}>
                        Изменение цены товара
                    </div>
                    <div className={s.changeProductPricesModal_productInfo}>
                        <div className={s.changeProductPricesModal_productNumber}>
                            Арт.: {product.catalogKey}
                        </div>
                        <div className={s.changeProductPricesModal_productName}>
                            {product.name}
                        </div>
                    </div>

                    <form onSubmit={formControl.handleSubmit(onSubmit)}>
                        <div className={s.formItem}>
                            <div>Оптовая цена</div>
                            <ControlledCustomInput name={'incomePrice'}
                                                   placeholder={'Оптовая цена'}
                                                   control={formControl}
                            />
                        </div>
                        <div className={s.formItem}>
                            <div>Розничная цена</div>
                            <ControlledCustomInput name={'retailPrice'}
                                                   placeholder={'Розничная цена'}
                                                   control={formControl}
                            />
                        </div>
                        <div className={s.formItem}>
                            <div>Закупочная цена</div>
                            <ControlledCustomInput name={'dealerPrice'}
                                                   placeholder={'Закупочная цена'}
                                                   control={formControl}
                            />
                        </div>

                        <div className={s.buttonsBlock}>
                            <Button onClick={() => {setOpen(false, {} as Product)}}
                                    buttonDivWrapper={s.cancelBtn}
                            >
                                Отмена
                            </Button>
                            <Button type={'submit'}
                                    buttonDivWrapper={s.saveBtn}
                            >
                                Сохранить
                            </Button>
                        </div>
                    </form>
                </div>
            </CustomModal>
        )
    }
}