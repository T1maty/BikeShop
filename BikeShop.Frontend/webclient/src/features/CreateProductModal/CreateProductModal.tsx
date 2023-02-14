import React from 'react';
import {Box, Button, Modal} from "@mui/material";
import useCreateProductModal from "./CreateProductModalStore";
import {SubmitHandler, useForm} from "react-hook-form";
import {EnumProductCheckStatus, ICreateProduct, IProduct} from "../../entities";
import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";
import {ControlledCheckbox, ControlledInput} from "../../shared/ui";

interface props {
    onSuccess?: (data: IProduct) => void
}

const CreateProductModal = (props: props) => {
    const error = useTranslation('errors').t

    const {enqueueSnackbar} = useSnackbar();
    const open = useCreateProductModal(s => s.open)
    const setOpen = useCreateProductModal(s => s.setOpen)
    const create = useCreateProductModal(s => s.create)
    const formControl = useForm<ICreateProduct>({
        defaultValues: {
            name: "",
            catalogKey: "",
            category: "cat",
            manufacturerBarcode: "",
            incomePrice: 0,
            dealerPrice: 0,
            retailPrice: 0,
            brandId: 1,
            checkStatus: EnumProductCheckStatus.justCreatedByUser,
            retailVisibility: false,
            b2BVisibility: false,
            tagsIds: [1]
        }
    });

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#33373B',

        boxShadow: 24,
        p: 4,
        borderRadius: 10,
    };

    const onSubmit: SubmitHandler<ICreateProduct> = (data: ICreateProduct) => {
        create(data).then((r) => {
            setOpen(false)
            props.onSuccess ? props.onSuccess(r.data) : true

            formControl.setValue('name', '')
            formControl.setValue('catalogKey', '')
            formControl.setValue('manufacturerBarcode', '')
            formControl.setValue('incomePrice', 0)
            formControl.setValue('dealerPrice', 0)
            formControl.setValue('retailPrice', 0)
            formControl.setValue('retailVisibility', false)
            formControl.setValue('b2BVisibility', false)

            enqueueSnackbar('Товар добавлен', {variant: 'success', autoHideDuration: 10000})
        }).catch(r => {
            let message = error(r.response.data.errorDescription).toString()
            formControl.setError('manufacturerBarcode', {type: 'serverError', message: message})
            enqueueSnackbar(message, {variant: 'error', autoHideDuration: 10000})
            console.error(r.response.data)
        })

    };

    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            onContextMenu={(event) => {
                event.preventDefault()
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={formControl.handleSubmit(onSubmit)}>

                <ControlledInput name={"name"} lable={"Название товара"} control={formControl}
                                 rules={{required: "Обязательное поле"}}/>

                <ControlledInput name={"catalogKey"} lable={"Каталожный номер"} control={formControl}
                                 rules={{required: "Обязательное поле"}}/>

                <ControlledInput name={"manufacturerBarcode"} lable={"Штрихкод производителя"} control={formControl}
                                 rules={{required: "Обязательное поле"}}/>

                <ControlledInput name={"incomePrice"} lable={"Цена возможной закупки"} control={formControl}
                                 rules={{required: "Обязательное поле", validate: (value: number) => value > 0}}/>

                <ControlledInput name={"dealerPrice"} lable={"Оптовая цена"} control={formControl}
                                 rules={{required: "Обязательное поле", validate: (value: number) => value > 0}}/>

                <ControlledInput name={"retailPrice"} lable={"Розничная цена"} control={formControl}
                                 rules={{required: "Обязательное поле", validate: (value: number) => value > 0}}/>

                <ControlledCheckbox name={"b2BVisibility"} lable={'Видим в B2B'} control={formControl}/>
                <ControlledCheckbox name={"retailVisibility"} lable={'Видим в интернет-магазине'}
                                    control={formControl}/>

                <br/>
                <Button color={'primary'} type={'submit'}>Создать товар</Button>
                <Button color={'primary'} onClick={() => {
                    setOpen(false)
                }}>Отмена</Button>
            </Box>
        </Modal>
    );
};

export default CreateProductModal;