import React from 'react'
import s from './SelectProductWorkModal.module.scss'
import useSelectProductWorkModal from './SelectProductWorkModalStore'
import {SelectProduct} from '../../../pages'
import {ServiceItemProduct} from "../../../entities/models/Service/ServiceItem"
import {CustomModal} from "../../../shared/ui"

interface SelectProductModalProps {
    products: ServiceItemProduct[]
    setProducts: (product: ServiceItemProduct[]) => void
}

export const SelectProductModal: React.FC<SelectProductModalProps> = (props: SelectProductModalProps) => {

    const selectProductModal = useSelectProductWorkModal(s => s.openSelectProductModal)
    const setSelectProductModal = useSelectProductWorkModal(s => s.setOpenSelectProductModal)

    return (
        <CustomModal
            open={selectProductModal}
            onClose={() => {setSelectProductModal(false)}}
        >
            <div className={s.selectProductWorkModal_mainBox}>
                <SelectProduct products={props.products} setProducts={props.setProducts}/>
            </div>
        </CustomModal>
    )
}