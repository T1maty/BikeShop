import React, {useEffect} from 'react'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Modal} from '@mui/material'
import s from './CreateCurrencyModal.module.scss'
import {Button, ControlledCheckbox, ControlledInput} from '../../shared/ui'
import {Errors} from '../../entities/errors/workspaceErrors'
import useCreateCurrencyModal from "./CreateCurrencyModalStore"

export const CreateCurrencyModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useCreateCurrencyModal(s => s.openCurrencyModal)
    const setOpen = useCreateCurrencyModal(s => s.setOpenCreateCurrencyModal)

    // const currencies = useCreateCurrencyModal(s => s.currencies)
    const currentCurrency = useCreateCurrencyModal(s => s.currentCurrency)
    const setCurrentCurrency = useCreateCurrencyModal(s => s.setCurrentCurrency)
    // const getСurrencies = useCreateCurrencyModal(s => s.getСurrencies)
    // const addCurrency = useCreateCurrencyModal(s => s.addCurrency)
    // const updateCurrency = useCreateCurrencyModal(s => s.updateCurrency)

    // для тестирования вёрстки
    const currencies = [
        {id: 1, name: 'Рубль', symbol: 'RU', coefficient: 1, baseCurrency: true, enabled: true },
        {id: 2, name: 'Гривна', symbol: 'GR', coefficient: 1, baseCurrency: true, enabled: true },
        {id: 3, name: 'Доллар', symbol: 'S', coefficient: 1, baseCurrency: true, enabled: true },
        {id: 4, name: 'Евро', symbol: 'E', coefficient: 1, baseCurrency: true, enabled: true },
    ]

    const formControl = useForm<any>({
        defaultValues: {
            id: 0,
            name: '',
            symbol: '',
            coefficient: 1,
            baseCurrency: true,
            enabled: true,
        }
    });
    const onSubmit: SubmitHandler<any> = (data: any) => {
        // if (currentShop === null) {
        //     addCurrency(data).then((res: any) => {
        //         formControl.reset()
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
        //     updateCurrency(data).then((res: any) => {
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
        formControl.setValue('id', currentCurrency ? currentCurrency.id : 0)
        formControl.setValue('name', currentCurrency ? currentCurrency.name : '')
        formControl.setValue('symbol', currentCurrency ? currentCurrency.symbol : '')
        formControl.setValue('coefficient', currentCurrency ? currentCurrency.coefficient : 1)
        formControl.setValue('baseCurrency', currentCurrency ? currentCurrency.baseCurrency : true)
        formControl.setValue('enabled', currentCurrency ? currentCurrency.enabled : true)
    }, [currentCurrency])

    useEffect(() => {
        // getСurrencies()
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
                        {currencies.map(cur => (
                            <div key={cur.id}
                                 className={cur.id === currentCurrency?.id ? s.shop_item_active : s.shop_item}
                                 onClick={() => {
                                     setCurrentCurrency(cur);
                                     console.log(cur)
                                 }}
                            >
                                <div><span>ID:</span> {cur.id}</div>
                                <div><span>Название:</span> {cur.name}</div>
                                <div><span>Символ:</span> {cur.symbol}</div>
                                <div><span>Коэффициент:</span> {cur.coefficient}</div>
                                <div><span>Базовая валюта:</span> {cur.baseCurrency ? 'Да' : 'Нет'}</div>
                                <div><span>Активна:</span> {cur.enabled ? 'Да' : 'Нет'}</div>
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
                            <ControlledInput name={'symbol'}
                                             label={'Символ'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                            <ControlledInput name={'coefficient'}
                                             label={'Коэффициент'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                            <ControlledCheckbox name={'baseCurrency'}
                                                label={'Базовая валюта'}
                                                control={formControl}
                                                divClassName={s.infoBlock_checkbox}
                            />
                            <ControlledCheckbox name={'enabled'}
                                                label={'Валюта включена'}
                                                control={formControl}
                                                divClassName={s.infoBlock_checkbox}
                            />
                            <Button buttonDivWrapper={s.infoBlock_cancelBtn}
                                    disabled={currentCurrency === null}
                                    onClick={() => {setCurrentCurrency(null)}}
                            >
                                Отмена
                            </Button>
                        </div>
                        <div className={s.footer_buttons}>
                            <Button type={'submit'}>
                                {currentCurrency === null ? 'Создать валюту' : 'Обновить данные'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};