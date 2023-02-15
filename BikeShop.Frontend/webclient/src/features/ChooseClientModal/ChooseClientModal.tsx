import React, {useEffect, ChangeEvent, ChangeEventHandler} from 'react';
import {Modal, TextField} from "@mui/material";
import useChooseClientModal, {UserDefault} from './ChooseClientModalStore';
import {Button, ControlledInput} from '../../shared/ui';
import s from './ChooseClientModal.module.scss'
import Input from '../../shared/ui/Input/Input';
import {useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from "react-hook-form";
import {CreateUser} from "../../entities";
import {useSnackbar} from 'notistack';

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

    const usersD = useChooseClientModal(s => s.usersD)
    const firstName = useChooseClientModal(s => s.firstName)
    const setFirstName = useChooseClientModal(s => s.setFirstName)
    const getUsers = useChooseClientModal(s => s.getUsers)
    const findUser = useChooseClientModal(s => s.findUser)
    const addNewUser = useChooseClientModal(s => s.addNewUser)
    const addTestUser = useChooseClientModal(s => s.addTestUser)

    /*const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            patronymic: '',
            phone: ''
        }
    });*/

    // const usersTwo = [
    //     {id: 1, firstName1: 'Иванов'}
    //     // {id: 2, firstName: 'Petrov', phone: 25010}
    // ]

    console.log(usersD)

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
            setOpen(false);

            formControl.setValue('firstName', '')
            formControl.setValue('lastName', '')
            formControl.setValue('patronymic', '')
            formControl.setValue('phone', '')

            navigate('/service')

            enqueueSnackbar('Клиент добавлен', {variant: 'success', autoHideDuration: 3000})
        }).catch((error) => {
            let message = error(error.response.data.errorDescription).toString()
            formControl.setError('firstName', {type: 'serverError', message: message})
            enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
            console.error(error.response.data)
        })

    }

    const findUserHandler = () => {
        // findUser(firstName).then((response) => {
        // })
        addTestUser(firstName)
    }

    // useEffect(() => {
    //     getUsers()
    // })

    return (
        // {clonedChildren}
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
                            {/*<Input placeholder={'Введите фамилию'}/>*/}
                            {/*<ControlledInput name={'searchFirstName'} label={'Введите фамилию'}*/}
                            {/*                 control={formControl}*/}
                            {/*/>*/}
                            <input type="text"
                                   placeholder={'Введите фамилию'}
                                   value={firstName}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => {setFirstName(e.currentTarget.value)}}
                            />
                        </div>
                        <div className={s.clientModal_searchBlock_input}>
                            <Input placeholder={'Введите номер телефона'}/>
                        </div>
                        <div>
                            <Button onClick={findUserHandler}>
                                НАЙТИ (тест кнопка)
                            </Button>
                        </div>
                        <div className={s.clientModal_searchBlock_textField}>
                            {/*Результат поиска?*/}
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                            {
                                usersD.map((u: UserDefault) => {
                                    return (
                                        <div key={u.id}>{u.firstName}</div>
                                    )
                                })
                            }
                            </div>
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
                            <ControlledInput name={'firstName'} label={'Фамилия'}
                                             control={formControl}
                                             rules={{required: errorMessages.required}}
                            />
                        </div>
                        <div>
                            <ControlledInput name={'lastName'} label={'Имя'}
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
