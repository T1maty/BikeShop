import React, {useState} from 'react'
import {Modal} from '@mui/material'
import s from '../ChooseProductModal/ChooseProductModal.module.scss'
import {ProductCatalogTable, TagTreeView} from "../../widgets";
import {ProductExtended} from "../../entities";

interface props {
    open?: boolean,
    setOpen?: (value: boolean) => void,
    data: any[],
    addData: (value: any) => void
}

export const ChooseProductModal = (props: props) => {

    const [open, setOpen] = useState(false);

    return (
        <Modal
            open={props.open ? props.open : open}
            onClose={() => {
                props.setOpen ? props.setOpen(false) : setOpen(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.chooseProductModal_mainBox}>
                <TagTreeView/>
                <ProductCatalogTable onRowDoubleClick={(row: ProductExtended) => {
                    props.addData(row)
                }}/>
            </div>
        </Modal>
    );
};