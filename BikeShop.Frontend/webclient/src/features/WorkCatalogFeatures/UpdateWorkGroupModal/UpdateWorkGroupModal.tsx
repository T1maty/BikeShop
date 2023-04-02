import React, {useEffect} from 'react'
import {Box, Button, Modal} from "@mui/material"
import {ControlledCustomCheckbox, ControlledCustomInput} from '../../../shared/ui'
import {useSnackbar} from "notistack"
import {useWorkCatalog} from "../../../widgets/workspace/WorkCatalog/TableCatalogStore"
import {SubmitHandler, useForm} from "react-hook-form"
import {UpdateWorkGroup, Group} from "../../../entities"
import {$api} from "../../../shared"

interface UpdateWorkGroupModalProps {
    visibility: boolean
    setVisibility: (value: boolean) => void
    target: Group
}

export const UpdateWorkGroupModal = (props: UpdateWorkGroupModalProps) => {

    const {enqueueSnackbar} = useSnackbar()
    const {getGroup} = useWorkCatalog(s => s)

    useEffect(() => {
        formControl.setValue('name', props.target.name)
        formControl.setValue('isCollapsed', props.target.isCollapsed)

    }, [props.target])

    const formControl = useForm<UpdateWorkGroup>({
        defaultValues: {
            id: 0,
            name: '',
            parentId: 0,
            shopId: 1,
            isCollapsed: false
        }
    })

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

    const onSubmit: SubmitHandler<UpdateWorkGroup> = (data: UpdateWorkGroup) => {
        data.parentId = props.target.parentId
        data.id = props.target.id
        data.shopId = props.target.shopId
        console.log('submitData', data)

        $api.put<Group>('/group/update', data).then((r) => {
            formControl.reset()
            props.setVisibility(false)
            getGroup()
            enqueueSnackbar('Группа обновленна', {variant: 'success', autoHideDuration: 10000})
        }).catch((r) => {
            console.log(r)
            enqueueSnackbar('Ошибка создания', {variant: 'error', autoHideDuration: 10000})
        })
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
                <div>
                    {'Обновляем группу: ' + props.target.name}
                </div>
                <ControlledCustomInput name={'name'}
                                       placeholder={'Название группы'}
                                       control={formControl}
                                       rules={{required: 'Обязательное поле'}}
                />
                <ControlledCustomCheckbox name={'isCollapsed'}
                                          label={'Свёрнут по умолчанию'}
                                          control={formControl}
                                          // divClassName={s.infoBlock_checkbox}
                />
                <br/>
                <Button type={'submit'}
                        // buttonDivWrapper={s.infoBlock_cancelBtn}
                >
                    Обновить группу
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