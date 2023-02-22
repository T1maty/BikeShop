import React, {useState} from 'react';
import {Modal} from '@mui/material';
import s from './SelectProductWorkModal.module.scss'
import SelectWork from "../../pages/workspace/SelectProductWork/SelectWork";

const SelectWorkModal = () => {

    const [open, setOpen] = useState<boolean>(true)

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.selectProductWorkModal_mainBox}>
                <SelectWork/>
            </div>
        </Modal>
    );
};

export default SelectWorkModal;
