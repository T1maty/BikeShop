import React, {useEffect} from 'react'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Modal} from '@mui/material'
import s from './CreateQuantityUnitModal.module.scss'
import {Button, ControlledCheckbox, ControlledInput} from '../../shared/ui'
import {Errors} from '../../entities/errors/workspaceErrors'
import useCreateQuantityUnitModal from "./CreateQuantityUnitModalStore"

export const CreateQuantityUnitModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useCreateQuantityUnitModal(s => s.openQuantityUnitModal)
    const setOpen = useCreateQuantityUnitModal(s => s.setOpenCreateQuantityUnitModal)

    const quantityUnits = useCreateQuantityUnitModal(s => s.quantityUnits)
    const currentQuantityUnit = useCreateQuantityUnitModal(s => s.currentQuantityUnit)
    const setCurrentQuantityUnit = useCreateQuantityUnitModal(s => s.setCurrentQuantityUnit)

    const getQuantityUnits = useCreateQuantityUnitModal(s => s.getQuantityUnits)
    const addQuantityUnit = useCreateQuantityUnitModal(s => s.addQuantityUnit)
    const updateQuantityUnit = useCreateQuantityUnitModal(s => s.updateQuantityUnit)

    const formControl = useForm<any>({
        defaultValues: {
            id: 0,
            name: '',
            fullName: '',
            groupId: 1,
            baseCoeficient: 1,
            isDefaultInGroup: true,
            isSwitchable: true,
            isSplittable: true,
            enabled: true,
        }
    });
    const onSubmit: SubmitHandler<any> = (data: any) => {
        if (currentQuantityUnit === null) {
            addQuantityUnit(data).then((res: any) => {
                formControl.reset()
                enqueueSnackbar('Валюта создана', {variant: 'success', autoHideDuration: 3000})
            }).catch((error: any) => {
                let message = error(error.response.data.errorDescription).toString()
                formControl.setError('name', {type: 'serverError', message: message})
                enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
                console.error(error.response.data)
            })
        }

        if (currentQuantityUnit !== null) {
            updateQuantityUnit(data).then((res: any) => {
                enqueueSnackbar('Валюта обновлена', {variant: 'success', autoHideDuration: 3000})
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

        formControl.setValue('id', currentQuantityUnit ?
            currentQuantityUnit.id : 0)
        formControl.setValue('name', currentQuantityUnit ?
            currentQuantityUnit.name : '')
        formControl.setValue('fullName', currentQuantityUnit ?
            currentQuantityUnit.fullName : '')
        formControl.setValue('groupId', currentQuantityUnit ?
            currentQuantityUnit.groupId : 1)
        formControl.setValue('baseCoeficient', currentQuantityUnit ?
            currentQuantityUnit.baseCoeficient : 1)
        formControl.setValue('isDefaultInGroup', currentQuantityUnit ?
            currentQuantityUnit.isDefaultInGroup : true)
        formControl.setValue('isSwitchable', currentQuantityUnit ?
            currentQuantityUnit.isSwitchable : true)
        formControl.setValue('isSplittable', currentQuantityUnit ?
            currentQuantityUnit.isSplittable : true)
        formControl.setValue('enabled', currentQuantityUnit ?
            currentQuantityUnit.enabled : true)
    }, [currentQuantityUnit])

    useEffect(() => {
        getQuantityUnits()
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
                                     setCurrentQuantityUnit(qu)
                                     console.log(qu)
                                 }}
                            >
                                <div><span>ID:</span> {qu.id}</div>
                                <div><span>Название:</span> {qu.name}</div>
                                <div><span>Полное название:</span> {qu.fullName}</div>
                                <div><span>Коэффициент:</span> {qu.baseCoeficient}</div>
                                <div><span>По умолчанию:</span> {qu.isDefaultInGroup ? 'Да' : 'Нет'}</div>
                                <div><span>Конвертируемость:</span> {qu.isSwitchable ? 'Да' : 'Нет'}</div>
                                <div><span>Делимость:</span> {qu.isSplittable ? 'Да' : 'Нет'}</div>
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
                            <ControlledInput name={'baseCoeficient'}
                                             label={'Коэффициент'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                            <ControlledCheckbox name={'isDefaultInGroup'}
                                                label={'По умолчанию'}
                                                control={formControl}
                                                divClassName={s.infoBlock_checkbox}
                            />
                            <ControlledCheckbox name={'isSwitchable'}
                                                label={'Конвертируемость'}
                                                control={formControl}
                                                divClassName={s.infoBlock_checkbox}
                            />
                            <ControlledCheckbox name={'isSplittable'}
                                                label={'Делимость'}
                                                control={formControl}
                                                divClassName={s.infoBlock_checkbox}
                            />
                            <ControlledCheckbox name={'enabled'}
                                                label={'Включена'}
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