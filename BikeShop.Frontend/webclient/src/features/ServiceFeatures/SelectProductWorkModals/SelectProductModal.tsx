import React from 'react'
import {Modal} from '@mui/material'
import s from './SelectProductWorkModal.module.scss'
import useSelectProductWorkModal from './SelectProductWorkModalStore'
import {SelectProduct} from '../../../pages'
import {ServiceItemProduct} from "../../../entities/models/Service/ServiceItem"

interface SelectProductModalProps {
    products: ServiceItemProduct[]
    setProducts: (product: ServiceItemProduct[]) => void
}

export const SelectProductModal: React.FC<SelectProductModalProps> = (props: SelectProductModalProps) => {

    const selectProductModal = useSelectProductWorkModal(s => s.openSelectProductModal)
    const setSelectProductModal = useSelectProductWorkModal(s => s.setOpenSelectProductModal)

    return (
        <Modal
            open={selectProductModal}
            onClose={() => {
                setSelectProductModal(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.selectProductWorkModal_mainBox}>
                <SelectProduct products={props.products} setProducts={props.setProducts}/>
            </div>
        </Modal>
    );
};