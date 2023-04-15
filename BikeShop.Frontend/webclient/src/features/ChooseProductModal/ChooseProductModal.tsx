import React, {useState} from 'react'
import s from '../ChooseProductModal/ChooseProductModal.module.scss'
import {ProductCatalogTable, TagTreeView} from "../../widgets"
import {ProductExtended} from "../../entities"
import {CustomModal, UniTable} from "../../shared/ui"

interface props {
    open?: boolean,
    setOpen?: (value: boolean) => void,
    data?: any[],
    addData: (value: any) => void
    slaveColumns?: any[]
    setDataSlaveTable?: (value: any[]) => void
}

export const ChooseProductModal = (props: props) => {

    const [open, setOpen] = useState(false)

    return (
        <CustomModal
            open={props.open ? props.open : open}
            onClose={() => {
                props.setOpen ? props.setOpen(false) : setOpen(false)
            }}
        >
            <div className={s.chooseProductModal_mainBox}>
                <div className={s.chooseProductModal_wrapper}>
                    <div className={s.chooseProductModal_tagTreeView}>
                        <TagTreeView/>
                    </div>
                    <div className={s.chooseProductModal_catalogTable}>
                        <ProductCatalogTable onRowDoubleClick={(row: ProductExtended) => {
                            props.addData(row)
                        }}/>
                        <br/>
                        {
                            (props.data != undefined && props.slaveColumns != undefined) ?
                                <UniTable rows={props.data} columns={props.slaveColumns ? props.slaveColumns : []}
                                          setRows={props.setDataSlaveTable}/> : <div>No slave table</div>
                        }

                    </div>
                </div>
            </div>
        </CustomModal>
    )
}