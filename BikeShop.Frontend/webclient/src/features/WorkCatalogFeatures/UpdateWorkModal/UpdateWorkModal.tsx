import React, {useEffect} from 'react'
import {useSnackbar} from "notistack"
import {SubmitHandler, useForm} from "react-hook-form"
import {UpdateWork, Work} from "../../../entities"
import {$api} from "../../../shared"
import {Box, Modal, Typography} from "@mui/material"
import {ControlledCustomInput, Button} from '../../../shared/ui'
import {useWorkCatalog} from "../../../widgets/workspace/WorkCatalog/TableCatalogStore"

interface UpdateWorkModalProps {
    visibility: boolean
    setVisibility: (value: boolean) => void
}

export const UpdateWorkModal = (props: UpdateWorkModalProps) => {

    const {selectedRow, selected, getWork} = useWorkCatalog(state => state)

    const {enqueueSnackbar} = useSnackbar()
    const formControl = useForm<UpdateWork>({
        defaultValues: {
            id: 0,
            name: '',
            description: '',
            price: 0,
            groupId: 1,
            enabled: true
        }
    })

    const onSubmit: SubmitHandler<UpdateWork> = (data: UpdateWork) => {
        console.log(selectedRow)
        data.id = selectedRow.id
        data.groupId = selectedRow.workGroupId
        console.log('submitData', data)

        $api.put<Work>('/work/update', data).then((r) => {
            console.log(r)

            getWork(selected.id)

            formControl.reset()
            props.setVisibility(false)
            enqueueSnackbar('Услуга обновлена', {variant: 'success', autoHideDuration: 10000})
        }).catch((r) => {
            console.log(r)
            enqueueSnackbar('Ошибка', {variant: 'error', autoHideDuration: 10000})
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

    useEffect(() => {
        formControl.setValue('name', selectedRow.name)
        formControl.setValue('description', selectedRow.description)
        formControl.setValue('price', selectedRow.price)
    }, [selectedRow])

    return (
        <Modal
            open={props.visibility}
            onClose={() => {props.setVisibility(false)}}
            onContextMenu={(event) => {event.preventDefault()}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={formControl.handleSubmit(onSubmit)}>
                <Typography>
                    {selectedRow.name}
                </Typography>
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
                    Обновить услугу
                </Button>
                <Button onClick={() => {props.setVisibility(false)}}
                        // buttonDivWrapper={s.infoBlock_cancelBtn}
                >
                    Отмена
                </Button>
            </Box>
        </Modal>
    )
}