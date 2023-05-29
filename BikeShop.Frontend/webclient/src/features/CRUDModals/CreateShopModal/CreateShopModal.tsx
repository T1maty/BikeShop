import React, {useEffect} from 'react'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm} from 'react-hook-form'
import s from './CreateShopModal.module.scss'
import {Button, ControlledCustomCheckbox, ControlledCustomInput, CustomModal, LoaderScreen} from '../../../shared/ui'
import {Errors} from '../../../entities/errors/workspaceErrors'
import useCreateShopModal from './CreateShopModalStore'
import {UpdateShop} from '../../../entities'

export const CreateShopModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useCreateShopModal(s => s.openCreateShopModal)
    const setOpen = useCreateShopModal(s => s.setOpenCreateShopModal)
    const isLoading = useCreateShopModal(s => s.isLoading)
    const errorStatus = useCreateShopModal(s => s.errorStatus)

    const currentShop = useCreateShopModal(s => s.currentShop)
    const setCurrentShop = useCreateShopModal(s => s.setCurrentShop)
    const shops = useCreateShopModal(s => s.shops)
    const getShops = useCreateShopModal(s => s.getShops)
    const addNewShop = useCreateShopModal(s => s.addNewShop)
    const updateShopInfo = useCreateShopModal(s => s.updateShopInfo)

    const formControl = useForm<UpdateShop>({
        defaultValues: {
            id: 0,
            name: '',
            address: '',
            phone: '',
            secret: '',
            storageId: 1,
            enabled: true,
        }
    })

    const onSubmit: SubmitHandler<UpdateShop> = (data: UpdateShop) => {
        if (currentShop === null) {
            addNewShop(data)
        }
        if (currentShop !== null) {
            updateShopInfo(data)
        }
    }

    useEffect(() => {
        formControl.reset()
        formControl.setValue('id', currentShop ? currentShop.id : 0)
        formControl.setValue('name', currentShop ? currentShop.name : '')
        formControl.setValue('address', currentShop ? currentShop.address : '')
        formControl.setValue('phone', currentShop ? currentShop.phone : '')
        formControl.setValue('secret', currentShop ? currentShop.secret : '')
        formControl.setValue('storageId', currentShop ? currentShop.storageId : 1)
        formControl.setValue('enabled', currentShop ? currentShop.enabled : true)
    }, [currentShop])

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
        open ? getShops() : false;
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
                            {shops.map(shop => (
                                <div key={shop.id}
                                     className={shop.id === currentShop?.id ? s.shop_item_active : s.shop_item}
                                     onClick={() => {
                                         setCurrentShop(shop)
                                     }}
                                >
                                    <div><span>ID:</span> {shop.id}</div>
                                    <div><span>Название:</span> {shop.name}</div>
                                    <div><span>Адрес:</span> {shop.address}</div>
                                    <div><span>Телефон:</span> {shop.phone}</div>
                                    <div><span>Склад:</span> {shop.storageId}</div>
                                    <div><span>Активен:</span> {shop.enabled ? 'Да' : 'Нет'}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={s.shopStorageModal_createBlock}>
                        <form onSubmit={formControl.handleSubmit(onSubmit)}>
                            <div className={s.shopStorageModal_inputFields}>
                                <ControlledCustomInput name={'name'}
                                                       placeholder={'Название магазина'}
                                                       control={formControl}
                                                       rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomInput name={'address'}
                                                       placeholder={'Адрес магазина'}
                                                       control={formControl}
                                                       rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomInput name={'phone'}
                                                       placeholder={'Телефон магазина'}
                                                       control={formControl}
                                                       rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomInput name={'secret'}
                                                       placeholder={'Пароль'}
                                                       control={formControl}
                                                       rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomInput name={'storageId'}
                                                       placeholder={'Склад'}
                                                       control={formControl}
                                                       rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomCheckbox name={'enabled'}
                                                          label={'Магазин работает'}
                                                          control={formControl}
                                                          divClassName={s.infoBlock_checkbox}
                                />
                                <Button buttonDivWrapper={s.infoBlock_cancelBtn}
                                        disabled={currentShop === null}
                                        onClick={() => {
                                            setCurrentShop(null)
                                        }}
                                >
                                    Отмена
                                </Button>
                            </div>
                            <div className={s.footer_buttons}>
                                <Button type={'submit'}>
                                    {currentShop === null ? 'Создать магазин' : 'Обновить данные'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </CustomModal>
        )
    }
}