import React, {useState} from 'react'
import s from './ChooseProductModal.module.scss'
import {ProductCatalogTable} from "../ProductCatalogTable/ProductCatalogTable";
import {TagTreeView} from "../TagTreeView/TagTreeView";
import {CustomModal, UniTable} from "../../../../shared/ui";
import {Product} from "../../../../entities";

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
        let finded = false
        props.setData!(props.data!.map((n: any) => {
            if (n.id === row.id) {
                finded = true
                let buf = {...n}
                buf.quantity++
                return buf
            } else {
                return n
            }
        }))

        if (!finded) props.setData!([...props.data!, {...row, quantity: 1}])
    }

    return (
        <CustomModal
            open={props.open ? props.open : open}
            onClose={() => {
                props.setOpen ? props.setOpen(false) : setOpen(false)
            }}
        >
            <div className={s.chooseProductModal_mainBox} onContextMenu={e => {
                e.preventDefault()
            }}>
                <div className={s.chooseProductModal_wrapper}>

                    <div className={s.chooseProductModal_tagTreeView}>
                        <TagTreeView/>
                    </div>

                    <div className={s.chooseProductModal_catalogTable}>
                        <div className={s.table_availableProducts}>
                            <ProductCatalogTable onRowDoubleClick={(row) => {
                                props.addData ? props.addData(row) : false
                                props.setData ? setDataHandler(row) : false
                            }}
                            />
                        </div>
                        <div className={s.table_chosenProducts}>
                            {
                                (props.data != undefined && props.slaveColumns != undefined) ?
                                    <UniTable rows={props.data}
                                              columns={props.slaveColumns ? props.slaveColumns : []}
                                              setRows={props.setDataSlaveTable}
                                    />
                                    : <div>Нет выбранных товаров</div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </CustomModal>
    )
}