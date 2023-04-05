import React from 'react'
import {Box, Typography} from "@mui/material"
import useCreateTagModal from "./CreateTagModalStore"
import {SubmitHandler, useForm} from "react-hook-form"
import {CreateTag, ProductTag} from "../../../entities"
import {ControlledCustomCheckbox, ControlledCustomInput, Button, CustomModal} from '../../../shared/ui'
import s from '../../CRUDModals/CreateShopModal/CreateShopModal.module.scss'

interface CreateTagModalProps {
    onSuccess?: (tag: ProductTag) => void
}

export const CreateTagModal = (props: CreateTagModalProps) => {

    const open = useCreateTagModal(s => s.openCreateTagModal)
    const setOpen = useCreateTagModal(s => s.setOpenCreateTagModal)
    const parentNode = useCreateTagModal(s => s.parentNode)
    const createTag = useCreateTagModal(s => s.createTag)

    const control = useForm<CreateTag>({
        defaultValues: {
            name: '',
            sortOrder: 0,
            isRetailVisible: false,
            isB2BVisible: false,
            isUniversal: false
        }
    })

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
    }

    const onSubmit: SubmitHandler<CreateTag> = (data: CreateTag) => {
        data.parentId = parentNode.id
        createTag(data).then(r => {
            setOpen(false)
            props.onSuccess ? props.onSuccess(r.data) : true

            control.setValue('name', '')
            control.setValue('sortOrder', 0)
            control.setValue('isRetailVisible', false)
            control.setValue('isB2BVisible', false)
            control.setValue('isUniversal', false)
        })
    };

    return (
        <CustomModal
            open={open}
            onClose={() => {setOpen(false)}}
            onContextMenu={(event) => {event.preventDefault()}}
        >
            <Box sx={style} component="form" onSubmit={control.handleSubmit(onSubmit)}>
                <Typography sx={{pb: 3}}>Добавить
                    в: {parentNode.id === undefined ? 'КОРЕНЬ ДЕРЕВА' : parentNode.name}
                </Typography>
                <ControlledCustomInput name={'name'}
                                       placeholder={'Название тега'}
                                       control={control}
                                       rules={{required: "Введите название нового тега"}}
                />
                <br/>
                <br/>
                <ControlledCustomInput name={'sortOrder'}
                                       placeholder={'Порядок сортировки'}
                                       control={control}
                                       rules={{
                                           required: "Порядок сортировки необходимо ввести",
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
                        buttonDivWrapper={s.infoBlock_cancelBtn}
                >
                    Создать тег
                </Button>
            </Box>
        </CustomModal>
    )
}