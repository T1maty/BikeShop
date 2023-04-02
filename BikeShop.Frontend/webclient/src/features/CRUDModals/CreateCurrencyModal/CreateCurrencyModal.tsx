import React, {useEffect} from 'react'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Modal} from '@mui/material'
import s from './CreateCurrencyModal.module.scss'
import {Button, ControlledCheckbox, ControlledCustomInput, ControlledInput, LoaderScreen} from '../../../shared/ui'
import {Errors} from '../../../entities/errors/workspaceErrors'
import useCreateCurrencyModal from "./CreateCurrencyModalStore"

export const CreateCurrencyModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useCreateCurrencyModal(s => s.openCurrencyModal)
    const setOpen = useCreateCurrencyModal(s => s.setOpenCreateCurrencyModal)
    const isLoading = useCreateCurrencyModal(s => s.isLoading)
    const errorStatus = useCreateCurrencyModal(s => s.errorStatus)

    const currencies = useCreateCurrencyModal(s => s.currencies)
    const currentCurrency = useCreateCurrencyModal(s => s.currentCurrency)
    const setCurrentCurrency = useCreateCurrencyModal(s => s.setCurrentCurrency)

    const getCurrencies = useCreateCurrencyModal(s => s.getCurrencies)
    const addCurrency = useCreateCurrencyModal(s => s.addCurrency)
    const updateCurrency = useCreateCurrencyModal(s => s.updateCurrency)

    const formControl = useForm<any>({
        defaultValues: {
            id: 0,
            name: '',
            symbol: '',
            coefficient: 1,
            baseCurrency: true,
            enabled: true,
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        if (currentCurrency === null) {
            addCurrency(data)
        }
        if (currentCurrency !== null) {
            updateCurrency(data)
        }
    }

    useEffect(() => {
        formControl.reset()
        formControl.setValue('id', currentCurrency ? currentCurrency.id : 0)
        formControl.setValue('name', currentCurrency ? currentCurrency.name : '')
        formControl.setValue('symbol', currentCurrency ? currentCurrency.symbol : '')
        formControl.setValue('coefficient', currentCurrency ? currentCurrency.coefficient : 1)
        formControl.setValue('isBaseCurrency', currentCurrency ? currentCurrency.isBaseCurrency : true)
        formControl.setValue('enabled', currentCurrency ? currentCurrency.enabled : true)
    }, [currentCurrency])

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
        getCurrencies()
    }, [])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={s.shopStorageModal_mainBlock}>
                    <div className={s.shopStorageModal_shops}>
                        <div className={s.shopStorageModal_shopList}>
                            {
                                currencies.map(cur => (
                                    <div key={cur.id}
                                         className={cur.id === currentCurrency?.id ? s.shop_item_active : s.shop_item}
                                         onClick={() => {setCurrentCurrency(cur)}}
                                    >
                                        <div><span>ID:</span> {cur.id}</div>
                                        <div><span>Название:</span> {cur.name}</div>
                                        <div><span>Символ:</span> {cur.symbol}</div>
                                        <div><span>Коэффициент:</span> {cur.coefficient}</div>
                                        <div><span>Базовая валюта:</span> {cur.isBaseCurrency ? 'Да' : 'Нет'}</div>
                                        <div><span>Активна:</span> {cur.enabled ? 'Да' : 'Нет'}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className={s.shopStorageModal_createBlock}>
                        <form onSubmit={formControl.handleSubmit(onSubmit)}>
                            <div className={s.shopStorageModal_inputFields}>
                                {/*<ControlledInput name={'name'}*/}
                                {/*                 label={'Название'}*/}
                                {/*                 control={formControl}*/}
                                {/*                 rules={{required: Errors[0].name}}*/}
                                {/*/>*/}
                                <ControlledCustomInput name={'name'}
                                                       placeholder={'Название'}
                                                       control={formControl}
                                                       rules={{required: Errors[0].name}}
                                />
                                {/*<ControlledInput name={'symbol'}*/}
                                {/*                 label={'Символ'}*/}
                                {/*                 control={formControl}*/}
                                {/*                 rules={{required: Errors[0].name}}*/}
                                {/*/>*/}
                                <ControlledCustomInput name={'symbol'}
                                                       placeholder={'Символ'}
                                                       control={formControl}
                                                       rules={{required: Errors[0].name}}
                                />
                                {/*<ControlledInput name={'coefficient'}*/}
                                {/*                 label={'Коэффициент'}*/}
                                {/*                 control={formControl}*/}
                                {/*                 rules={{required: Errors[0].name}}*/}
                                {/*/>*/}
                                <ControlledCustomInput name={'coefficient'}
                                                       placeholder={'Коэффициент'}
                                                       control={formControl}
                                                       rules={{required: Errors[0].name}}
                                />
                                <ControlledCheckbox name={'isBaseCurrency'}
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
        )
    }
}