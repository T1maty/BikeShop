import React from 'react';
import {Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography} from "@mui/material";
import {useCreateTagModal} from "../index";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {ICreateTag} from "../../entities";

const CreateTagModal = () => {
    const open = useCreateTagModal(s => s.createTagModal)
    const setOpen = useCreateTagModal(s => s.setCreateTagModal)
    const parentNode = useCreateTagModal(s => s.parentNode)
    const createTag = useCreateTagModal(s => s.createTag)

    const {control, formState: {errors}, handleSubmit} = useForm<ICreateTag>({
        defaultValues: {
            name: "",
            sortOrder: 0
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


    const onSubmit: SubmitHandler<ICreateTag> = (data: ICreateTag) => {
        console.log(data)
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
                <Typography sx={{pb: 3}}>Добавить
                    в: {parentNode.id === '0' ? 'КОРЕНЬ ДЕРЕВА' : parentNode.name}</Typography>

                <Controller
                    name="name"
                    control={control}
                    rules={{required: "Password is required"}}
                    render={({field}: any) =>

                        <TextField {...field} sx={{pb: 3}}
                                   fullWidth={true}
                                   error={!!errors.name}
                                   label="Название тега"
                                   variant="outlined"/>
                    }/>

                <Controller
                    name="sortOrder"
                    control={control}
                    rules={{required: "Password is required"}}
                    render={({field}: any) =>

                        <TextField {...field} sx={{pb: 3}}
                                   fullWidth={true}
                                   label="Порядок сортировки"
                                   variant="outlined"
                                   error={!!errors.sortOrder}/>
                    }/>

                <br/>
                <FormControlLabel sx={{pb: 3}} control={<Checkbox/>} label="Видим в интернет-магазине"/>
                <br/>
                <FormControlLabel sx={{pb: 3}} control={<Checkbox/>} label="Виден в B2B"/>
                <br/>
                <FormControlLabel sx={{pb: 3}} control={<Checkbox/>} label="Универсальный тег"/>
                <br/>
                <Button color='primary' type="submit">Создать тег</Button>
            </Box>
        </Modal>
    );
};

export default CreateTagModal;