import React, {useEffect, useState} from 'react'
import s from './SupplyInvoiceArchiveModal.module.scss'
import {CustomModal, LoaderScreen} from '../../../shared/ui'
import useSupplyInvoiceArchiveModal from './SupplyInvoiceArchiveModalStore'
import {useSnackbar} from 'notistack'
import {useNavigate} from 'react-router-dom'
import {SupplyInvoiceDTO} from "../../../entities/models/Acts/SupplyInvoice/SupplyInvoiceDTO"
import Enumerable from "linq"
import useSupplyInvoice from "../../../pages/workspace/ProductsCount/SupplyInvoice/models/SupplyInvoiceStore"
import {BikeShopPaths} from "../../../app/routes/paths"
import {formatDate} from "../../../shared/utils/formatDate"
import {SupplyInvoiceArchiveModalContext} from "./SupplyInvoiceArchiveModalContext";
import {useCurrency} from "../../../entities";

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

    const setSelectedSupplyInvoice = useSupplyInvoiceArchiveModal(s => s.setSelectedSupplyInvoice)
    const selectedSupplyInvoice = useSupplyInvoiceArchiveModal(s => s.selectedSupplyInvoice)

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)

    const [navContext, setNavContext] = useState<{ o: boolean, x: number, y: number }>({o: false, x: 0, y: 0})

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        open ? getArchive() : false
    }, [open])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <CustomModal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
            >
                <div className={s.supplyInvoiceArchiveModal_mainBlock} onContextMenu={(e) => {
                    e.preventDefault()
                }}>

                    <SupplyInvoiceArchiveModalContext open={navContext} setOpen={setNavContext}/>
                    <div className={s.supplyInvoiceArchiveModal_title}>
                        Приходные накладные
                    </div>
                    <div className={s.supplyInvoiceArchiveModal_list}>
                        {
                            Enumerable.from(archive as SupplyInvoiceDTO[]).orderByDescending(n => n.supplyInvoice.id).toArray().map((el: SupplyInvoiceDTO) => {
                                return (
                                    <div className={s.supplyInvoiceArchiveModal_item} key={el.supplyInvoice.id}
                                         onDoubleClick={() => {
                                             console.log(el)
                                             if (el.supplyInvoice.sypplyActStatus === 'Created') {
                                                 setIsCreating(false)
                                                 setCurrentSupplyInvoice(el);
                                                 navigate(BikeShopPaths.WORKSPACE.ARRIVAL_OF_PRODUCTS)
                                                 setOpen(false)
                                             }
                                         }}
                                         onContextMenu={(e) => {
                                             setNavContext({o: true, x: e.clientX, y: e.clientY})
                                             setSelectedSupplyInvoice(el)
                                         }}
                                    >
                                        <div className={
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
                                                    {r(el.supplyInvoice.total * fbts.c) + fbts.s}
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