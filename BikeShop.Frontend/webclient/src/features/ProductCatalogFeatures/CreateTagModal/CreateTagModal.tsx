import React from 'react'
import s from './CreateTagModal.module.scss'
import useCreateTagModal from './CreateTagModalStore'
import {SubmitHandler, useForm} from 'react-hook-form'
import {CreateTag, ProductTag} from '../../../entities'
import {Button, ControlledCustomCheckbox, ControlledCustomInput, CustomModal} from '../../../shared/ui'

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
            <div className={s.createTagModal_mainBox}>
                <form onSubmit={control.handleSubmit(onSubmit)} className={s.createTagModal_form}>
                    <div className={s.createTagModal_title}>
                        Добавить в: {parentNode.id === undefined ? 'Корень дерева' : parentNode.name}
                    </div>
                    <ControlledCustomInput name={'name'}
                                           placeholder={'Название тега'}
                                           control={control}
                                           rules={{required: 'Введите название нового тега'}}
                    />
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
                    />
                    <ControlledCustomCheckbox name={'isB2BVisible'}
                                              label={'Видим в B2B'}
                                              control={control}
                    />
                    <ControlledCustomCheckbox name={'isUniversal'}
                                              label={'Универсальный тег'}
                                              control={control}
                    />
                    <Button type={'submit'}
                            buttonDivWrapper={s.infoBlock_cancelBtn}
                    >
                        Создать тег
                    </Button>
                </form>
            </div>
        </CustomModal>
    )
}