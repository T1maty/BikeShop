import React from 'react';
import {Box, Button, Checkbox, FormControlLabel, Modal, TextField} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IProduct, IUpdateProduct} from "../../entities";
import {useUpdateProductModal} from "./UpdateProductModalStore";

interface props {
    onSuccess?: (updateData: IUpdateProduct) => void
}

export const UpdateProductModal = (props: props) => {

    const open = useUpdateProductModal(s => s.open)
    const product = useUpdateProductModal(s => s.product)
    const setOpen = useUpdateProductModal(s => s.setOpen)
    const update = useUpdateProductModal(s => s.update)

    const {control, formState: {errors}, handleSubmit, setValue} = useForm<IUpdateProduct>({
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

    React.useEffect(() => {
        setValue('id', product.id)
        setValue('name', product.name)
        setValue('catalogKey', product.catalogKey)
        setValue('category', product.category)
        setValue('manufacturerBarcode', product.manufacturerBarcode)
        setValue('incomePrice', product.incomePrice)
        setValue('dealerPrice', product.dealerPrice)
        setValue('retailPrice', product.retailPrice)
        setValue('brandId', product.brandId)
        setValue('checkStatus', product.checkStatus)
        setValue('retailVisibility', product.retailVisibility)
        setValue('b2BVisibility', product.b2BVisibility)
    }, [product])


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


    const onSubmit: SubmitHandler<IUpdateProduct> = (data: IUpdateProduct) => {
        update(data).then((r) => {
            setOpen(false, {} as IProduct)
            props.onSuccess ? props.onSuccess(data) : true
        }).catch((r => {

        }))
    };

    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false, {} as IProduct)
            }}
            onContextMenu={(event) => {
                event.preventDefault()
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>

                <h2>Артикул товара: {product.id}</h2>
                <br/>
                <Controller
                    name="name"
                    control={control}
                    rules={{required: "Обязательное поле"}}
                    render={({field}: any) =>

                        <TextField {...field} sx={{pb: 3}}
                                   fullWidth={true}
                                   error={!!errors.name}
                                   label="Название товара"
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
                    name="b2BVisibility"
                    control={control}
                    render={({field}) => (
                        <FormControlLabel
                            label={'Видим в B2B'}
                            control={
                                <Checkbox
                                    checked={field.value}
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
                            control={
                                <Checkbox
                                    checked={field.value}
                                    onChange={(event, value) => {
                                        field.onChange(value);
                                    }}/>
                            }/>
                    )}/>
                <br/>
                <Button color={'primary'} type={'submit'}>Обновить информацию о товаре</Button>
                <Button color={'primary'} onClick={() => {
                    setOpen(false, {} as IProduct)
                }}>Отмена</Button>
            </Box>
        </Modal>
    );
};