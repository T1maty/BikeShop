import React from 'react'
import {Modal} from '@mui/material'
import s from './SelectProductWorkModal.module.scss'
import useSelectProductWorkModal from './SelectProductWorkModalStore'
import {SelectProduct} from '../../pages'

export const SelectProductModal = () => {

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