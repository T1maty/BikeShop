import React, {useState} from 'react';
import {Modal} from '@mui/material';
import s from './SelectProductWorkModal.module.scss'
import SelectWork from "../../pages/workspace/SelectProductWork/SelectWork";
import useSelectProductWorkModal from "./SelectProductWorkModalStore";

export const SelectWorkModal = () => {

    // const [open, setOpen] = useState<boolean>(false)
    const selectWorkModal = useSelectProductWorkModal(s => s.selectWorkModal)
    const setSelectWorkModal = useSelectProductWorkModal(s => s.setSelectWorkModal)

    return (
        <Modal
            open={selectWorkModal}
            onClose={() => {setSelectWorkModal(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.selectProductWorkModal_mainBox}>
                <SelectWork/>
            </div>
        </Modal>
    );
};