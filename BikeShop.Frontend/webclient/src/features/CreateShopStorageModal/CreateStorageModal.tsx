import {useSnackbar} from 'notistack';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {useEffect, useState} from 'react';
import {Modal} from '@mui/material';
import s from './CreateStorageModal.module.scss';
import {Button, ControlledCheckbox, ControlledInput} from '../../shared/ui';
import {Errors} from '../../entities/errors/workspaceErrors';
import useCreateStorageModal from './CreateStorageModalStore';
import {UpdateStorage} from '../../entities/requests/CreateStorage';

export const CreateStorageModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useCreateStorageModal(s => s.createStorageModal)
    const setOpen = useCreateStorageModal(s => s.setOpenCreateStorageModal)

    const currentStorage = useCreateStorageModal(s => s.currentStorage)
    const setCurrentStorage = useCreateStorageModal(s => s.setCurrentStorage)
    const storages = useCreateStorageModal(s => s.storages)
    const getStorages = useCreateStorageModal(s => s.getStorages)
    const addNewStorage = useCreateStorageModal(s => s.addNewStorage)
    const updateStorageInfo = useCreateStorageModal(s => s.updateStorageInfo)

    // для тестирования вёрстки
    // const storages = [
    //     {id: 1, name: '1', supplyDelay: true, enabled: true},
    //     {id: 2, name: '2', supplyDelay: true, enabled: false},
    //     {id: 3, name: '3', supplyDelay: false, enabled: true},
    //     {id: 4, name: '4', supplyDelay: true, enabled: false},
    //     {id: 5, name: '5', supplyDelay: false, enabled: true},
    // ]

    const formControl = useForm<UpdateStorage>({
        defaultValues: {
            id: 0,
            name: '',
            supplyDelay: '',
            isOutsource: true,
            enabled: true,
        }
    });
    const onSubmit: SubmitHandler<UpdateStorage> = (data: UpdateStorage) => {
        if (currentStorage === null) {
            addNewStorage(data).then((response: any) => {
                formControl.reset()
                getStorages()
                enqueueSnackbar('Склад добавлен', {variant: 'success', autoHideDuration: 3000})
            }).catch((error: any) => {
                let message = error(error.response.data.errorDescription).toString()
                formControl.setError('name', {type: 'serverError', message: message})
                enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
                console.error(error.response.data)
            })
        }

        if (currentStorage !== null) {
            updateStorageInfo(data).then((response: any) => {
                getStorages()
                enqueueSnackbar('Склад обновлён', {variant: 'success', autoHideDuration: 3000})
            }).catch((error: any) => {
                let message = error(error.response.data.errorDescription).toString()
                formControl.setError('name', {type: 'serverError', message: message})
                enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
                console.error(error.response.data)
            })
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
        getStorages()
    }, [])

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.shopStorageModal_mainBlock}>
                <div className={s.shopStorageModal_shops}>
                    <div className={s.shopStorageModal_shopList}>
                        {storages.map(storage => (
                            <div key={storage.id}
                                 className={storage.id === currentStorage?.id ? s.shop_item_active : s.shop_item}
                                 onClick={() => {
                                     setCurrentStorage(storage)
                                     console.log('выбранный склад', storage)
                                 }}
                            >
                                <div><span>ID:</span> {storage.id}</div>
                                <div><span>Название:</span> {storage.name}</div>
                                <div><span>Задержка поставки:</span> {storage.supplyDelay}</div>
                                <div><span>Активен:</span> {storage.enabled ? 'Да' : 'Нет'}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={s.shopStorageModal_createBlock}>
                    <form onSubmit={formControl.handleSubmit(onSubmit)}>
                        <div className={s.shopStorageModal_inputFields}>
                            <ControlledInput name={'name'}
                                             label={'Название склада'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                            <ControlledInput name={'supplyDelay'}
                                             label={'Задержка поставки'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                            <ControlledCheckbox name={'isOutsource'}
                                                label={'Аутсорсный склад ?'}
                                                control={formControl}
                                                divClassName={s.infoBlock_checkbox}
                            />
                            <ControlledCheckbox name={'enabled'}
                                                label={'Магазин работает'}
                                                control={formControl}
                                                divClassName={s.infoBlock_checkbox}
                            />
                            <Button buttonDivWrapper={s.infoBlock_cancelBtn}
                                    disabled={currentStorage === null}
                                    onClick={() => {setCurrentStorage(null)}}
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
        </Modal>
    );
};