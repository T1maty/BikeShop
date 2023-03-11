import React, {ChangeEvent, useEffect, useRef} from 'react';
import {Modal} from '@mui/material';
import {Button, ControlledCustomInput, CustomSearchInput} from '../../shared/ui';
import s from './ChooseClientModal.module.scss'
import Input from '../../shared/ui/Input/Input';
import {SubmitHandler, useForm} from 'react-hook-form';
import {CreateUser, IUser} from '../../entities';
import {useSnackbar} from 'notistack';
import {useDebounce} from '../../shared/hooks/useDebounce';
import useChooseClientModal from './ChooseClientModalStore';
import {Errors} from '../../entities/errors/workspaceErrors';

interface ChooseClientModalProps {
    extraCallback: (user: IUser) => void

    state?: boolean
    setState?: (state: boolean) => void
}

export const ChooseClientModal: React.FC<ChooseClientModalProps> = ({extraCallback, state, setState}) => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useChooseClientModal(s => s.chooseClientModal)
    const setOpen = useChooseClientModal(s => s.setChooseClientModal)
    const isLoading = useChooseClientModal(s => s.isLoading)

    const users = useChooseClientModal(s => s.users)
    const fio = useChooseClientModal(s => s.fio)
    const setFIO = useChooseClientModal(s => s.setFIO)
    const phoneNumber = useChooseClientModal(s => s.phoneNumber)
    const setPhoneNumber = useChooseClientModal(s => s.setPhoneNumber)
    const findUser = useChooseClientModal(s => s.findUser)
    const addNewUser = useChooseClientModal(s => s.addNewUser)

    const searchClientByFIO = useDebounce<string>(fio, 1000)
    const searchClientByPhone = useDebounce<string>(phoneNumber, 1000)

    const formControl = useForm({
        defaultValues: {
            lastName: '',
            firstName: '',
            patronymic: '',
            phone: ''
        }
    });
    const onSubmit: SubmitHandler<CreateUser> = (data: CreateUser) => {
        addNewUser(data).then((response) => {

            setState ? setState(false) : setOpen(false)////

            formControl.reset()
            enqueueSnackbar('Клиент добавлен', {variant: 'success', autoHideDuration: 3000})
        }).catch((error) => {
            let message = error(error.response.data.errorDescription).toString()
            formControl.setError('phone', {type: 'serverError', message: message})
            enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
            console.error(error.response.data)
        })
    }

    // зачистка инпутов
    /*const clearFioInput = () => {
        setFIO('')
        setUsers([])
    }
    const clearPhoneInput = () => {
        setPhoneNumber('')
        setUsers([])
    }*/

    const userClickHandler = (user: IUser) => {
        extraCallback(user)
    }

    useEffect(() => {
        if (fio.length > 0 || phoneNumber.length > 0) {
            findUser({fio, phoneNumber});
        }
    }, [searchClientByFIO, searchClientByPhone])

    return (
        <Modal
            open={state ? state : open}
            onClose={() => {setState ? setState(false) : setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={formControl.handleSubmit(onSubmit)}>
                <div className={s.clientModal_mainBox}>
                    <div className={s.clientModal_searchBlock}>
                        <div className={s.clientModal_searchBlock_title}>
                            Найти клиента:
                        </div>
                        <CustomSearchInput placeholder={'Введите фамилию'}
                                           value={fio}
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                               setFIO(e.currentTarget.value)}}
                                           clearInputValue={() => {setFIO('')}}
                        />
                        {/*<div className={s.clientModal_searchBlock_input}>*/}
                        {/*    <Input placeholder={'Введите фамилию'} value={fio}*/}
                        {/*           onChange={(e: ChangeEvent<HTMLInputElement>) => {*/}
                        {/*               setFIO(e.currentTarget.value)*/}
                        {/*           }}*/}
                        {/*           clearInputValue={() => {*/}
                        {/*               setFIO('')*/}
                        {/*           }}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <CustomSearchInput placeholder={'Введите номер телефона'}
                                           value={phoneNumber}
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                               setPhoneNumber(e.currentTarget.value)}}
                                           clearInputValue={() => {setPhoneNumber('')}}
                        />
                        {/*<div className={s.clientModal_searchBlock_input}>*/}
                        {/*    <Input placeholder={'Введите номер телефона'} value={phoneNumber}*/}
                        {/*           onChange={(e: ChangeEvent<HTMLInputElement>) => {*/}
                        {/*               setPhoneNumber(e.currentTarget.value)*/}
                        {/*           }}*/}
                        {/*           clearInputValue={() => {*/}
                        {/*               setPhoneNumber('')*/}
                        {/*           }}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className={s.clientModal_searchBlock_textField}>
                            {
                                users.length === 0
                                    ?
                                    <div>Клиент не найден</div>
                                    :
                                    isLoading
                                        ? <div>Поиск...</div> :
                                        users.map((u: any) => {
                                            return (
                                                <div className={s.textField_contentItem} key={u.user.id}
                                                     onClick={() => {
                                                         userClickHandler(u.user)
                                                     }}
                                                >
                                                    {u.user.lastName} {u.user.firstName} {u.user.patronymic}
                                                </div>
                                            )
                                        })
                            }
                        </div>
                    </div>

                    <div className={s.clientModal_addClient}>
                        <div className={s.addClient_title}>
                            Создать клиента:
                        </div>
                        <div className={s.addClient_inputs}>
                            <ControlledCustomInput name={'lastName'}
                                                   placeholder={'Фамилия'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                            <ControlledCustomInput name={'firstName'}
                                                   placeholder={'Имя'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                            <ControlledCustomInput name={'patronymic'}
                                                   placeholder={'Отчество'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                            <ControlledCustomInput name={'phone'}
                                                   placeholder={'Номер телефона'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                        </div>
                        <div className={s.addClient_buttonsBlock}>
                            <Button type={'submit'}>
                                Добавить клиента
                            </Button>
                            <Button className={s.buttonsBlock_cancelButton}
                                    onClick={() => {
                                        setState ? setState(false) : setOpen(false)
                                    }}
                            >
                                Отмена
                            </Button>
                        </div>
                    </div>

                </div>
            </form>
        </Modal>
    );
};