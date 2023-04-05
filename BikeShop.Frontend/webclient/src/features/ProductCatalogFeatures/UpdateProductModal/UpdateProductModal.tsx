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

    const open = useUpdateProductModal(s => s.open)
    const setOpen = useUpdateProductModal(s => s.setOpen)
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
    });

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
        update(data).then((r) => {
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

                <div onSubmit={formControl.handleSubmit(onSubmit)}>
                    <h2>Артикул товара: {product.id}</h2>
                    <br/>

                    <ControlledCustomInput name={'name'}
                                           placeholder={'Название товара'}
                                           control={formControl}
                                           rules={{required: 'Обязательное поле'}}
                    />
                    {/*<Controller*/}
                    {/*    name="name"*/}
                    {/*    control={control}*/}
                    {/*    rules={{required: 'Обязательное поле'}}*/}
                    {/*    render={({field}: any) =>*/}

                    {/*        <TextField {...field} sx={{pb: 3}}*/}
                    {/*                   fullWidth={true}*/}
                    {/*                   error={!!errors.name}*/}
                    {/*                   label="Название товара"*/}
                    {/*                   variant="outlined"*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*/>*/}

                    <ControlledCustomInput name={'manufacturerBarcode'}
                                           placeholder={'Штрихкод производителя'}
                                           control={formControl}
                                           rules={{required: 'Обязательное поле'}}
                    />
                    {/*<Controller*/}
                    {/*    name="manufacturerBarcode"*/}
                    {/*    control={control}*/}
                    {/*    rules={{required: 'Обязательное поле'}}*/}
                    {/*    render={({field}: any) =>*/}

                    {/*        <TextField {...field} sx={{pb: 3}}*/}
                    {/*                   fullWidth={true}*/}
                    {/*                   error={!!errors.manufacturerBarcode}*/}
                    {/*                   label="Штрихкод производителя"*/}
                    {/*                   variant="outlined"*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*/>*/}

                    <ControlledCustomInput name={'b2BVisibility'}
                                           placeholder={'Видим в B2B'}
                                           control={formControl}
                                           rules={{required: 'Обязательное поле'}}
                    />
                    {/*<Controller*/}
                    {/*    name="b2BVisibility"*/}
                    {/*    control={control}*/}
                    {/*    render={({field}) => (*/}

                    {/*        <FormControlLabel*/}
                    {/*            label={'Видим в B2B'}*/}
                    {/*            control={*/}
                    {/*                <Checkbox*/}
                    {/*                    checked={field.value}*/}
                    {/*                    onChange={(event, value) => {*/}
                    {/*                        field.onChange(value);*/}
                    {/*                    }}*/}
                    {/*                />*/}
                    {/*            }*/}
                    {/*        />*/}

                    {/*    )}*/}
                    {/*/>*/}

                    <ControlledCustomCheckbox name={'retailVisibility'}
                                              label={'Видим в интернет-магазине'}
                                              control={formControl}
                                              // divClassName={s.infoBlock_checkbox}
                    />
                    {/*<Controller*/}
                    {/*    name="retailVisibility"*/}
                    {/*    control={control}*/}
                    {/*    render={({field}) => (*/}
                    {/*        */}
                    {/*        <FormControlLabel*/}
                    {/*            label={'Видим в интернет-магазине'}*/}
                    {/*            control={*/}
                    {/*                <Checkbox*/}
                    {/*                    checked={field.value}*/}
                    {/*                    onChange={(event, value) => {*/}
                    {/*                        field.onChange(value);*/}
                    {/*                    }}/>*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*/>*/}

                    <br/>

                    <Button type={'submit'}
                            // buttonDivWrapper={s.infoBlock_cancelBtn}
                    >
                        Обновить информацию о товаре
                    </Button>
                    <Button onClick={() => {setOpen(false, {} as Product)}}
                            // buttonDivWrapper={s.infoBlock_cancelBtn}
                    >
                        Отмена
                    </Button>
                </div>
            </div>
        </CustomModal>
    )
}