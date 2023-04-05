import React from 'react'
import s from './CreateTagModal.module.scss'
import useCreateTagModal from './CreateTagModalStore'
import {SubmitHandler, useForm} from 'react-hook-form'
import {CreateTag, ProductTag} from '../../../entities'
import {ControlledCustomCheckbox, ControlledCustomInput, Button, CustomModal} from '../../../shared/ui'

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
                <div onSubmit={control.handleSubmit(onSubmit)}>
                <span>
                    Добавить в:
                    {parentNode.id === undefined ? 'КОРЕНЬ ДЕРЕВА' : parentNode.name}
                </span>
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
                            buttonDivWrapper={s.infoBlock_cancelBtn}
                    >
                        Создать тег
                    </Button>
                </div>
            </div>
        </CustomModal>
    )
}