import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {ICreateTag, IProductTag} from "../../entities";
import {Box, Button, Modal, Typography} from "@mui/material";
import {ControlledCheckbox, ControlledInput} from "../../shared/ui";
import {useUpdateTagModal} from "./UpdateTagModalStore";

interface props {
    onSeccuss?: (tag: IProductTag) => void
}

const UpdateTagModal = (props: props) => {
    const open = useUpdateTagModal(s => s.open)
    const setOpen = useUpdateTagModal(s => s.openTagModal)
    const tag = useUpdateTagModal(s => s.targetTag)
    const setClose = useUpdateTagModal(s => s.closeTagModal)


    const control = useForm<ICreateTag>({
        defaultValues: {
            name: "",
            sortOrder: 0,
            isRetailVisible: false,
            isB2BVisible: false,
            isUniversal: false
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
        setClose()
        //props.onSeccuss ? props.onSeccuss(r.data) : true

        control.setValue('name', '')
        control.setValue('sortOrder', 0)
        control.setValue('isRetailVisible', false)
        control.setValue('isB2BVisible', false)
        control.setValue('isUniversal', false)
    };

    return (
        <Modal
            open={open}
            onClose={() => {
                setClose()
            }}
            onContextMenu={(event) => {
                event.preventDefault()
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={control.handleSubmit(onSubmit)}>

                <Typography
                    sx={{pb: 3}}>ID: {tag.id}</Typography>

                <ControlledInput name={"name"} label={"Название тега"} control={control}
                                 rules={{required: "Введите название нового тега"}}/>
                <br/>
                <br/>
                <ControlledInput name={"sortOrder"} label={"Порядок сортировки"} control={control}
                                 rules={{
                                     required: "Порядок сортировки необходимо ввести",
                                     validate: (value: number) => value > -1
                                 }}/>

                <ControlledCheckbox name={"isRetailVisible"} lable={'Видим в интернет-магазине'} control={control}/>
                <ControlledCheckbox name={"isB2BVisible"} lable={'Виден в B2B'} control={control}/>
                <ControlledCheckbox name={"isUniversal"} lable={'Универсальный тег'} control={control}/>
                <br/>
                <Button color='primary' type="submit">Создать тег</Button>

            </Box>
        </Modal>
    );
};

export default UpdateTagModal;