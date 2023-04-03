import React from 'react'
import s from './AddProductCardTagModal.module.scss'
import {Modal} from "@mui/material"
import {TagTreeView} from "../../../widgets";

interface AddProductCardTagModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    onTagDoubleClick?: (tag: any) => void
}

export const AddProductCardTagModal: React.FC<AddProductCardTagModalProps> = ({onTagDoubleClick, open, setOpen}) => {

    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.addProductCardTagModal_mainBox}>
                <div className={s.addProductCardTagModal_content}>
                    <TagTreeView onNodeDoubleClick={onTagDoubleClick}/>
                </div>
            </div>
        </Modal>
    );
};