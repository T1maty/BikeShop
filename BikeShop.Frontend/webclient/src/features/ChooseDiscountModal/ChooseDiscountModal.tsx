import React from 'react';
import {Modal} from "@mui/material";
import Button from '../../shared/ui/Button/Button';
import s from '../ChooseClientModal/ChooseClientModal.module.scss'
import useChooseDiscountModal from './ChooseDiscountModalStore';

const ChooseDiscountModal = () => {
    const open = useChooseDiscountModal(s => s.chooseDiscountModal)
    const setOpen = useChooseDiscountModal(s => s.setChooseDiscountModal)

    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const clonedChildren = cloneElement(children, {
    //     onClick: handleOpen,
    // })

    return (
        // {clonedChildren}
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.discountModal_mainBox}>
                <div className={s.discountModal_selectBlock}>
                    1
                </div>

                <div className={s.discountModal_buttonsBlock}>
                    <Button text={'Выбрать скидку'} onClick={() => {}}/>
                    <Button text={'Отмена'} onClick={() => {setOpen(false)}}/>
                </div>
            </div>
        </Modal>
    );
};

export default ChooseDiscountModal;