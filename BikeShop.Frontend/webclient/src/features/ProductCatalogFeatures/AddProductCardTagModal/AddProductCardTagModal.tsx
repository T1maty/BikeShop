import React from 'react'
import s from './AddProductCardTagModal.module.scss'
import {TagTreeView} from "../../../widgets"
import {CustomModal} from "../../../shared/ui"

interface AddProductCardTagModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    onTagDoubleClick?: (tag: any) => void
}

export const ChooseProductTagModal: React.FC<AddProductCardTagModalProps> = ({onTagDoubleClick, open, setOpen}) => {

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