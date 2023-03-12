import {useSnackbar} from 'notistack';
import {useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {ChangeEvent, useEffect} from 'react';
import {Modal} from '@mui/material';
import s from './CreateShopStorageModal.module.scss';
import {Button, ControlledCheckbox, ControlledInput} from '../../shared/ui';
import {Errors} from '../../entities/errors/workspaceErrors';
import useCreateShopModal from './CreateShopModalStore';
import {CreateShopSubmit} from '../../entities';

export const CreateShopModal = () => {

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const open = useCreateShopModal(s => s.createShopModal)
    const setOpen = useCreateShopModal(s => s.setOpenCreateShopModal)
    const shops = useCreateShopModal(s => s.shops)
    const getShops = useCreateShopModal(s => s.getShops)
    const addNewShop = useCreateShopModal(s => s.addNewShop)

    const formControl = useForm({
        defaultValues: {
            name: '',
            address: '',
            phone: '',
            secret: '',
            storageId: '',
            isShopWorking: true,
        }
    });
    const onSubmit: SubmitHandler<any> = (data: CreateShopSubmit) => {
        // alert('Магазин создан')

        addNewShop(data).then((res: any) => {
            console.log(data)
            // setOpen(false)

            formControl.setValue('name', '')
            formControl.setValue('address', '')
            formControl.setValue('phone', '')
            formControl.setValue('secret', '')
            formControl.setValue('storageId', '')
            // formControl.setValue('isShopWorking', '')

            enqueueSnackbar('Магазин создан', {variant: 'success', autoHideDuration: 3000})
        }).catch((error: any) => {
            let message = error(error.response.data.errorDescription).toString()
            formControl.setError('name', {type: 'serverError', message: message})
            enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
            console.error(error.response.data)
        })
    }

    useEffect(() => {
        getShops()
    }, [])

    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.shopStoreModal_mainBlock}>
                <div className={s.shopStoreModal_shops}>
                    {shops.map(shop => (
                        <div className={s.shop_item} key={shop.id}>
                            <div>ID: {shop.id}</div>
                            <div>Название: {shop.name}</div>
                            <div>Адрес: {shop.address}</div>
                            <div>Телефон: {shop.phone}</div>
                            <div>Склад: {shop.storageId}</div>
                            <div>Активен: {shop.enabled ? 'Да' : 'Нет'}</div>
                        </div>
                    ))}
                </div>

                <div className={s.shopStoreModal_createBlock}>
                    <form onSubmit={formControl.handleSubmit(onSubmit)}>

                        <div className={s.shopStoreModal_inputFields}>
                            <ControlledInput name={'name'}
                                             label={'Название магазина'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                            <ControlledInput name={'address'}
                                             label={'Адрес магазина'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                            <ControlledInput name={'phone'}
                                             label={'Телефон магазина'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                            <ControlledInput name={'secret'}
                                             label={'Пароль'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                            <ControlledInput name={'storageId'}
                                             label={'Склад'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                            <ControlledCheckbox name={'isShopWorking'}
                                                label={'Магазин работает'}
                                                control={formControl}
                                                divClassName={s.infoBlock_checkbox}
                            />
                            <Button onClick={() => {}} buttonDivWrapper={s.infoBlock_updateBtn}>
                                Сохранить
                            </Button>
                        </div>

                        <div className={s.footer_buttons}>
                            <Button type={'submit'}>
                                Создать магазин
                            </Button>
                            <Button onClick={() => {setOpen(false)}}
                                    buttonDivWrapper={s.shopStoreModal_exitBtn}
                            >
                                Выйти
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};