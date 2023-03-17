import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm} from 'react-hook-form'
import React, {useEffect, useState} from 'react'
import {Modal} from '@mui/material'
import s from './CreateQuantityUnitModal.module.scss'
import {Button, ControlledCheckbox, ControlledInput} from '../../shared/ui'
import {Errors} from '../../entities/errors/workspaceErrors'
import useCreateQuantityUnitModal from "./CreateQuantityUnitModalStore";

export const CreateQuantityUnitModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useCreateQuantityUnitModal(s => s.openQuantityUnitModal)
    const setOpen = useCreateQuantityUnitModal(s => s.setOpenCreateQuantityUnitModal)

    const currentQuantityUnit = useCreateQuantityUnitModal(s => s.currentQuantityUnit)
    const setCurrentQuantityUnit = useCreateQuantityUnitModal(s => s.setCurrentQuantityUnit)
    // const quantityUnits = useCreateQuantityUnitModal(s => s.quantityUnits)
    // const getShops = useCreateQuantityUnitModal(s => s.getShops)
    // const addNewShop = useCreateQuantityUnitModal(s => s.addNewShop)
    // const updateShopInfo = useCreateQuantityUnitModal(s => s.updateShopInfo)

    // для тестирования вёрстки
    const quantityUnits = [
        {id: 1, name: 'Рубль', fullName: 'RU', coefficient: 1, isDefault: true, isDivide: true, isConvert: true, enabled: true },
        {id: 2, name: 'Рубль', fullName: 'RU', coefficient: 1, isDefault: true, isDivide: true, isConvert: true, enabled: true },
        {id: 3, name: 'Рубль', fullName: 'RU', coefficient: 1, isDefault: true, isDivide: true, isConvert: true, enabled: true },
    ]

    const formControl = useForm<any>({
        defaultValues: {
            id: 0,
            name: '',
            fullName: '',
            coefficient: 1,
            isDefault: true,
            isDivide: true,
            isConvert: true,
            enabled: true,
        }
    });
    const onSubmit: SubmitHandler<any> = (data: any) => {
        // if (currentShop === null) {
        //     addNewShop(data).then((res: any) => {
        //         formControl.reset()
        //         getShops()
        //         enqueueSnackbar('Магазин создан', {variant: 'success', autoHideDuration: 3000})
        //     }).catch((error: any) => {
        //         let message = error(error.response.data.errorDescription).toString()
        //         formControl.setError('name', {type: 'serverError', message: message})
        //         enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
        //         console.error(error.response.data)
        //     })
        // }
        //
        // if (currentShop !== null) {
        //     updateShopInfo(data).then((res: any) => {
        //         getShops()
        //         enqueueSnackbar('Магазин обновлён', {variant: 'success', autoHideDuration: 3000})
        //     }).catch((error: any) => {
        //         let message = error(error.response.data.errorDescription).toString()
        //         formControl.setError('name', {type: 'serverError', message: message})
        //         enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
        //         console.error(error.response.data)
        //     })
        // }
    }

    useEffect(() => {
        formControl.reset()
        formControl.setValue('id', currentQuantityUnit ? currentQuantityUnit.id : 0)
        formControl.setValue('name', currentQuantityUnit ? currentQuantityUnit.name : '')
        formControl.setValue('fullName', currentQuantityUnit ? currentQuantityUnit.fullName : '')
        formControl.setValue('coefficient', currentQuantityUnit ? currentQuantityUnit.coefficient : 1)
        formControl.setValue('isDefault', currentQuantityUnit ? currentQuantityUnit.isDefault : true)
        formControl.setValue('isDivide', currentQuantityUnit ? currentQuantityUnit.isDivide : true)
        formControl.setValue('isConvert', currentQuantityUnit ? currentQuantityUnit.isConvert : true)
        formControl.setValue('enabled', currentQuantityUnit ? currentQuantityUnit.enabled : true)
    }, [currentQuantityUnit])

    useEffect(() => {
        // getShops()
    }, [])

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.shopStorageModal_mainBlock}>
                <div className={s.shopStorageModal_tree}>
                    TreeView
                </div>
                <div className={s.shopStorageModal_shops}>
                    <div className={s.shopStorageModal_shopList}>
                        {quantityUnits.map(qu => (
                            <div key={qu.id}
                                 className={qu.id === currentQuantityUnit?.id ? s.shop_item_active : s.shop_item}
                                 onClick={() => {
                                     setCurrentQuantityUnit(qu);
                                     console.log(qu)
                                 }}
                            >
                                <div><span>ID:</span> {qu.id}</div>
                                <div><span>Название:</span> {qu.name}</div>
                                <div><span>Полное название:</span> {qu.fullName}</div>
                                <div><span>Коэффициент:</span> {qu.coefficient}</div>
                                <div><span>По умолчанию:</span> {qu.isDefault ? 'Да' : 'Нет'}</div>
                                <div><span>Делимость:</span> {qu.isDivide ? 'Да' : 'Нет'}</div>
                                <div><span>Конвертируемость:</span> {qu.isConvert ? 'Да' : 'Нет'}</div>
                                <div><span>Включена:</span> {qu.enabled ? 'Да' : 'Нет'}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={s.shopStorageModal_createBlock}>
                    <form onSubmit={formControl.handleSubmit(onSubmit)}>
                        <div className={s.shopStorageModal_inputFields}>
                            <ControlledInput name={'name'}
                                             label={'Название'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                            <ControlledInput name={'fullName'}
                                             label={'Полное название'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                            <ControlledInput name={'coefficient'}
                                             label={'Коэффициент'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                            <ControlledCheckbox name={'isDefault'}
                                                label={'По умолчанию'}
                                                control={formControl}
                                                divClassName={s.infoBlock_checkbox}
                            />
                            <ControlledCheckbox name={'isDivide'}
                                                label={'Делимость'}
                                                control={formControl}
                                                divClassName={s.infoBlock_checkbox}
                            />
                            <ControlledCheckbox name={'isConvert'}
                                                label={'Конвертируемость'}
                                                control={formControl}
                                                divClassName={s.infoBlock_checkbox}
                            />
                            <ControlledCheckbox name={'enabled'}
                                                label={'Валюта включена'}
                                                control={formControl}
                                                divClassName={s.infoBlock_checkbox}
                            />
                            <Button buttonDivWrapper={s.infoBlock_cancelBtn}
                                    disabled={currentQuantityUnit === null}
                                    onClick={() => {setCurrentQuantityUnit(null)}}
                            >
                                Отмена
                            </Button>
                        </div>
                        <div className={s.footer_buttons}>
                            <Button type={'submit'}>
                                {currentQuantityUnit === null ? 'Создать ед.измерения' : 'Обновить данные'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};