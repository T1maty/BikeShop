import React, {useState} from 'react';
import {Modal} from '@mui/material';
import s from './SelectProductWorkModal.module.scss'
import SelectProduct from "../../pages/workspace/SelectProductWork/SelectProduct";
import useSelectProductWorkModal from "./SelectProductWorkModalStore";

export const SelectProductModal = () => {

    // const [open, setOpen] = useState<boolean>(false)
    const selectProductModal = useSelectProductWorkModal(s => s.selectProductModal)
    const setSelectProductModal = useSelectProductWorkModal(s => s.setSelectProductModal)

    return (
        <Modal
            open={selectProductModal}
            onClose={() => {setSelectProductModal(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.selectProductWorkModal_mainBox}>
                <SelectProduct/>
            </div>
        </Modal>
    );
};