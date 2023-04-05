import React from 'react'
import s from './CreateWorkModal.module.scss'
import {SubmitHandler, useForm} from 'react-hook-form'
import {CreateWork, Work} from '../../../entities'
import {ControlledCustomInput, Button, CustomModal} from '../../../shared/ui'
import {$api} from '../../../shared'
import {useSnackbar} from 'notistack'
import {useWorkCatalog} from '../../../widgets/workspace/WorkCatalog/TableCatalogStore'

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

    return (
        <CustomModal
            open={props.visibility}
            onClose={() => {props.setVisibility(false)}}
            onContextMenu={(event) => {event.preventDefault()}}
        >
            <div className={s.createWorkModal_mainBox}>
                <div onSubmit={formControl.handleSubmit(onSubmit)}>
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