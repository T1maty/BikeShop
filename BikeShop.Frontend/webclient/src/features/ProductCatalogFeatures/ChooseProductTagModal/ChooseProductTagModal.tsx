import React from 'react'
import s from './ChooseProductTagModal.module.scss'
import {TagTreeView} from "../../../widgets"
import {CustomModal} from "../../../shared/ui"
import {ProductCategory} from "../../../entities/entities/ProductCategory";

interface ChooseProductTagModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    onTagDoubleClick?: (tag: ProductCategory) => void
}

export const ChooseProductTagModal: React.FC<ChooseProductTagModalProps> = ({onTagDoubleClick, open, setOpen}) => {

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <div className={s.addProductCardTagModal_mainBox}>
                <div className={s.addProductCardTagModal_content}>
                    <TagTreeView onNodeDoubleClick={onTagDoubleClick}/>
                </div>
            </div>
        </CustomModal>
    )
}