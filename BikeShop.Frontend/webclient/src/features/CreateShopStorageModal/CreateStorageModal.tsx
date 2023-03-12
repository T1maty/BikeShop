import {useSnackbar} from 'notistack';
import {useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {ChangeEvent, useEffect} from 'react';
import {Modal} from '@mui/material';
import s from './CreateShopStorageModal.module.scss';
import {Button, ControlledCheckbox, ControlledInput} from '../../shared/ui';
import {Errors} from '../../entities/errors/workspaceErrors';
import useCreateStorageModal from "./CreateStorageModalStore";

export const CreateStorageModal = () => {

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const open = useCreateStorageModal(s => s.createStorageModal)
    const setOpen = useCreateStorageModal(s => s.setOpenCreateStorageModal)
    const storageName = useCreateStorageModal(s => s.storageName)
    const storageWaiting = useCreateStorageModal(s => s.storageWaiting)
    const addNewStorage = useCreateStorageModal(s => s.addNewStorage)

    const formControl = useForm({
        defaultValues: {
            storageName: '',
            storageWaiting: '',
            isOutsourceStorage: true,
            isShopWorking: true,
        }
    });
    const onSubmit: SubmitHandler<any> = (data: any) => {
        alert('Склад создан')

        // addNewStorage().then((response: any) => {
        //     // setOpen(false)
        //     // navigate(BikeShopPaths.WORKSPACE.SERVICE)
        //
        //     formControl.setValue('storeName', '')
        //     formControl.setValue('storeWaiting', '')
        //
        //     enqueueSnackbar('Магазин добавлен', {variant: 'success', autoHideDuration: 3000})
        // }).catch((error: any) => {
        //     let message = error(error.response.data.errorDescription).toString()
        //     formControl.setError('shopName', {type: 'serverError', message: message})
        //     enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
        //     console.error(error.response.data)
        // })
    }

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.shopStoreModal_mainBlock}>
                <div className={s.shopStoreModal_infoBlock}>
                    Storage
                </div>

                <div className={s.shopStoreModal_createBlock}>
                    <form onSubmit={formControl.handleSubmit(onSubmit)}>

                        <div className={s.shopStoreModal_inputFields}>
                            <div>
                                <ControlledInput name={'storageName'}
                                                 label={'Название склада'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div>
                                <ControlledInput name={'storageWaiting'}
                                                 label={'Задержка поставки'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div className={s.infoBlock_checkbox}>
                                <div className={s.infoBlock_checkboxItem}>
                                    <div>
                                        <ControlledCheckbox name={'isOutsourceStorage'}
                                                            label={'? Аутсорсный склад'}
                                                            control={formControl}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={s.infoBlock_checkbox}>
                                <div className={s.infoBlock_checkboxItem}>
                                    <div>
                                        <ControlledCheckbox name={'isShopWorking'}
                                                            label={'Магазин работает'}
                                                            control={formControl}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={s.infoBlock_updateBtn}>
                                <Button>
                                    Сохранить
                                </Button>
                            </div>
                        </div>
                        <div className={s.shopStoreModal_createBtn}>
                            <Button type={'submit'}>
                                Создать склад
                            </Button>
                        </div>
                        <div className={s.shopStoreModal_exitBtn}>
                            <Button onClick={() => {setOpen(false)}}>
                                Выйти
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};