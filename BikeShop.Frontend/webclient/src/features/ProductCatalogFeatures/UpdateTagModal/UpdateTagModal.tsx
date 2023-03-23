import React, {useEffect} from 'react'
import {SubmitHandler, useForm} from "react-hook-form"
import {IUpdateTag} from "../../../entities"
import {Box, Button, Modal, Typography} from "@mui/material"
import {ControlledCheckbox, ControlledInput} from "../../../shared/ui"
import {useSnackbar} from "notistack"
import useUpdateTagModal from './UpdateTagModalStore'

interface props {
    onSuccess?: (tag: IUpdateTag) => void
}

export const UpdateTagModal = (props: props) => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useUpdateTagModal(s => s.open)
    const tag = useUpdateTagModal(s => s.targetTag)
    const setClose = useUpdateTagModal(s => s.closeTagModal)
    const update = useUpdateTagModal(s => s.updateTag)

    const control = useForm<IUpdateTag>({
        defaultValues: {
            name: "",
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


    const onSubmit: SubmitHandler<IUpdateTag> = (data: IUpdateTag) => {
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

                <ControlledCheckbox name={"isRetailVisible"} label={'Видим в интернет-магазине'} control={control}/>
                <ControlledCheckbox name={"isB2BVisible"} label={'Виден в B2B'} control={control}/>
                <ControlledCheckbox name={"isUniversal"} label={'Универсальный тег'} control={control}/>
                <br/>
                <Button color='primary' type="submit">Редактировать тег</Button>

            </Box>
        </Modal>
    )
}