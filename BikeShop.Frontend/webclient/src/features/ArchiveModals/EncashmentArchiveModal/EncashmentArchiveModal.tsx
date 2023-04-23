import React, {useEffect} from 'react'
import s from './EncashmentArchiveModal.module.scss'
import {CustomModal, LoaderScreen} from '../../../shared/ui'
import {useSnackbar} from 'notistack'
import {useNavigate} from 'react-router-dom'
import {SupplyInvoiceDTO} from "../../../entities/models/Acts/SupplyInvoice/SupplyInvoiceDTO"
import Enumerable from "linq"
import {BikeShopPaths} from "../../../app/routes/paths"
import useEncashmentArchiveModal from './EncashmentArchiveModalStore'
import CashIcon from '../../../shared/assets/workspace/cash-icon.svg'
import PayCardIcon from '../../../shared/assets/workspace/paycard-icon.svg'
import MoneyIcon from '../../../shared/assets/workspace/money-icon.svg'
import {formatDate} from "../../../shared/utils/formatDate"

export const EncashmentArchiveModal = () => {

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const open = useEncashmentArchiveModal(s => s.openEncashmentArchiveModal)
    const setOpen = useEncashmentArchiveModal(s => s.setOpenEncashmentArchiveModal)
    const isLoading = useEncashmentArchiveModal(s => s.isLoading)
    const errorStatus = useEncashmentArchiveModal(s => s.errorStatus)
    const getArchive = useEncashmentArchiveModal(s => s.getArchive)
    const archive = useEncashmentArchiveModal(s => s.archive)

    // const setIsCreating = useSupplyInvoice(s => s.setIsCreating)
    // const setCurrentSupplyInvoice = useSupplyInvoice(s => s.setCurrentSupplyInvoice)

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        getArchive()
    }, [])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <CustomModal
                open={open}
                onClose={() => {setOpen(false)}}
            >
                <div className={s.encashmentArchiveModal_mainBlock}>
                    <div className={s.encashmentArchiveModal_title}>
                        Архив инкассаций
                    </div>
                    <div className={s.encashmentArchiveModal_list}>
                        {
                            archive.map((el: SupplyInvoiceDTO) => {
                                return (
                                    <div className={s.supplyInvoiceArchiveModal_item} key={el.supplyInvoice.id}
                                         onDoubleClick={() => {
                                             // setIsCreating(false)
                                             // setCurrentSupplyInvoice(el);
                                             // navigate(BikeShopPaths.WORKSPACE.ARRIVAL_OF_PRODUCTS)
                                         }}
                                    >
                                        <div className={
                                            // s.item_status
                                            el.supplyInvoice.sypplyActStatus === 'Created' ? s.status_WaitingPayment :
                                                el.supplyInvoice.sypplyActStatus === 'Executed' ? s.status_Ready :
                                                    el.supplyInvoice.sypplyActStatus === 'Canceled' ? s.status_Canceled : ''}
                                        >
                                            {el.supplyInvoice.sypplyActStatus}
                                        </div>

                                        <div className={s.item_content}>
                                            <div className={s.content_info}>
                                                <div className={s.item_contentTop_number}>
                                                    №{el.supplyInvoice.id}
                                                </div>
                                                <div className={s.item_contentTop_number}>
                                                    Иванов Василий
                                                </div>
                                                <div>
                                                    Какая-то информация
                                                </div>
                                            </div>

                                            <div className={s.content_cash}>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={CashIcon} alt='cash-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        99999111
                                                    </div>
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={PayCardIcon} alt='card-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        999992
                                                    </div>
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={MoneyIcon} alt='cash-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        99999121212
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={s.content_date}>
                                                <div>
                                                    <div>Создан:</div>
                                                    <div>{formatDate(el.supplyInvoice.createdAt)}</div>
                                                </div>
                                                <div>
                                                    <div>Изменён:</div>
                                                    <div>{formatDate(el.supplyInvoice.updatedAt)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </CustomModal>
        )
    }
}