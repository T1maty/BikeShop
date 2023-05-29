import React, {useEffect} from 'react'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm} from 'react-hook-form'
import s from './CreateStorageModal.module.scss'
import {Button, ControlledCustomCheckbox, ControlledCustomInput, CustomModal, LoaderScreen} from '../../../shared/ui'
import {Errors} from '../../../entities/errors/workspaceErrors'
import useCreateStorageModal from './CreateStorageModalStore'
import {UpdateStorage} from '../../../entities/requests/CreateStorage'

export const CreateStorageModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useCreateStorageModal(s => s.openCreateStorageModal)
    const setOpen = useCreateStorageModal(s => s.setOpenCreateStorageModal)
    const isLoading = useCreateStorageModal(s => s.isLoading)
    const errorStatus = useCreateStorageModal(s => s.errorStatus)

    const currentStorage = useCreateStorageModal(s => s.currentStorage)
    const setCurrentStorage = useCreateStorageModal(s => s.setCurrentStorage)
    const storages = useCreateStorageModal(s => s.storages)
    const getStorages = useCreateStorageModal(s => s.getStorages)
    const addNewStorage = useCreateStorageModal(s => s.addNewStorage)
    const updateStorageInfo = useCreateStorageModal(s => s.updateStorageInfo)

    const formControl = useForm<UpdateStorage>({
        defaultValues: {
            id: 0,
            name: '',
            supplyDelay: '',
            isOutsource: true,
            enabled: true,
        }
    })

    const onSubmit: SubmitHandler<UpdateStorage> = (data: UpdateStorage) => {
        console.log(data)
        if (currentStorage === null) {
            addNewStorage(data)
        }
        if (currentStorage !== null) {
            updateStorageInfo(data)
        }
    }

    useEffect(() => {
        formControl.reset()
        formControl.setValue('id', currentStorage ? currentStorage.id : 0)
        formControl.setValue('name', currentStorage ? currentStorage.name : '')
        formControl.setValue('supplyDelay', currentStorage ? currentStorage.supplyDelay : '')
        formControl.setValue('isOutsource', currentStorage ? currentStorage.isOutsource : true)
        formControl.setValue('enabled', currentStorage ? currentStorage.enabled : true)
    }, [currentStorage])

    useEffect(() => {
        if (errorStatus === 'success') {
            enqueueSnackbar('Операция выполнена', {variant: 'success', autoHideDuration: 3000})
            formControl.reset()
        }
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        open ? getStorages() : false;
    }, [open])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <CustomModal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
            >
                <div className={s.shopStorageModal_mainBlock}>
                    <div className={s.shopStorageModal_shops}>
                        <div className={s.shopStorageModal_shopList}>
                            {
                                storages.map(storage => (
                                    <div key={storage.id}
                                         className={storage.id === currentStorage?.id ? s.shop_item_active : s.shop_item}
                                         onClick={() => {
                                             setCurrentStorage(storage)
                                         }}
                                    >
                                        <div><span>ID:</span> {storage.id}</div>
                                        <div><span>Название:</span> {storage.name}</div>
                                        <div><span>Задержка поставки:</span> {storage.supplyDelay}</div>
                                        <div><span>Активен:</span> {storage.enabled ? 'Да' : 'Нет'}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className={s.shopStorageModal_createBlock}>
                        <form onSubmit={formControl.handleSubmit(onSubmit)}>
                            <div className={s.shopStorageModal_inputFields}>
                                <ControlledCustomInput name={'name'}
                                                       placeholder={'Название склада'}
                                                       control={formControl}
                                                       rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomInput name={'supplyDelay'}
                                                       placeholder={'Задержка поставки'}
                                                       control={formControl}
                                                       rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomCheckbox name={'isOutsource'}
                                                          label={'Аутсорсный склад ?'}
                                                          control={formControl}
                                                          divClassName={s.infoBlock_checkbox}
                                />
                                <ControlledCustomCheckbox name={'enabled'}
                                                          label={'Склад работает'}
                                                          control={formControl}
                                                          divClassName={s.infoBlock_checkbox}
                                />
                                <Button buttonDivWrapper={s.infoBlock_cancelBtn}
                                        disabled={currentStorage === null}
                                        onClick={() => {
                                            setCurrentStorage(null)
                                        }}
                                >
                                    Отмена
                                </Button>
                            </div>
                            <div className={s.footer_buttons}>
                                <Button type={'submit'}>
                                    {currentStorage === null ? 'Создать склад' : 'Обновить данные'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </CustomModal>
        )
    }
}