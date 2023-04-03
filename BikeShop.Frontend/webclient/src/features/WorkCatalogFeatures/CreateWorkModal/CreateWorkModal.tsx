import React from 'react'
import {SubmitHandler, useForm} from "react-hook-form"
import {CreateWork, Work} from "../../../entities"
import {Box, Modal} from "@mui/material"
import {ControlledCustomInput, Button} from '../../../shared/ui'
import {$api} from "../../../shared"
import {useSnackbar} from "notistack"
import {useWorkCatalog} from "../../../widgets/workspace/WorkCatalog/TableCatalogStore"

interface CreateWorkModalProps {
    visibility: boolean
    setVisibility: (value: boolean) => void
}

export const CreateWorkModal = (props: CreateWorkModalProps) => {

    const {enqueueSnackbar} = useSnackbar()

    const selected = useWorkCatalog(s => s.selected)
    const addWork = useWorkCatalog(s => s.addWork)

    const formControl = useForm<CreateWork>({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            currencyId: 1,
            groupId: 1
        }
    })

    const onSubmit: SubmitHandler<CreateWork> = (data: CreateWork) => {

        data.groupId = selected.id
        console.log('submitData', data)

        $api.post<Work>('/work/create', data).then((r) => {
            console.log(r)
            addWork(r.data)
            formControl.reset()
            props.setVisibility(false)
            enqueueSnackbar('Услуга создана', {variant: 'success', autoHideDuration: 10000})
        }).catch((r) => {
            console.log(r)
            enqueueSnackbar('Ошибка создания', {variant: 'error', autoHideDuration: 10000})
        })
    }

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
            onClose={() => {props.setVisibility(false)}}
            onContextMenu={(event) => {event.preventDefault()}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={formControl.handleSubmit(onSubmit)}>
                <ControlledCustomInput name={'name'}
                                       placeholder={'Название услуги'}
                                       control={formControl}
                                       rules={{required: 'Обязательное поле'}}
                />
                <ControlledCustomInput name={'description'}
                                       placeholder={'Описание'}
                                       control={formControl}
                                       rules={{required: 'Обязательное поле'}}
                />
                <ControlledCustomInput name={'price'}
                                       placeholder={'Цена'}
                                       control={formControl}
                                       rules={{required: 'Обязательное поле'}}
                />
                <br/>
                <Button type={'submit'}
                    // buttonDivWrapper={s.infoBlock_cancelBtn}
                >
                    Создать услугу
                </Button>
                <Button onClick={() => {props.setVisibility(false)}}
                    // buttonDivWrapper={s.infoBlock_cancelBtn}
                >
                    Отмена
                </Button>
            </Box>
        </Modal>
    );
};