import React, {useEffect} from 'react'
import s from './UpdateProductModal.module.scss'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Product, UpdateProduct} from '../../../entities'
import useUpdateProductModal from './UpdateProductModalStore'
import {Button, ControlledCustomCheckbox, ControlledCustomInput, CustomModal} from '../../../shared/ui'
import {useSnackbar} from "notistack";

interface UpdateProductModalProps {
    onSuccess?: (updateData: UpdateProduct) => void
}

export const UpdateProductModal = (props: UpdateProductModalProps) => {
    const {enqueueSnackbar} = useSnackbar()

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
        formControl.setValue('retailVisibility', product.retailVisibility)
        formControl.setValue('b2BVisibility', product.b2BVisibility)
    }, [product])

    const onSubmit: SubmitHandler<UpdateProduct> = (data: UpdateProduct) => {
        console.log(data)
        update(data).then((r) => {
            console.log(r)
            setOpen(false, {} as Product)
            props.onSuccess ? props.onSuccess(data) : true
            enqueueSnackbar('Товар успешно обновлен', {variant: 'success', autoHideDuration: 3000})
            formControl.reset()
        }).catch((error => {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
            console.log(error)
        }))
    }

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false, {} as Product)
            }}
            onContextMenu={(event) => {
                event.preventDefault()
            }}
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
                        <ControlledCustomInput name={'catalogKey'}
                                               placeholder={'Каталожный номер'}
                                               control={formControl}
                                               rules={{required: 'Обязательное поле'}}
                        />
                        <ControlledCustomInput name={'category'}
                                               placeholder={'Категория'}
                                               control={formControl}
                        />
                        <ControlledCustomInput name={'manufacturerBarcode'}
                                               placeholder={'Штрихкод производителя'}
                                               control={formControl}
                        />
                        <ControlledCustomCheckbox name={'b2BVisibility'}
                                                  label={'Видим в B2B'}
                                                  control={formControl}
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