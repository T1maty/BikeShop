import React, {useEffect} from 'react'
import s from "./UpdateProductPricesModal.module.scss"
import useUpdateProductPricesModal from "./UpdateProductPricesModalStore"
import {Button, ControlledCustomInput, CustomModal, LoaderScreen} from "../../../shared/ui"
import {useSnackbar} from "notistack"
import {SubmitHandler, useForm} from "react-hook-form"
import {Product, UpdateProductPrices, useAuth, useCurrency} from "../../../entities"

export const UpdateProductPricesModal = (props: { onSuccess?: (p: Product) => void }) => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useUpdateProductPricesModal(s => s.openUpdateProductPricesModal)
    const setOpen = useUpdateProductPricesModal(s => s.setOpenUpdateProductPricesModal)
    const isLoading = useUpdateProductPricesModal(s => s.isLoading)
    const errorStatus = useUpdateProductPricesModal(s => s.errorStatus)

    const user = useAuth(s => s.user)

    const product = useUpdateProductPricesModal(s => s.product)
    const updateProductPrices = useUpdateProductPricesModal(s => s.updateProductPrices)

    const fstb = useCurrency(s => s.fromSelectedToBase)
    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)

    const formControl = useForm<UpdateProductPrices>({
        defaultValues: {
            productId: product.id,
            incomePrice: product.incomePrice,
            retailPrice: product.retailPrice,
            dealerPrice: product.dealerPrice
        }
    })

    const onSubmit: SubmitHandler<UpdateProductPrices> = (data: UpdateProductPrices) => {
        data.user = user!.id
        data.dealerPrice = data.dealerPrice * fstb.c
        data.incomePrice = data.incomePrice * fstb.c
        data.retailPrice = data.retailPrice * fstb.c
        console.log('изменение цены', data)
        updateProductPrices(data, (p) => {
            props.onSuccess ? props.onSuccess(p) : null
        })
        setOpen(false, {} as Product)
    }

    useEffect(() => {
        if (errorStatus === 'success') {
            enqueueSnackbar('Операция выполнена', {variant: 'success', autoHideDuration: 3000})
            // formControl.reset()
        }
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        formControl.setValue('productId', product.id)
        formControl.setValue('incomePrice', product ? parseFloat(r(product.incomePrice * fbts.c)) : 0)
        formControl.setValue('retailPrice', product ? parseFloat(r(product.retailPrice * fbts.c)) : 0)
        formControl.setValue('dealerPrice', product ? parseFloat(r(product.dealerPrice * fbts.c)) : 0)
    }, [product])

    // useEffect(() => {
    //     getProductByTag()
    // }, [product])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <CustomModal
                open={open}
                onClose={() => {
                    setOpen(false, {} as Product)
                }}
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
                            <div>Цена закупки</div>
                            <ControlledCustomInput name={'incomePrice'}
                                                   placeholder={'Цена закупки'}
                                                   control={formControl}
                            />
                        </div>

                        <div className={s.formItem}>
                            <div>Диллерская цена</div>
                            <ControlledCustomInput name={'dealerPrice'}
                                                   placeholder={'Диллерская цена'}
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

                        <div className={s.buttonsBlock}>
                            <Button onClick={() => {
                                setOpen(false, {} as Product)
                            }}
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