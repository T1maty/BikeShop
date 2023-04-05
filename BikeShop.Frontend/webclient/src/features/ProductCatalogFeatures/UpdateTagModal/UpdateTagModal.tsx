import React, {useEffect} from 'react'
import {SubmitHandler, useForm} from "react-hook-form"
import {UpdateTag} from "../../../entities"
import {Box, Typography} from "@mui/material"
import {ControlledCustomCheckbox, ControlledCustomInput, Button, CustomModal} from '../../../shared/ui'
import {useSnackbar} from "notistack"
import useUpdateTagModal from './UpdateTagModalStore'

interface UpdateTagModalProps {
    onSuccess?: (tag: UpdateTag) => void
}

export const UpdateTagModal = (props: UpdateTagModalProps) => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useUpdateTagModal(s => s.open)
    const tag = useUpdateTagModal(s => s.targetTag)
    const setClose = useUpdateTagModal(s => s.closeTagModal)
    const update = useUpdateTagModal(s => s.updateTag)

    const control = useForm<UpdateTag>({
        defaultValues: {
            name: '',
            sortOrder: 0,
            isRetailVisible: false,
            isB2BVisible: false,
            isUniversal: false,
            id: '0'
        }
    })

    useEffect(() => {
        control.setValue('id', tag.id)
        control.setValue('name', tag.name)
        control.setValue('sortOrder', tag.sortOrder)
        control.setValue('isRetailVisible', tag.isRetailVisible)
        control.setValue('isB2BVisible', tag.isB2BVisible)
        control.setValue('isUniversal', tag.isUniversal)

        console.log(tag)
    }, [tag])

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
        color: 'white'
    };


    const onSubmit: SubmitHandler<UpdateTag> = (data: UpdateTag) => {
        update(data).then((r) => {
            setClose()
            props.onSuccess ? props.onSuccess(data) : true
            enqueueSnackbar('Тег изменен', {variant: 'success', autoHideDuration: 10000})
        }).catch((r) => {
            enqueueSnackbar(r.response.data.errorDescription, {variant: 'error', autoHideDuration: 10000})
            console.error(r)
        })

        control.setValue('name', '')
        control.setValue('sortOrder', 0)
        control.setValue('isRetailVisible', false)
        control.setValue('isB2BVisible', false)
        control.setValue('isUniversal', false)
    };

    return (
        <CustomModal
            open={open}
            onClose={() => {setClose()}}
            onContextMenu={(event) => {event.preventDefault()}}
        >
            <Box sx={style} component="form" onSubmit={control.handleSubmit(onSubmit)}>
                <Typography
                    sx={{pb: 3}}>ID: {tag.id}
                </Typography>
                <ControlledCustomInput name={'name'}
                                       placeholder={'Название тега'}
                                       control={control}
                                       rules={{required: 'Введите название нового тега'}}
                />
                <br/>
                <br/>
                <ControlledCustomInput name={'sortOrder'}
                                       placeholder={'Порядок сортировки'}
                                       control={control}
                                       rules={{
                                           required: 'Порядок сортировки необходимо ввести',
                                           validate: (value: number) => value > -1
                                       }}
                />
                <ControlledCustomCheckbox name={'isRetailVisible'}
                                          label={'Видим в интернет-магазине'}
                                          control={control}
                                          // divClassName={s.infoBlock_checkbox}
                />
                <ControlledCustomCheckbox name={'isB2BVisible'}
                                          label={'Видим в B2B'}
                                          control={control}
                                          // divClassName={s.infoBlock_checkbox}
                />
                <ControlledCustomCheckbox name={'isUniversal'}
                                          label={'Универсальный тег'}
                                          control={control}
                                          // divClassName={s.infoBlock_checkbox}
                />
                <br/>
                <Button type={'submit'}
                        // buttonDivWrapper={s.infoBlock_cancelBtn}
                >
                    Редактировать тег
                </Button>
            </Box>
        </CustomModal>
    )
}