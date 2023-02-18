import React, {useEffect, ChangeEvent, ChangeEventHandler} from 'react';
import {Modal, TextField} from '@mui/material';
import {Button, ControlledInput} from '../../shared/ui';
import s from './ChooseClientModal.module.scss'
import Input from '../../shared/ui/Input/Input';
import {useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import {CreateUser} from '../../entities';
import {useSnackbar} from 'notistack';
import {Loader} from "../../shared/ui/Loader/Loader";
import {PageLoader} from "../../shared/ui/PageLoader/PageLoader";
import {useDebounce} from "../../shared/hooks/useDebounce";
import useChooseClientModal from './ChooseClientModalStore';
import useClientCard from "../../widgets/workspace/ClientCard/ClientCardStore";
import {BikeShopPaths} from "../../app/routes/paths";
import {Errors} from "../../entities/errors/workspaceErrors";
import useCashboxGlobal from "../../pages/workspace/Cashbox/CashboxGlobalStore";

const ChooseClientModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useChooseClientModal(s => s.chooseClientModal)
    const setOpen = useChooseClientModal(s => s.setChooseClientModal)
    const isLoading = useChooseClientModal(s => s.isLoading)

    const users = useChooseClientModal(s => s.users)
    // const fio = useChooseClientModal(s => s.fio)
    // const setFIO = useChooseClientModal(s => s.setFIO)
    // const phoneNumber = useChooseClientModal(s => s.phoneNumber)
    // const setPhoneNumber = useChooseClientModal(s => s.setPhoneNumber)
    const fio = useCashboxGlobal(s => s.fio)
    const setFIO = useCashboxGlobal(s => s.setFIO)
    const phoneNumber = useCashboxGlobal(s => s.phoneNumber)
    const setPhoneNumber = useCashboxGlobal(s => s.setPhoneNumber)
    // const getUsers = useChooseClientModal(s => s.getUsers)
    // const setUsers = useChooseClientModal(s => s.setUsers)
    const findUser = useChooseClientModal(s => s.findUser)
    const addNewUser = useChooseClientModal(s => s.addNewUser)

    const setCardLastName = useClientCard(s => s.setCardLastName)
    const setCardFirstName = useClientCard(s => s.setCardFirstName)
    const setCardPatronymic = useClientCard(s => s.setCardPatronymic)
    const setCardPhoneNumber = useClientCard(s => s.setCardPhoneNumber)

    const searchClientByFIO = useDebounce<string>(fio, 1000)
    const searchClientByPhone = useDebounce<string>(phoneNumber, 1000)

    const formControl = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            patronymic: '',
            phone: ''
        }
    });
    const onSubmit: SubmitHandler<CreateUser> = (data: CreateUser) => {
        addNewUser(data).then((response) => {
            setOpen(false)

            formControl.setValue('firstName', '')
            formControl.setValue('lastName', '')
            formControl.setValue('patronymic', '')
            formControl.setValue('phone', '')

            enqueueSnackbar('Клиент добавлен', {variant: 'success', autoHideDuration: 3000})
        }).catch((error) => {
            let message = error(error.response.data.errorDescription).toString()
            formControl.setError('firstName', {type: 'serverError', message: message})
            enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
            console.error(error.response.data)
        })
    }

    const setInfoToClientCard = (clientCard: {userId: string, lastName: string,
        firstName: string, patronymic: string, phoneNumber: string}) => {
        console.log(clientCard)

        setCardLastName(clientCard.lastName)
        setCardFirstName(clientCard.firstName)
        setCardPatronymic(clientCard.patronymic)
        setCardPhoneNumber(clientCard.phoneNumber)

        setOpen(false)
    }

    /*const clearFioInput = () => {
        setFIO('')
        setUsers([])
    }
    const clearPhoneInput = () => {
        setPhoneNumber('')
        setUsers([])
    }*/

    useEffect(() => {
        if (fio.length > 0 || phoneNumber.length > 0) {
            findUser({fio, phoneNumber});
        }
    }, [searchClientByFIO, searchClientByPhone])

    // useEffect(() => {
    //     if (chooseClientModal) {
    //         getUsers()
    //         //     .then((res: any) => {
    //         //     setUsers(res.data.users)
    //         // })
    //         console.log('getUsers request in IF')
    //     }
    //     console.log('getUsers request without IF')
    // }, [chooseClientModal])

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={formControl.handleSubmit(onSubmit)}>
                <div className={s.clientModal_mainBox}>
                    <div className={s.clientModal_searchBlock}>
                        <div className={s.clientModal_searchBlock_title}>
                            Найти клиента:
                        </div>
                        <div className={s.clientModal_searchBlock_input}>
                            <Input placeholder={'Введите фамилию'} value={fio}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                       setFIO(e.currentTarget.value)}}
                                   clearInputValue={() => {setFIO('')}}
                            />
                        </div>
                        <div className={s.clientModal_searchBlock_input}>
                            <Input placeholder={'Введите номер телефона'} value={phoneNumber}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                       setPhoneNumber(e.currentTarget.value)}}
                                   clearInputValue={() => {setPhoneNumber('')}}
                            />
                        </div>
                        <div className={s.clientModal_searchBlock_textField}>
                            {
                                users.length === 0
                                    ?
                                    <div>Клиент не найден</div>
                                    :
                                    isLoading
                                        ? <div>Поиск...</div> :
                                        // ? <div className={s.textField_loader}><Loader/></div> :
                                        users.map((u: any) => {
                                            return (
                                                <div className={s.textField_contentItem} key={u.user.id}
                                                     onClick={() => {
                                                         setInfoToClientCard({userId: u.user.id,
                                                             firstName: u.user.firstName, lastName: u.user.lastName,
                                                             patronymic: u.user.patronymic, phoneNumber: u.user.phoneNumber
                                                         })
                                                     }}
                                                >
                                                    {u.user.lastName} {u.user.firstName} {u.user.patronymic}
                                                </div>
                                            )
                                        })
                            }
                        </div>
                    </div>
                    <div className={s.clientModal_textFields}>
                        <div className={s.textFields_title}>
                            Создать клиента:
                        </div>
                        <div>
                            <ControlledInput name={'lastName'} label={'Фамилия'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                        </div>
                        <div>
                            <ControlledInput name={'firstName'} label={'Имя'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                        </div>
                        <div>
                            <ControlledInput name={'patronymic'} label={'Отчество'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                        </div>
                        <div>
                            <ControlledInput name={'phone'} label={'Номер телефона'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                            />
                        </div>
                    </div>
                    <div className={s.clientModal_buttonsBlock}>
                        <Button type={'submit'}>
                            Добавить клиента
                        </Button>
                        <Button onClick={() => {setOpen(false)}}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default ChooseClientModal;
