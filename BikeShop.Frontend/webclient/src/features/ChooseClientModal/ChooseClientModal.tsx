import React, {ChangeEvent, useState} from 'react';
import {Modal, TextField} from "@mui/material";
import useChooseClientModal from './ChooseClientModalStore';
import {Button} from '../../shared/ui';
import s from './ChooseClientModal.module.scss'
import Input from '../../shared/ui/Input/Input';
import {useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from "react-hook-form";
import {CreateUser} from "../../entities";

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

    const navigate = useNavigate()
    const open = useChooseClientModal(s => s.chooseClientModal)
    const setOpen = useChooseClientModal(s => s.setChooseClientModal)
    const addNewUser = useChooseClientModal(s => s.addNewUser)

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            patronymic: '',
            phone: ''
        }
    });
    const onSubmit: SubmitHandler<CreateUser> = (data: CreateUser) => {
        // event: React.MouseEvent<HTMLButtonElement>
        // event.preventDefault();
        console.log(data)
        // addNewUser({firstName, lastName, patronymic, phone});
        // setOpen(false);
        // navigate('/service');
    }

    const addNewUserHandler = () => {
        // addNewUser({firstName, lastName, patronymic, phone});
        setOpen(false);
        // navigate('/service');
    }

    /*const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it*/

    return (
        // {clonedChildren}
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
            {/*    /!* register your input into the hook by invoking the "register" function *!/*/}
            {/*    <input defaultValue="test" {...register("example")} />*/}

            {/*    /!* include validation with required or other standard HTML validation rules *!/*/}
            {/*    <input {...register("exampleRequired", { required: true })} />*/}
            {/*    /!* errors will return when field validation fails  *!/*/}
            {/*    {errors.exampleRequired && <span>This field is required</span>}*/}

            {/*    <input type="submit" />*/}
            {/*</form>*/}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.clientModal_mainBox}>
                    <div className={s.clientModal_searchBlock}>
                        <div className={s.clientModal_searchBlock_title}>
                            Найти клиента:
                        </div>
                        <div className={s.clientModal_searchBlock_input}>
                            <Input placeholder={'Введите фамилию'}/>
                        </div>
                        <div className={s.clientModal_searchBlock_input}>
                            <Input placeholder={'Введите номер телефона'}/>
                        </div>
                        <div className={s.clientModal_searchBlock_textField}>
                            <TextField id="outlined-basic"
                                       variant="outlined"
                                       value={'Результат поиска'}
                                       style={{backgroundColor: '#5C636A'}}
                                       onChange={() => {}}
                                       fullWidth={true}
                            />
                        </div>
                    </div>
                    <div className={s.clientModal_textFields}>
                        <div className={s.textFields_title}>
                            Создать клиента:
                        </div>
                        <div>
                            <Input placeholder={'Фамилия'}
                                   {...register('firstName', {required: true})}
                            />
                        </div>
                        <div>
                            <Input placeholder={'Имя'}
                                   {...register('lastName', {required: true})}
                            />
                        </div>
                        <div>
                            <Input placeholder={'Отчество'}
                                   {...register('patronymic', {required: true})}
                            />
                        </div>
                        <div>
                            <Input placeholder={'Номер телефона'}
                                   {...register('phone', {required: true})}
                            />
                        </div>
                    </div>
                    <div className={s.clientModal_buttonsBlock}>
                        <Button>
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
