import React, {useEffect} from 'react'
import s from './UpdateWorkModal.module.scss'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm} from 'react-hook-form'
import {UpdateWork, Work} from '../../../entities'
import {$api} from '../../../shared'
import {Button, ControlledCustomInput, CustomModal} from '../../../shared/ui'
import {useWorkCatalog} from '../../../widgets/workspace/WorkCatalog/TableCatalogStore'

interface UpdateWorkModalProps {
    visibility: boolean
    setVisibility: (value: boolean) => void
}

export const UpdateWorkModal = (props: UpdateWorkModalProps) => {

    const {enqueueSnackbar} = useSnackbar()

    const selectedRow = useWorkCatalog(s => s.selectedRow)
    const selected = useWorkCatalog(s => s.selected)
    const getWork = useWorkCatalog(s => s.getWork)

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

    useEffect(() => {
        formControl.setValue('name', selectedRow.name)
        formControl.setValue('description', selectedRow.description)
        formControl.setValue('price', selectedRow.price)
    }, [selectedRow])

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
            <div className={s.updateWorkModal_mainBox}>
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <div className={s.updateWorkModal_inputs}>
                        <div>
                            {selectedRow.name}
                        </div>
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
                                               isCurrecy
                                               placeholder={'Цена'}
                                               control={formControl}
                                               rules={{required: 'Обязательное поле'}}
                        />
                    </div>
                    <div className={s.updateWorkModal_buttons}>
                        <Button onClick={() => {
                            props.setVisibility(false)
                        }}>
                            Отмена
                        </Button>
                        <Button type={'submit'}>
                            Обновить услугу
                        </Button>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}