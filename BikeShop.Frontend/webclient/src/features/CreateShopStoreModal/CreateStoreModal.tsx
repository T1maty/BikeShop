import {useSnackbar} from 'notistack';
import {useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {ChangeEvent, useEffect} from 'react';
import {Modal, Checkbox} from '@mui/material';
import s from './CreateShopStoreModal.module.scss';
import {Button, ControlledInput} from '../../shared/ui';
import {Errors} from '../../entities/errors/workspaceErrors';
import useCreateStoreModal from './CreateStoreModalStore';

const CreateStoreModal = () => {

    const label = {inputProps: {'aria-label': 'Checkbox demo'}}

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const open = useCreateStoreModal(s => s.createStoreModal)
    const setOpen = useCreateStoreModal(s => s.setCreateStoreModal)
    const storeName = useCreateStoreModal(s => s.storeName)
    const storeWaiting = useCreateStoreModal(s => s.storeWaiting)
    const addNewStore = useCreateStoreModal(s => s.addNewStore)

    const formControl = useForm({
        defaultValues: {
            storeName: '',
            storeWaiting: '',
        }
    });
    const onSubmit: SubmitHandler<any> = () => {
        alert('Склад создан')

        // addNewShop().then((response: any) => {
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
            onClose={() => {
                setOpen(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.shopStoreModal_mainBlock}>
                <div className={s.shopStoreModal_infoBlock}>
                    Store
                </div>

                <div className={s.shopStoreModal_createBlock}>
                    <form onSubmit={formControl.handleSubmit(onSubmit)}>

                        <div className={s.shopStoreModal_inputFields}>
                            <div>
                                <ControlledInput name={'storeName'} label={'Название склада'}
                                                 control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div>
                                <ControlledInput name={'storeWaiting'} label={'Задержка поставки'}
                                                 control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div className={s.infoBlock_checkbox}>
                                <div className={s.infoBlock_checkboxItem}>
                                    <div><Checkbox {...label} /></div>
                                    <div>? Аутсорсный склад</div>
                                </div>
                            </div>
                            <div className={s.infoBlock_checkbox}>
                                <div className={s.infoBlock_checkboxItem}>
                                    <div><Checkbox {...label} /></div>
                                    <div>Магазин работает</div>
                                </div>
                            </div>
                            <div className={s.infoBlock_updateBtn}>
                                {/*<Button onClick={() => {setOpen(false)}}>*/}
                                {/*    Отмена*/}
                                {/*</Button>*/}
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
                            <Button onClick={() => {
                                setOpen(false)
                            }}>
                                Выйти
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default CreateStoreModal;