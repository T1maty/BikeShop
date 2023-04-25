import React from 'react'
import s from './ChangeProductPriceModal.module.scss'
import {Button, CustomModal} from "../../../shared/ui"
import useChangeProductPriceModal from "./ChangeProductPriceModal"

export const ChangeProductPriceModal = () => {

    const open = useChangeProductPriceModal(s => s.openChangeProductPriceModal)
    const setOpen = useChangeProductPriceModal(s => s.setOpenChangeProductPriceModal)

    return (
        <CustomModal
            open={open}
            onClose={() => {setOpen(false)}}
        >
            <div className={s.changeProductPriceModal_mainBox}>
                <div className={s.changeProductPriceModal_buttons}>
                    <Button  onClick={() => {}}>
                        Подтвердить
                    </Button>
                    <div className={s.confirmModal_cancelButton}>
                        <Button  onClick={() => {setOpen(false)}}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}