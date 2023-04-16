import React, {useState} from 'react'
import s from '../ChooseProductModal/ChooseProductModal.module.scss'
import {ProductCatalogTable, TagTreeView} from "../../widgets"
import {Product} from "../../entities"
import {CustomModal, UniTable} from "../../shared/ui"
import Enumerable from "linq";

interface props {
    open?: boolean,
    setOpen?: (value: boolean) => void,
    data?: any[],
    addData?: (value: any) => void
    setData?: (value: any[]) => void
    slaveColumns?: any[]
    setDataSlaveTable?: (value: any[]) => void
}

export const ChooseProductModal = (props: props) => {

    const [open, setOpen] = useState(false)

    const setDataHandler = (row: Product) => {
        console.log(row)
        if (Enumerable.from(props.data as Product[]).select(n => n.id).contains(row.id)) {
            let data: any[] = []
            Object.assign(data, props.data)
            console.log(data)
            data!.find(n => n.id === row.id)!.quantity++
            props.setData!(data!)
        } else {

            props.setData!([...props.data!, {...row, quantity: 1}])
        }
    }

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
                        <ProductCatalogTable onRowDoubleClick={(row) => {
                            props.addData ? props.addData(row) : false
                            props.setData ? setDataHandler(row) : false
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