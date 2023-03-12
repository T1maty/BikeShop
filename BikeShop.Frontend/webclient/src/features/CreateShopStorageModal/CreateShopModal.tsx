import {useSnackbar} from 'notistack';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {Modal} from '@mui/material';
import s from './CreateShopStorageModal.module.scss';
import {Button, ControlledCheckbox, ControlledInput} from '../../shared/ui';
import {Errors} from '../../entities/errors/workspaceErrors';
import useCreateShopModal from './CreateShopModalStore';
import {CreateShop, IUser} from '../../entities';

export const CreateShopModal = () => {

    const {enqueueSnackbar} = useSnackbar()
    // const [isCreating, setIsCreating] = useState(false)

    const open = useCreateShopModal(s => s.createShopModal)
    const setOpen = useCreateShopModal(s => s.setOpenCreateShopModal)
    const currentShop = useCreateShopModal(s => s.currentShop)
    const setCurrentShop = useCreateShopModal(s => s.setCurrentShop)
    const shops = useCreateShopModal(s => s.shops)
    const getShops = useCreateShopModal(s => s.getShops)
    const addNewShop = useCreateShopModal(s => s.addNewShop)
    const updateShopInfo = useCreateShopModal(s => s.updateShopInfo)

    const formControl = useForm({
        defaultValues: {
            name: '',
            address: '',
            phone: '',
            secret: '',
            storageId: 0,
            // enabled: true,
        }
    });
    const onSubmit: SubmitHandler<any> = (data: CreateShop) => {
        if (currentShop === null) {
            addNewShop(data).then((res: any) => {
                formControl.reset()
                getShops()
                enqueueSnackbar('Магазин создан', {variant: 'success', autoHideDuration: 3000})
            }).catch((error: any) => {
                let message = error(error.response.data.errorDescription).toString()
                formControl.setError('name', {type: 'serverError', message: message})
                enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
                console.error(error.response.data)
            })
        }

        if (currentShop !== null) {
            updateShopInfo(data).then((res: any) => {
                formControl.reset()
                getShops()
                enqueueSnackbar('Магазин обновлён', {variant: 'success', autoHideDuration: 3000})
            }).catch((error: any) => {
                let message = error(error.response.data.errorDescription).toString()
                formControl.setError('name', {type: 'serverError', message: message})
                enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
                console.error(error.response.data)
            })
        }
    }

    useEffect(() => {
        getShops()

        formControl.reset()
        formControl.setValue('name', currentShop ? currentShop.name : '')
        formControl.setValue('address', currentShop ? currentShop.address : '')
        formControl.setValue('phone', currentShop ? currentShop.phone : '')
        formControl.setValue('secret', currentShop ? currentShop.secret : '')
        formControl.setValue('storageId', currentShop ? currentShop.storageId : 0)
        // formControl.setValue('enabled', currentShop ? currentShop.enabled : true)
    }, [currentShop])

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
                    <div className={s.shopStoreModal_shopList}>
                        {shops.map(shop => (
                            <div className={shop.id === currentShop?.id ? s.shop_item_active : s.shop_item} key={shop.id} onClick={() => {setCurrentShop(shop); console.log(shop)}}>
                                <div>ID: {shop.id}</div>
                                <div>Название: {shop.name}</div>
                                <div>Адрес: {shop.address}</div>
                                <div>Телефон: {shop.phone}</div>
                                <div>Склад: {shop.storageId}</div>
                                <div>Активен: {shop.enabled ? 'Да' : 'Нет'}</div>
                            </div>
                        ))}
                    </div>
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
                            <ControlledCheckbox name={'enabled'}
                                                label={'Магазин работает'}
                                                control={formControl}
                                                divClassName={s.infoBlock_checkbox}
                            />
                            {/*<Button buttonDivWrapper={s.infoBlock_updateBtn}*/}
                            {/*        disabled={currentShop === null}*/}
                            {/*        onClick={() => {}}*/}
                            {/*>*/}
                            {/*    Сохранить*/}
                            {/*</Button>*/}
                            <Button buttonDivWrapper={s.infoBlock_cancelBtn}
                                disabled={currentShop === null}
                                onClick={() => {setCurrentShop(null)}}
                            >
                                Отмена
                            </Button>
                        </div>

                        <div className={s.footer_buttons}>
                            <Button type={'submit'}>
                                {currentShop === null ? 'Создать магазин' : 'Обновить данные'}
                            </Button>
                            {/*<Button buttonDivWrapper={s.shopStoreModal_exitBtn}*/}
                            {/*        onClick={() => {setOpen(false)}}*/}
                            {/*>*/}
                            {/*    Выйти*/}
                            {/*</Button>*/}
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};