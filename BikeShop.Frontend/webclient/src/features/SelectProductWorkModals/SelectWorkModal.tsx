import React from 'react'
import {Modal} from '@mui/material'
import s from './SelectProductWorkModal.module.scss'
import useSelectProductWorkModal from './SelectProductWorkModalStore'
import {SelectWork} from '../../pages'
import {ServiceItemWork} from "../../entities/models/ServiceItem";

interface props {
    works: ServiceItemWork[]
    setWorks: (product: ServiceItemWork[]) => void
}

export const SelectWorkModal = (props: props) => {

    const selectWorkModal = useSelectProductWorkModal(s => s.selectWorkModal)
    const setSelectWorkModal = useSelectProductWorkModal(s => s.setSelectWorkModal)

    return (
        <Modal
            open={selectWorkModal}
            onClose={() => {
                setSelectWorkModal(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.selectProductWorkModal_mainBox}>
                <SelectWork/>
            </div>
        </Modal>
    );
};