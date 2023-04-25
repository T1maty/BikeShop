import React from 'react'
import useChangeProductPricesModal from "./ChangeProductPricesModalStore"
import s from "./ChangeProductPricesModal.module.scss"
import {Button, CustomModal} from "../../../shared/ui"
import {useSnackbar} from "notistack"
import {SubmitHandler, useForm} from "react-hook-form"

export const ChangeProductPricesModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useChangeProductPricesModal(s => s.openChangeProductPricesModal)
    const setOpen = useChangeProductPricesModal(s => s.setOpenChangeProductPricesModal)

    const formControl = useForm<any>({
        defaultValues: {
            phone: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {

    }

    return (
        <CustomModal
            open={open}
            onClose={() => {setOpen(false)}}
        >
            <div className={s.changeProductPricesModal_mainBox}>
                <div className={s.changeProductPricesModal_title}>
                    Изменение цены товара
                </div>
                <div className={s.changeProductPricesModal_productInfo}>
                    Арт.: 121221221, Название товара
                </div>
                <div className={s.changeProductPricesModal_form}>
                    <form onSubmit={formControl.handleSubmit(onSubmit)}>
                        <div className={s.form_leftColumn}>

                        </div>
                        <div className={s.form_rightColumn}>

                        </div>
                    </form>
                </div>
            </div>
        </CustomModal>
    )
}