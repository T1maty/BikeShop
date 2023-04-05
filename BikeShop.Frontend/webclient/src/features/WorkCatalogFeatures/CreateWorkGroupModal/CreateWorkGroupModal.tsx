import React from 'react'
import s from './CreateWorkGroupModal.module.scss'
import {ControlledCustomCheckbox, ControlledCustomInput, Button, CustomModal} from '../../../shared/ui'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm} from 'react-hook-form'
import {CreateWorkGroup, Group} from '../../../entities'
import {$api} from '../../../shared'
import {useWorkCatalog} from '../../../widgets/workspace/WorkCatalog/TableCatalogStore'

interface CreateWorkGroupModalProps {
    visibility: boolean
    setVisibility: (value: boolean) => void
    parent: Group
}

export const CreateWorkGroupModal = (props: CreateWorkGroupModalProps) => {

    const {enqueueSnackbar} = useSnackbar()

    const addGroup = useWorkCatalog(s => s.addGroup)

    const formControl = useForm<CreateWorkGroup>({
        defaultValues: {
            name: '',
            parentId: 0,
            shopId: 1,
            isCollapsed: false
        }
    })

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
    }

    return (
        <CustomModal
            open={props.visibility}
            onClose={() => {props.setVisibility(false)}}
            onContextMenu={(event) => {event.preventDefault()}}
        >
            <div className={s.createWorkGroupModal_mainBox}>
                <div onSubmit={formControl.handleSubmit(onSubmit)}>
                    <div>
                        {props.parent.name != undefined ? 'Создаем потомка для ' + props.parent.name : 'Создаем в корне'}
                    </div>
                    <ControlledCustomInput name={'name'}
                                           placeholder={'Название группы'}
                                           control={formControl}
                                           rules={{required: 'Обязательное поле'}}
                    />
                    <ControlledCustomCheckbox name={'isCollapsed'}
                                              label={'Свернут по умолчанию'}
                                              control={formControl}
                        // divClassName={s.infoBlock_checkbox}
                    />
                    <br/>
                    <Button type={'submit'}
                        // buttonDivWrapper={s.infoBlock_cancelBtn}
                    >
                        Создать группу
                    </Button>
                    <Button onClick={() => {
                        props.setVisibility(false)
                    }}
                        // buttonDivWrapper={s.infoBlock_cancelBtn}
                    >
                        Отмена
                    </Button>
                </div>
            </div>
        </CustomModal>
    )
}