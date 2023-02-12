import React from 'react';
import {Box, Button, Checkbox, FormControlLabel, Modal, TextField} from "@mui/material";
import useCreateProductModal from "./CreateProductModalStore";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {EnumProductCheckStatus, ICreateProduct, IProduct} from "../../entities";

interface props {
    onSuccess?: (data: IProduct) => void
}

const CreateProductModal = (props: props) => {

    const open = useCreateProductModal(s => s.open)
    const setOpen = useCreateProductModal(s => s.setOpen)
    const create = useCreateProductModal(s => s.create)
    const {control, formState: {errors}, handleSubmit, setValue, setError} = useForm<ICreateProduct>({
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

            setValue('name', '')
            setValue('catalogKey', '')
            setValue('manufacturerBarcode', '')
            setValue('incomePrice', 0)
            setValue('dealerPrice', 0)
            setValue('retailPrice', 0)
            setValue('retailVisibility', false)
            setValue('b2BVisibility', false)
        }).catch(r => {
            setError('name', {type: 'serverError', message: r.response.data.errorDescription.toString()})
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
            <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>

                <Controller
                    name="name"
                    control={control}
                    rules={{required: "Обязательное поле"}}
                    render={({field}: any) =>

                        <TextField {...field} sx={{pb: 3}}
                                   fullWidth={true}
                                   error={!!errors.name?.type}
                                   helperText={errors.name?.message}
                                   label="Название товара"
                                   variant="outlined"/>
                    }/>
                <Controller
                    name="catalogKey"
                    control={control}
                    rules={{required: "Обязательное поле"}}
                    render={({field}: any) =>

                        <TextField {...field} sx={{pb: 3}}
                                   fullWidth={true}
                                   error={!!errors.catalogKey}
                                   label="Каталожный номер"
                                   variant="outlined"/>
                    }/>
                <Controller
                    name="manufacturerBarcode"
                    control={control}
                    rules={{required: "Обязательное поле"}}
                    render={({field}: any) =>

                        <TextField {...field} sx={{pb: 3}}
                                   fullWidth={true}
                                   error={!!errors.manufacturerBarcode}
                                   label="Штрихкод производителя"
                                   variant="outlined"/>
                    }/>
                <Controller
                    name="incomePrice"
                    control={control}
                    rules={{required: "Обязательное поле", validate: (value) => value > 0}}
                    render={({field}: any) =>

                        <TextField {...field} sx={{pb: 3}}
                                   fullWidth={true}
                                   error={!!errors.incomePrice}
                                   label="Цена возможной закупки"
                                   variant="outlined"/>
                    }/>
                <Controller
                    name="dealerPrice"
                    control={control}
                    rules={{required: "Обязательное поле", validate: (value) => value > 0}}
                    render={({field}: any) =>

                        <TextField {...field} sx={{pb: 3}}
                                   fullWidth={true}
                                   error={!!errors.dealerPrice}
                                   label="Оптовая цена"
                                   variant="outlined"/>
                    }/>

                <Controller
                    name="retailPrice"
                    control={control}
                    rules={{required: "Обязательное поле", validate: (value) => value > 0}}
                    render={({field}: any) =>

                        <TextField {...field} sx={{pb: 3}}
                                   fullWidth={true}
                                   error={!!errors.retailPrice}
                                   label="Розничная цена"
                                   variant="outlined"/>
                    }/>
                <Controller
                    name="b2BVisibility"
                    control={control}
                    render={({field}) => (
                        <FormControlLabel
                            label={'Видим в B2B'}
                            value={field.value}
                            control={
                                <Checkbox
                                    value={field.value}
                                    onChange={(event, value) => {
                                        field.onChange(value);
                                    }}/>
                            }/>
                    )}/>
                <Controller
                    name="retailVisibility"
                    control={control}
                    render={({field}) => (
                        <FormControlLabel
                            label={'Видим в интернет-магазине'}
                            value={field.value}
                            control={
                                <Checkbox
                                    value={field.value}
                                    onChange={(event, value) => {
                                        field.onChange(value);
                                    }}/>
                            }/>
                    )}/>
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