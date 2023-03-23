import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {CreateWork} from "../../../entities";
import {Box, Button, Modal} from "@mui/material";
import {ControlledInput} from "../../../shared/ui";
import {$api} from "../../../shared";
import {useSnackbar} from "notistack";
import {useWorkCatalog} from "../../../widgets/workspace/WorkCatalog/TableCatalogStore";

export const CreateWorkModal = (props: { visibility: boolean, setVisibility: (value: boolean) => void }) => {

    const selected = useWorkCatalog(s => s.selected)

    const {enqueueSnackbar} = useSnackbar()
    const formControl = useForm<CreateWork>({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            currencyId: 1,
            groupId: 1
        }
    });

    const onSubmit: SubmitHandler<CreateWork> = (data: CreateWork) => {

        data.groupId = selected
        console.log('submitData', data)

        $api.post('/work/create', data).then((r) => {
            formControl.reset()
            enqueueSnackbar('Услуга создана', {variant: 'success', autoHideDuration: 10000})
        }).catch((r) => {
            console.log(r)
            enqueueSnackbar('Ошибка создания', {variant: 'error', autoHideDuration: 10000})
        })
    };

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
    };

    return (
        <Modal
            open={props.visibility}
            onClose={() => {
                props.setVisibility(false)
            }}
            onContextMenu={(event) => {
                event.preventDefault()
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={formControl.handleSubmit(onSubmit)}>

                <ControlledInput name={"name"} label={"Название услуги"} control={formControl}
                                 rules={{required: "Обязательное поле"}}/>

                <ControlledInput name={"description"} label={"Описание"} control={formControl}
                                 rules={{required: "Обязательное поле"}}/>

                <ControlledInput name={"price"} label={"Цена"} control={formControl}
                                 rules={{required: "Обязательное поле", validate: (value: number) => value > 0}}/>

                <br/>
                <Button color={'primary'} type={'submit'}>Создать товар</Button>
                <Button color={'primary'} onClick={() => {
                    props.setVisibility(false)
                }}>Отмена</Button>
            </Box>
        </Modal>
    );
};