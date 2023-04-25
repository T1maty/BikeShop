import React, {useEffect} from 'react'
import s from './UpdateProductModal.module.scss'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Product, UpdateProduct} from '../../../entities'
import useUpdateProductModal from './UpdateProductModalStore'
import {Button, ControlledCustomCheckbox, ControlledCustomInput, CustomModal} from '../../../shared/ui'

interface UpdateProductModalProps {
    onSuccess?: (updateData: UpdateProduct) => void
}

export const UpdateProductModal = (props: UpdateProductModalProps) => {

    const open = useUpdateProductModal(s => s.openUpdateProductModal)
    const setOpen = useUpdateProductModal(s => s.setOpenUpdateProductModal)
    const product = useUpdateProductModal(s => s.product)
    const update = useUpdateProductModal(s => s.update)

    const formControl = useForm<UpdateProduct>({
        defaultValues: {
            id: product.id,
            name: product.name,
            catalogKey: product.catalogKey,
            category: product.category,
            manufacturerBarcode: product.manufacturerBarcode,
            incomePrice: product.incomePrice,
            dealerPrice: product.dealerPrice,
            retailPrice: product.retailPrice,
            brandId: product.brandId,
            checkStatus: product.checkStatus,
            retailVisibility: product.retailVisibility,
            b2BVisibility: product.b2BVisibility
        }
    })

    useEffect(() => {
        formControl.setValue('id', product.id)
        formControl.setValue('name', product.name)
        formControl.setValue('catalogKey', product.catalogKey)
        formControl.setValue('category', product.category)
        formControl.setValue('manufacturerBarcode', product.manufacturerBarcode)
        formControl.setValue('incomePrice', product.incomePrice)
        formControl.setValue('dealerPrice', product.dealerPrice)
        formControl.setValue('retailPrice', product.retailPrice)
        formControl.setValue('brandId', product.brandId)
        formControl.setValue('checkStatus', product.checkStatus)
        formControl.setValue('retailVisibility', product.retailVisibility)
        formControl.setValue('b2BVisibility', product.b2BVisibility)
    }, [product])

    const onSubmit: SubmitHandler<UpdateProduct> = (data: UpdateProduct) => {
        console.log(data)
        update(data).then((r) => {
            console.log(r)
            setOpen(false, {} as Product)
            props.onSuccess ? props.onSuccess(data) : true
        }).catch((error => {
            console.log(error)
        }))
    }

    return (
        <CustomModal
            open={open}
            onClose={() => {setOpen(false, {} as Product)}}
            onContextMenu={(event) => {event.preventDefault()}}
        >
            <div className={s.updateProductModal_mainBox}>
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <div className={s.updateProductModal_inputs}>
                        <div>
                            Артикул товара: {product.id}
                        </div>
                        <ControlledCustomInput name={'name'}
                                               placeholder={'Название товара'}
                                               control={formControl}
                                               rules={{required: 'Обязательное поле'}}
                        />
                        <ControlledCustomInput name={'manufacturerBarcode'}
                                               placeholder={'Штрихкод производителя'}
                                               control={formControl}
                                               rules={{required: 'Обязательное поле'}}
                        />
                        <ControlledCustomInput name={'b2BVisibility'}
                                               placeholder={'Видим в B2B'}
                                               control={formControl}
                                               rules={{required: 'Обязательное поле'}}
                        />
                        <ControlledCustomCheckbox name={'retailVisibility'}
                                                  label={'Видим в интернет-магазине'}
                                                  control={formControl}
                        />
                    </div>
                    <div className={s.updateProductModal_buttons}>
                        <Button onClick={() => {
                            setOpen(false, {} as Product)
                        }}>
                            Отмена
                        </Button>
                        <Button type={'submit'}>
                            Обновить информацию
                        </Button>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}