import React from 'react'
import {Modal} from '@mui/material'
import s from '../ChooseProductModal/ChooseProductModal.module.scss'
import useChooseProductModal from './ChooseProductModalStore'
import {ProductCatalog} from '../../pages'

export const ChooseProductModal = () => {

    const open = useChooseProductModal(s => s.openProductModal)
    const setOpen = useChooseProductModal(s => s.setOpenProductModal)

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.chooseProductModal_mainBox}>
                <ProductCatalog/>
            </div>
        </Modal>
    );
};