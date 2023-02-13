import React from 'react';
import {Modal, TextField} from "@mui/material";
import useChooseClientModal from './ChooseClientModalStore';
import {Button} from '../../shared/ui/Button/Button';
import s from './ChooseClientModal.module.scss'
import Input from '../../shared/ui/Input/Input';
import {useNavigate} from 'react-router-dom';

const ChooseClientModal = () => {
    const navigate = useNavigate()
    const open = useChooseClientModal(s => s.chooseClientModal)
    const setOpen = useChooseClientModal(s => s.setChooseClientModal)

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

    const chooseButtonHandler = () => {
        // setOpen(false);
        navigate('/service');
    }

    return (
        // {clonedChildren}
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
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
                                   value={'Результат поиска?'}
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
                        <Input placeholder={'Фамилия'}/>
                        {/*<TextField id="outlined-basic"*/}
                        {/*           variant="outlined"*/}
                        {/*           value={'Фамилия'}*/}
                        {/*           style={{backgroundColor: '#5C636A'}}*/}
                        {/*           onChange={() => {}}*/}
                        {/*           fullWidth={true}*/}
                        {/*/>*/}
                    </div>
                    <div>
                        <Input placeholder={'Имя'}/>
                        {/*<TextField id="outlined-basic"*/}
                        {/*           variant="outlined"*/}
                        {/*           value={'Имя'}*/}
                        {/*           style={{backgroundColor: '#5C636A'}}*/}
                        {/*           onChange={() => {}}*/}
                        {/*           fullWidth={true}*/}
                        {/*/>*/}
                    </div>
                    <div>
                        <Input placeholder={'Отчество'}/>
                    </div>
                </div>
                <div className={s.clientModal_buttonsBlock}>
                    <Button onClick={chooseButtonHandler}>
                        Выбрать клиента
                    </Button>
                    <Button onClick={() => {setOpen(false)}}>
                        Отмена
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ChooseClientModal;
