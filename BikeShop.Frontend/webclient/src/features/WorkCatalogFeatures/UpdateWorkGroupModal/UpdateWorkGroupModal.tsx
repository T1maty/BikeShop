import React, {useEffect} from 'react'
import s from './UpdateWorkGroupModal.module.scss'
import {Button, ControlledCustomCheckbox, ControlledCustomInput, CustomModal} from '../../../shared/ui'
import {useSnackbar} from 'notistack'
import {useWorkCatalog} from '../../../widgets/workspace/WorkCatalog/TableCatalogStore'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Group, UpdateWorkGroup} from '../../../entities'
import {$api} from '../../../shared'

interface UpdateWorkGroupModalProps {
    visibility: boolean
    setVisibility: (value: boolean) => void
    target: Group
}

export const UpdateWorkGroupModal = (props: UpdateWorkGroupModalProps) => {

    const {enqueueSnackbar} = useSnackbar()

    const getGroup = useWorkCatalog(s => s.getGroup)

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
    }

    return (
        <CustomModal
            open={props.visibility}
            onClose={() => {
                props.setVisibility(false)
            }}
            onContextMenu={(event) => {
                event.preventDefault()
            }}
        >
            <div className={s.updateWorkGroupModal_mainBox}>
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <div className={s.updateWorkGroupModal_inputs}>
                        <div className={s.updateWorkGroupModal_groupName}>
                            {'Обновляемая группа: ' + props.target.name}
                        </div>
                        <ControlledCustomInput name={'name'}
                                               placeholder={'Название группы'}
                                               control={formControl}
                                               rules={{required: 'Обязательное поле'}}
                            // divClassName={s.updateWorkGroupModal_input}
                        />
                        <ControlledCustomCheckbox name={'isCollapsed'}
                                                  label={'Свёрнуть по умолчанию'}
                                                  control={formControl}
                            // divClassName={s.updateWorkGroupModal_checkbox}
                        />
                    </div>
                    <div className={s.createWorkModal_buttons}>
                        <Button onClick={() => {
                            props.setVisibility(false)
                        }}>
                            Отмена
                        </Button>
                        <Button type={'submit'}>
                            Обновить группу
                        </Button>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}