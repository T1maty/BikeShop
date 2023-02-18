import {useSnackbar} from 'notistack';
import {useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {ChangeEvent, useEffect} from 'react';
import {Modal, Checkbox} from '@mui/material';
import s from './CreateShopStorageModal.module.scss';
import {Button, ControlledInput} from '../../shared/ui';
import {Errors} from '../../entities/errors/workspaceErrors';
import {CreateShop, CreateShopSubmit} from '../../entities/requests/CreateShop';
import useCreateShopModal from './CreateShopModalStore';

const CreateShopModal = () => {

    const label = {inputProps: {'aria-label': 'Checkbox demo'}}

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const open = useCreateShopModal(s => s.createShopModal)
    const setOpen = useCreateShopModal(s => s.setCreateShopModal)
    const addNewShop = useCreateShopModal(s => s.addNewShop)

    const formControl = useForm({
        defaultValues: {
            name: '',
            address: '',
            phone: '',
            // storageId: '',
            // isShopWorking: '',
        }
    });
    const onSubmit: SubmitHandler<CreateShopSubmit> = (data: CreateShopSubmit) => {
        // alert('Магазин создан')

        addNewShop(data).then((response) => {
            console.log(data)
            // setOpen(false)
            // navigate(BikeShopPaths.WORKSPACE.SERVICE)

            formControl.setValue('name', '')
            formControl.setValue('address', '')
            formControl.setValue('phone', '')
            // formControl.setValue('storageId', '')
            // formControl.setValue('isShopWorking', '')

            enqueueSnackbar('Магазин добавлен', {variant: 'success', autoHideDuration: 3000})
        }).catch((error: any) => {
            let message = error(error.response.data.errorDescription).toString()
            formControl.setError('name', {type: 'serverError', message: message})
            enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
            console.error(error.response.data)
        })
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
                    Shop
                </div>

                <div className={s.shopStoreModal_createBlock}>
                    <form onSubmit={formControl.handleSubmit(onSubmit)}>

                        <div className={s.shopStoreModal_inputFields}>
                            <div>
                                <ControlledInput name={'name'} label={'Название магазина'}
                                                 control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div>
                                <ControlledInput name={'address'} label={'Адрес магазина'}
                                                 control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div>
                                <ControlledInput name={'phone'} label={'Телефон магазина'}
                                                 control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div>
                                <ControlledInput name={'storageId'} label={'Склад'}
                                                 control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div className={s.infoBlock_checkbox}>
                                <div className={s.infoBlock_checkboxItem}>
                                    <div><Checkbox {...label} /></div>
                                    <div>Магазин работает</div>
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
                                Создать магазин
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

export default CreateShopModal;