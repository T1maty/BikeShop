import React from 'react';
import {Box, Modal, TextField} from "@mui/material";
import useChooseClientModal from './ChooseClientModalStore';
import Button from '../../shared/ui/Button/Button';
import s from './ChooseClientModal.module.scss'
// import {openSelector, setOpenSelector} from './ChooseClientModal-selectors';
import Input from '../../shared/ui/Input/Input';

const ChooseClientModal = () => {
    const open = useChooseClientModal(s => s.chooseClientModal)
    const setOpen = useChooseClientModal(s => s.setChooseClientModal)

    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 480,
    //     bgcolor: '#33373B',
    //
    //     boxShadow: 24,
    //     p: 4,
    //     borderRadius: 5,
    // };

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {/*<Box sx={style}>*/}
            <div className={s.clientModal_mainBox}>
                <div className={s.clientModal_searchBlock}>
                    <div className={s.clientModal_searchBlock_input}>
                        <Input placeholder={'Введите номер телефона'}/>
                    </div>
                    <div className={s.clientModal_searchBlock_textField}>
                        <TextField id="outlined-basic"
                                   variant="outlined"
                                   value={'Search result'}
                                   style={{backgroundColor: '#5C636A'}}
                                   onChange={() => {}}
                        />
                    </div>
                </div>
                <div className={s.clientModal_textFields}>
                    <div>
                        <Input placeholder={'Имя'}/>
                    </div>
                    <div>
                        <Input placeholder={'Фамилия'}/>
                    </div>
                    <div>
                        <Input placeholder={'Отчество'}/>
                    </div>
                </div>
                <div className={s.clientModal_buttonsBlock}>
                    <Button text={'Выбрать клиента'} onClick={() => {}}/>
                    <Button text={'Отмена'} onClick={() => {setOpen(false)}}/>
                </div>
            </div>
            {/*</Box>*/}
        </Modal>
    );
};

export default ChooseClientModal;