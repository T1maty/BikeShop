import React from 'react';
import {Box, Button, Modal} from "@mui/material";
import {ControlledCheckbox, ControlledInput} from "../../../shared/ui";
import {useSnackbar} from "notistack";
import {SubmitHandler, useForm} from "react-hook-form";
import {CreateWorkGroup, Work, Group} from "../../../entities"
import {$api} from "../../../shared";
import {useWorkCatalog} from "../../../widgets/workspace/WorkCatalog/TableCatalogStore";

export const CreateWorkGroupModal = (props: { visibility: boolean, setVisibility: (value: boolean) => void, parent: Group }) => {

    const {enqueueSnackbar} = useSnackbar()
    const {addGroup} = useWorkCatalog(s => s)

    const formControl = useForm<CreateWorkGroup>({
        defaultValues: {
            name: '',
            parentId: 0,
            shopId: 1,
            isCollapsed: false
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
    };

    const onSubmit: SubmitHandler<CreateWorkGroup> = (data: CreateWorkGroup) => {
        data.parentId = props.parent.id
        console.log('submitData', data)

        $api.post<Group>('/group/create', data).then((r) => {
            formControl.reset()
            props.setVisibility(false)
            addGroup(r.data)
            enqueueSnackbar('Группа создана', {variant: 'success', autoHideDuration: 10000})
        }).catch((r) => {
            console.log(r)
            enqueueSnackbar('Ошибка создания', {variant: 'error', autoHideDuration: 10000})
        })
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

                <div>
                    {props.parent.name != undefined ? 'Создаем потомка для ' + props.parent.name : "Создаем в корне"}
                </div>
                <ControlledInput name={"name"} label={"Название группы"} control={formControl}
                                 rules={{required: "Обязательное поле"}}/>

                <ControlledCheckbox name={"isCollapsed"} label={"Свернут по умолчанию"} control={formControl}/>

                <br/>
                <Button color={'primary'} type={'submit'}>Создать группу</Button>
                <Button color={'primary'} onClick={() => {
                    props.setVisibility(false)
                }}>Отмена</Button>
            </Box>
        </Modal>
    )
}