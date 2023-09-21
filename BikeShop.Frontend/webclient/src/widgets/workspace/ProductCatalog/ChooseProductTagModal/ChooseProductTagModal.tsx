import React from 'react'
import s from './ChooseProductTagModal.module.scss'
import {ProductCategory} from "../../../../entities";
import {CustomModal} from "../../../../shared/ui";
import {TagTreeView} from "../TagTreeView/TagTreeView";

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
                    <TagTreeView onNodeDoubleClick={(n: ProductCategory) => {
                        onTagDoubleClick ? onTagDoubleClick(n) : null
                    }}/>
                </div>
            </div>
        </CustomModal>
    )
}