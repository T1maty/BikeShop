import React, {useEffect} from 'react'
import s from "./UpdateProductPricesModal.module.scss"
import useUpdateProductPricesModal from "./UpdateProductPricesModalStore"
import {Button, ControlledCustomInput, CustomModal, LoaderScreen} from "../../../shared/ui"
import {useSnackbar} from "notistack"
import {SubmitHandler, useForm} from "react-hook-form"
import {Errors} from "../../../entities/errors/workspaceErrors"
import {UpdateProductPrices} from "../../../entities"

export const UpdateProductPricesModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useUpdateProductPricesModal(s => s.openUpdateProductPricesModal)
    const setOpen = useUpdateProductPricesModal(s => s.setOpenUpdateProductPricesModal)
    const isLoading = useUpdateProductPricesModal(s => s.isLoading)
    const errorStatus = useUpdateProductPricesModal(s => s.errorStatus)
    const updateProductPrices = useUpdateProductPricesModal(s => s.updateProductPrices)

    const formControl = useForm<UpdateProductPrices>({
        defaultValues: {
            incomePrice: 0,
            retailPrice: 0,
            dealerPrice: 0
        }
    })

    const onSubmit: SubmitHandler<UpdateProductPrices> = (data: UpdateProductPrices) => {
        // data.productId = 1
        // data.user = 'f82f8597-31c4-4ea7-937c-61234db6ab73'
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

    // useEffect(() => {
    //     formControl.reset()
    //     formControl.setValue('incomePrice', currentProduct ? currentProduct.incomePrice : 0)
    //     formControl.setValue('retailPrice', currentProduct ? currentProduct.retailPrice : 0)
    //     formControl.setValue('dealerPrice', currentProduct ? currentProduct.dealerPrice : 0)
    // }, [currentProduct])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <CustomModal
                open={open}
                onClose={() => {setOpen(false)}}
            >
                <div className={s.changeProductPricesModal_mainBox}>
                    <div className={s.changeProductPricesModal_title}>
                        Изменение цены товара
                    </div>
                    <div className={s.changeProductPricesModal_productInfo}>
                        <div className={s.changeProductPricesModal_productNumber}>
                            Арт.: 121221221
                        </div>
                        <div className={s.changeProductPricesModal_productName}>
                            Название товара
                        </div>
                    </div>

                    <form onSubmit={formControl.handleSubmit(onSubmit)}>
                        <div className={s.formItem}>
                            <div>Оптовая цена</div>
                            <ControlledCustomInput name={'incomePrice'}
                                                   placeholder={'Оптовая цена'}
                                                   control={formControl}
                                // rules={{required: Errors[0].name}}
                            />
                        </div>
                        <div className={s.formItem}>
                            <div>Розничная цена</div>
                            <ControlledCustomInput name={'retailPrice'}
                                                   placeholder={'Розничная цена'}
                                                   control={formControl}
                                // rules={{required: Errors[0].name}}
                            />
                        </div>
                        <div className={s.formItem}>
                            <div>Закупочная цена</div>
                            <ControlledCustomInput name={'dealerPrice'}
                                                   placeholder={'Закупочная цена'}
                                                   control={formControl}
                                // rules={{required: Errors[0].name}}
                            />
                        </div>

                        <div className={s.buttonsBlock}>
                            <Button onClick={() => {
                            }} buttonDivWrapper={s.cancelBtn}>
                                Отмена
                            </Button>
                            <Button type={'submit'} buttonDivWrapper={s.saveBtn}>
                                Сохранить
                            </Button>
                        </div>
                    </form>
                </div>
            </CustomModal>
        )
    }
}