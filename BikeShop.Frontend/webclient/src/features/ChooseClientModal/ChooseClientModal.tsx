import React from 'react';
import {Modal, TextField} from "@mui/material";
import useChooseClientModal from './ChooseClientModalStore';
import Button from '../../shared/ui/Button/Button';
import s from './ChooseClientModal.module.scss'
import Input from '../../shared/ui/Input/Input';

const ChooseClientModal = () => {
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
        // code here
        setOpen(false);
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
                    <div>
                        <TextField id="outlined-basic"
                                   variant="outlined"
                                   value={'Фамилия'}
                                   style={{backgroundColor: '#5C636A'}}
                                   onChange={() => {}}
                                   fullWidth={true}
                        />
                    </div>
                    <div>
                        <TextField id="outlined-basic"
                                   variant="outlined"
                                   value={'Имя'}
                                   style={{backgroundColor: '#5C636A'}}
                                   onChange={() => {}}
                                   fullWidth={true}
                        />
                    </div>
                    <div>
                        <TextField id="outlined-basic"
                                   variant="outlined"
                                   value={'Отчество'}
                                   style={{backgroundColor: '#5C636A'}}
                                   onChange={() => {}}
                                   fullWidth={true}
                        />
                    </div>
                </div>
                <div className={s.clientModal_buttonsBlock}>
                    <Button text={'Выбрать клиента'} onClick={chooseButtonHandler}/>
                    <Button text={'Отмена'} onClick={() => {setOpen(false)}}/>
                </div>
            </div>
        </Modal>
    );
};

export default ChooseClientModal;