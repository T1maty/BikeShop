import React from 'react'
import {Box, Modal, Typography} from "@mui/material"
import useCreateProductModal from "./CreateProductModalStore"
import {SubmitHandler, useForm} from "react-hook-form"
import {EnumProductCheckStatus, CreateProduct, Product} from "../../../entities"
import {useSnackbar} from "notistack"
import {useTranslation} from "react-i18next"
import {Button, ControlledCustomCheckbox, ControlledCustomInput} from '../../../shared/ui'

interface CreateProductModalProps {
    onSuccess?: (data: Product) => void
}

export const CreateProductModal = (props: CreateProductModalProps) => {
    const error = useTranslation('errors').t

    const {enqueueSnackbar} = useSnackbar()
    const open = useCreateProductModal(s => s.open)
    const setOpen = useCreateProductModal(s => s.setOpen)
    const create = useCreateProductModal(s => s.create)
    const tags = useCreateProductModal(s => s.tags)

    const formControl = useForm<CreateProduct>({
        defaultValues: {
            name: '',
            catalogKey: '',
            category: 'cat',
            manufacturerBarcode: '',
            incomePrice: 0,
            dealerPrice: 0,
            retailPrice: 0,
            brandId: 1,
            checkStatus: EnumProductCheckStatus.justCreatedByUser,
            retailVisibility: false,
            b2BVisibility: false,
            tagsIds: ['0']
        }
    });

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: '#33373B',

        boxShadow: 24,
        p: 4,
        borderRadius: 10,
        color: 'white'
    }

    const onSubmit: SubmitHandler<CreateProduct> = (data: CreateProduct) => {
        if (tags.length > 0) {
            data.tagsIds = tags.map((n) => {
                return n.id
            })
        }

        create(data).then((r) => {
            setOpen(false)
            props.onSuccess ? props.onSuccess(r.data) : true
            formControl.reset()

            enqueueSnackbar('Товар добавлен', {variant: 'success', autoHideDuration: 10000})
        }).catch(r => {
            let message = error(r.response.data.errorDescription).toString()
            formControl.setError('manufacturerBarcode', {type: 'serverError', message: message})
            enqueueSnackbar(message, {variant: 'error', autoHideDuration: 10000})
            console.error(r.response.data)
        })

    }

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            onContextMenu={(event) => {event.preventDefault()}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={formControl.handleSubmit(onSubmit)}>
                <Typography>
                    {
                        tags.map((n) => {
                            return n.id + ' '
                        })
                    }
                </Typography>
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
                <ControlledCustomInput name={'manufacturerBarcode'}
                                       placeholder={'Штрих-код производителя'}
                                       control={formControl}
                                       rules={{required: 'Обязательное поле'}}
                />
                <ControlledCustomInput name={'incomePrice'}
                                       placeholder={'Цена возможной закупки'}
                                       control={formControl}
                                       rules={{required: 'Обязательное поле'}}
                />
                <ControlledCustomInput name={'dealerPrice'}
                                       placeholder={'Оптовая цена'}
                                       control={formControl}
                                       rules={{required: 'Обязательное поле'}}
                />
                <ControlledCustomInput name={'retailPrice'}
                                       placeholder={'Розничная цена'}
                                       control={formControl}
                                       rules={{required: 'Обязательное поле'}}
                />
                <ControlledCustomCheckbox name={'b2BVisibility'}
                                          label={'Видим в B2B'}
                                          control={formControl}
                                          // divClassName={s.infoBlock_checkbox}
                />
                <ControlledCustomCheckbox name={'retailVisibility'}
                                          label={'Видим в интернет-магазине'}
                                          control={formControl}
                                          // divClassName={s.infoBlock_checkbox}
                />
                <br/>
                <Button type={'submit'}
                        // buttonDivWrapper={s.infoBlock_cancelBtn}
                >
                    Создать товар
                </Button>
                <Button onClick={() => {setOpen(false)}}
                        // buttonDivWrapper={s.infoBlock_cancelBtn}
                >
                    Отмена
                </Button>
            </Box>
        </Modal>
    )
}