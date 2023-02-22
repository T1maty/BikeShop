import React, {useState} from 'react';
import {Modal} from '@mui/material';
import s from './SelectProductWorkModal.module.scss'
import SelectProduct from "../../pages/workspace/SelectProductWork/SelectProduct";

const SelectProductModal = () => {

    const [open, setOpen] = useState<boolean>(true)

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.selectProductWorkModal_mainBox}>
                <SelectProduct/>
            </div>
        </Modal>
    );
};

export default SelectProductModal;
