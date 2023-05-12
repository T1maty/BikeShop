import React from 'react'
import s from './SelectProductWorkModal.module.scss'
import useSelectProductWorkModal from './SelectProductWorkModalStore'
import {SelectProduct} from '../../../pages'
import {CustomModal} from "../../../shared/ui"
import {ServiceProduct} from "../../../entities"

interface SelectProductModalProps {
    products: ServiceProduct[]
    setProducts: (product: ServiceProduct[]) => void
    defaultMasterId: string
}

export const SelectProductModal: React.FC<SelectProductModalProps> = (props: SelectProductModalProps) => {

    const selectProductModal = useSelectProductWorkModal(s => s.openSelectProductModal)
    const setSelectProductModal = useSelectProductWorkModal(s => s.setOpenSelectProductModal)

    return (
        <CustomModal
            open={selectProductModal}
            onClose={() => {
                setSelectProductModal(false)
            }}
        >
            <div className={s.selectProductWorkModal_mainBox}>
                <SelectProduct products={props.products}
                               setProducts={props.setProducts}
                               defaultMasterId={props.defaultMasterId}
                />
            </div>
        </CustomModal>
    )
}