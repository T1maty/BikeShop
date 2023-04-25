import React from 'react'
import useChangeProductPricesModal from "./ChangeProductPricesModalStore"
import s from "./ChangeProductPricesModal.module.scss"
import {Button, CustomModal} from "../../../shared/ui"

export const ChangeProductPricesModal = () => {

    const open = useChangeProductPricesModal(s => s.openChangeProductPricesModal)
    const setOpen = useChangeProductPricesModal(s => s.setOpenChangeProductPricesModal)

    return (
        <CustomModal
            open={open}
            onClose={() => {setOpen(false)}}
        >
            <div className={s.changeProductPricesModal_mainBox}>
                1
            </div>
        </CustomModal>
    )
}