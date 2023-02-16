import React, {useEffect, ChangeEvent, ChangeEventHandler} from 'react';
import {Modal, TextField} from '@mui/material';
import useChooseClientModal from './ChooseClientModalStore';
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
import useClientCard from "../ClientCard/ClientCardStore";

const ChooseClientModal = () => {
    /*const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const clonedChildren = cloneElement(children, {
        onClick: handleOpen,
    })*/

    const errorMessages = {
        required: 'Поле обязательно для заполнения'
    }

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const open = useChooseClientModal(s => s.chooseClientModal)
    const setOpen = useChooseClientModal(s => s.setChooseClientModal)
    const isLoading = useChooseClientModal(s => s.isLoading)
    const users = useChooseClientModal(s => s.users)
    const fio = useChooseClientModal(s => s.fio)
    const setFIO = useChooseClientModal(s => s.setFIO)
    const phoneNumber = useChooseClientModal(s => s.phoneNumber)
    const setPhoneNumber = useChooseClientModal(s => s.setPhoneNumber)
    const getUsers = useChooseClientModal(s => s.getUsers)
    const setUsers = useChooseClientModal(s => s.setUsers)
    const findUser = useChooseClientModal(s => s.findUser)
    const addNewUser = useChooseClientModal(s => s.addNewUser)

    const setCardPhoneNumber = useClientCard(s => s.setPhoneNumber)

    const searchClientByFIO = useDebounce<string>(fio, 1000)
    const searchClientByPhone = useDebounce<string>(phoneNumber, 1000)

    // const chooseClientModal = useChooseClientModal(s => s.chooseClientModal)

    /*const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            patronymic: '',
            phone: ''
        }
    });*/

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
            // setInfoToClientCard({phoneNumber: phone})
            setCardPhoneNumber(phoneNumber)

            setOpen(false)
            navigate('/service')

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

    const setInfoToClientCard = (clientCard: {/*userId: string, lastName: string,
        firstName: string, patronymic: string, */phoneNumber: string}) => {
        setCardPhoneNumber(phoneNumber)
        console.log(clientCard)
    }

    /*const findUserHandler = () => {
        // getUsers();
        findUser({fio, phone});
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
        // {clonedChildren}
        <Modal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
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
                                       setFIO(e.currentTarget.value)
                                   }}
                                   clearInputValue={() => {setFIO('')}}
                            />
                        </div>
                        <div className={s.clientModal_searchBlock_input}>
                            <Input placeholder={'Введите номер телефона'} value={phoneNumber}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                       setPhoneNumber(e.currentTarget.value)
                                   }}
                                   clearInputValue={() => {setPhoneNumber('')}}
                            />
                        </div>
                        {/*<div>*/}
                        {/*    <Button onClick={findUserHandler}>*/}
                        {/*        Найти клиента*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
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
                                                         setInfoToClientCard({/*userId: u.user.id,
                                                             firstName: u.user.firstName, lastName: u.user.lastName,
                                                             patronymic: u.user.patronymic, */phoneNumber: u.user.phoneNumber
                                                         })
                                                     }}
                                                >
                                                    {u.user.lastName} {u.user.firstName} {u.user.patronymic}
                                                </div>
                                            )
                                        })
                            }

                            {/*<TextField id="outlined-basic"*/}
                            {/*           variant="outlined"*/}
                            {/*           value={'Результат поиска'}*/}
                            {/*           style={{backgroundColor: '#5C636A'}}*/}
                            {/*           onChange={() => {}}*/}
                            {/*           fullWidth={true}*/}
                            {/*/>*/}
                        </div>
                    </div>
                    <div className={s.clientModal_textFields}>
                        <div className={s.textFields_title}>
                            Создать клиента:
                        </div>
                        <div>
                            <ControlledInput name={'lastName'} label={'Фамилия'}
                                             control={formControl}
                                             rules={{required: errorMessages.required}}
                            />
                        </div>
                        <div>
                            <ControlledInput name={'firstName'} label={'Имя'}
                                             control={formControl}
                                             rules={{required: errorMessages.required}}
                            />
                        </div>
                        <div>
                            <ControlledInput name={'patronymic'} label={'Отчество'}
                                             control={formControl}
                                             rules={{required: errorMessages.required}}
                            />
                        </div>
                        <div>
                            <ControlledInput name={'phone'} label={'Номер телефона'}
                                             control={formControl}
                                             rules={{required: errorMessages.required}}
                            />
                        </div>
                    </div>
                    <div className={s.clientModal_buttonsBlock}>
                        <Button type={'submit'}>
                            Добавить клиента
                        </Button>
                        <Button onClick={() => {
                            setOpen(false)
                        }}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default ChooseClientModal;
