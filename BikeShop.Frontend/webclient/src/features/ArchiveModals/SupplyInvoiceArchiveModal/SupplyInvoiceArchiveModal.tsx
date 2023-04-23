import React, {useEffect} from 'react'
import s from './SupplyInvoiceArchiveModal.module.scss'
import {CustomModal, LoaderScreen} from '../../../shared/ui'
import useSupplyInvoiceArchiveModal from './SupplyInvoiceArchiveModalStore'
import {useSnackbar} from 'notistack'
import {useNavigate} from 'react-router-dom'
import {SupplyInvoiceDTO} from "../../../entities/models/Acts/SupplyInvoice/SupplyInvoiceDTO"
import Enumerable from "linq"
import useSupplyInvoice from "../../../pages/workspace/SupplyInvoice/models/SupplyInvoiceStore"
import {BikeShopPaths} from "../../../app/routes/paths"
import {formatDate} from "../../../shared/utils/formatDate"

export const SupplyInvoiceArchiveModal = () => {

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const open = useSupplyInvoiceArchiveModal(s => s.openSupplyInvoiceArchiveModal)
    const setOpen = useSupplyInvoiceArchiveModal(s => s.setOpenSupplyInvoiceArchiveModal)
    const isLoading = useSupplyInvoiceArchiveModal(s => s.isLoading)
    const errorStatus = useSupplyInvoiceArchiveModal(s => s.errorStatus)
    const getArchive = useSupplyInvoiceArchiveModal(s => s.getArchive)
    const archive = useSupplyInvoiceArchiveModal(s => s.archive)

    const setIsCreating = useSupplyInvoice(s => s.setIsCreating)
    const setCurrentSupplyInvoice = useSupplyInvoice(s => s.setCurrentSupplyInvoice)

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
                <div className={s.supplyInvoiceArchiveModal_mainBlock}>
                    <div className={s.supplyInvoiceArchiveModal_title}>
                        Приходные накладные
                    </div>
                    <div className={s.supplyInvoiceArchiveModal_list}>
                        {
                            archive.map((el: SupplyInvoiceDTO) => {
                                return (
                                    <div className={s.supplyInvoiceArchiveModal_item} key={el.supplyInvoice.id}
                                         onDoubleClick={() => {
                                             setIsCreating(false)
                                             setCurrentSupplyInvoice(el);
                                             navigate(BikeShopPaths.WORKSPACE.ARRIVAL_OF_PRODUCTS)
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
                                            <div className={s.item_contentTop}>
                                                <div className={s.item_contentTop_number}>
                                                    №{el.supplyInvoice.id}
                                                </div>
                                                <div className={s.item_contentTop_qty}>
                                                    {el.supplyInvoiceProducts.length} поз.
                                                </div>
                                                <div className={s.item_contentTop_totalNum}>
                                                    {Enumerable.from(el.supplyInvoiceProducts).select(n => n.quantity).sum()} ед.
                                                </div>
                                                <div className={s.item_contentTop_sum}>
                                                    {el.supplyInvoice.total} ГРН.
                                                </div>
                                            </div>
                                            <div className={s.item_contentBottom}>
                                                <div className={s.item_contentBottom_info}>
                                                    {el.supplyInvoice.description}
                                                </div>
                                                <div className={s.item_contentBottom_date}>
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