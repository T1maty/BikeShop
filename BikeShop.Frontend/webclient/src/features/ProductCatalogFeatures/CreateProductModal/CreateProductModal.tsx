import React from 'react'
import s from './CreateProductModal.module.scss'
import useCreateProductModal from './CreateProductModalStore'
import {SubmitHandler, useForm} from 'react-hook-form'
import {CreateProduct, LocalStorage, Product, useCurrency} from '../../../entities'
import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {Button, ControlledCustomCheckbox, ControlledCustomInput, CustomModal} from '../../../shared/ui'

interface CreateProductModalProps {
    onSuccess?: (data: Product) => void
}

export const CreateProductModal = (props: CreateProductModalProps) => {

    const {enqueueSnackbar} = useSnackbar()

    const error = useTranslation('errors').t

    const open = useCreateProductModal(s => s.open)
    const setOpen = useCreateProductModal(s => s.setOpen)
    const create = useCreateProductModal(s => s.create)
    const tags = useCreateProductModal(s => s.tags)

    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)

    const formControl = useForm<CreateProduct>({
        defaultValues: {
            name: '',
            catalogKey: '',
            category: '',
            manufacturerBarcode: '',
            incomePrice: 0,
            dealerPrice: 0,
            retailPrice: 0,
            retailVisibility: false,
            b2BVisibility: false,
            tagId: null,
            quantityUnitId: 1,
            user: LocalStorage.userId()!
        }
    })

    const onSubmit: SubmitHandler<CreateProduct> = (data: CreateProduct) => {

        data.tagId = tags[0].id
        data.dealerPrice = data.dealerPrice * fstb.c
        data.retailPrice = data.retailPrice * fstb.c
        data.incomePrice = data.incomePrice * fstb.c
        create(data).then((r) => {
            setOpen(false)
            props.onSuccess ? props.onSuccess(r.data) : true
            formControl.reset()

            enqueueSnackbar('Товар добавлен', {variant: 'success', autoHideDuration: 10000})
        }).catch(r => {
            let message = error(r.response.data.errorDescription).toString()
            formControl.setError(r.response.data.reasonField, {type: 'serverError', message: message})
            enqueueSnackbar(message, {variant: 'error', autoHideDuration: 10000})
            console.error(r.response.data)
        })
    }

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            onContextMenu={(event) => {
                event.preventDefault()
            }}
        >
            <div className={s.createProductModal_mainBox}>
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <div className={s.createProductModal_inputs}>
                        <div>
                            {
                                tags.map((n) => {
                                    return n.id + " " + n.name + " | "
                                })
                            }
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
                                               placeholder={'Штрих-код производителя'}
                                               control={formControl}
                        />
                        <ControlledCustomInput name={'incomePrice'}
                                               placeholder={'Цена возможной закупки'}
                                               control={formControl}
                                               rules={{required: 'Обязательное поле'}}
                        />{fstb.s}
                        <ControlledCustomInput name={'dealerPrice'}
                                               placeholder={'Оптовая цена'}
                                               control={formControl}
                                               rules={{required: 'Обязательное поле'}}
                        />{fstb.s}
                        <ControlledCustomInput name={'retailPrice'}
                                               placeholder={'Розничная цена'}
                                               control={formControl}
                                               rules={{required: 'Обязательное поле'}}
                        />{fstb.s}
                        <ControlledCustomCheckbox name={'b2BVisibility'}
                                                  label={'Видим в B2B'}
                                                  control={formControl}
                        />
                        <ControlledCustomCheckbox name={'retailVisibility'}
                                                  label={'Видим в интернет-магазине'}
                                                  control={formControl}
                        />
                    </div>

                    <div className={s.createProductModal_buttons}>
                        <Button onClick={() => {
                            setOpen(false)
                        }}>
                            Отмена
                        </Button>
                        <Button type={'submit'}>
                            Создать товар
                        </Button>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}