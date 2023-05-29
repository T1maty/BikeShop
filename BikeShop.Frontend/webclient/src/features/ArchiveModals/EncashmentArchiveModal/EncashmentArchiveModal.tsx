import React, {useEffect, useState} from 'react'
import s from './EncashmentArchiveModal.module.scss'
import {CustomModal, LoaderScreen} from '../../../shared/ui'
import {useSnackbar} from 'notistack'
import useEncashmentArchiveModal from './EncashmentArchiveModalStore'
import CashIcon from '../../../shared/assets/workspace/cash-icon.svg'
import PayCardIcon from '../../../shared/assets/workspace/paycard-icon.svg'
import MoneyIcon from '../../../shared/assets/workspace/money-icon.svg'
import {formatDate} from "../../../shared/utils/formatDate"
import {Encashment, useCurrency} from "../../../entities"
import Enumerable from "linq"
import {EncashmentArchiveContext} from "./EncashmentArchiveContext"
import {PrintModal} from "../../PrintModal/PrintModal";
import {EncashmentPaper} from "../../../widgets/workspace/Invoices/Encashment/EncashmentPaper";

export const EncashmentArchiveModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useEncashmentArchiveModal(s => s.openEncashmentArchiveModal)
    const setOpen = useEncashmentArchiveModal(s => s.setOpenEncashmentArchiveModal)
    const isLoading = useEncashmentArchiveModal(s => s.isLoading)
    const errorStatus = useEncashmentArchiveModal(s => s.errorStatus)
    const getArchive = useEncashmentArchiveModal(s => s.getArchive)
    const archive = useEncashmentArchiveModal(s => s.archive)
    const selected = useEncashmentArchiveModal(s => s.selected)
    const setSelected = useEncashmentArchiveModal(s => s.setSelected)

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)

    const [context, setContext] = useState<{ o: boolean, x: number, y: number }>({o: false, x: 0, y: 0})
    const [print, setPrint] = useState(false)
    const [p, sp] = useState<Encashment | null>(null)

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
                <PrintModal open={print} setOpen={setPrint} children={<EncashmentPaper encashmant={p!}/>}/>
                <EncashmentArchiveContext open={context} setOpen={setContext}/>
                <div className={s.encashmentArchiveModal_mainBlock} onContextMenu={e => e.preventDefault()}>
                    <div className={s.encashmentArchiveModal_title}>
                        Архив инкассаций
                    </div>
                    <div className={s.encashmentArchiveModal_list}>
                        {
                            Enumerable.from(archive).orderByDescending(n => n.id).toArray().map((el) => {
                                return (
                                    <div className={s.supplyInvoiceArchiveModal_item} key={el.id}
                                         onDoubleClick={() => {
                                             sp(el)
                                             setPrint(true)
                                         }}
                                         onContextMenu={e => {
                                             setSelected(el)
                                             setContext({o: true, x: e.clientX, y: e.clientY})
                                         }}
                                    >
                                        <div className={
                                            // s.item_status
                                            el.status === 'InTransfer' ? s.status_WaitingPayment :
                                                el.status === 'Finished' ? s.status_Ready :
                                                    el.status === 'InShop' ? s.status_Canceled : ''}
                                        >
                                            {el.status}
                                        </div>

                                        <div className={s.item_content}>
                                            <div className={s.content_info}>
                                                <div className={s.item_contentTop_number}>
                                                    №{el.id}
                                                </div>
                                                <div className={s.item_contentTop_number}>
                                                    Иванов Василий
                                                </div>
                                                <div>
                                                    {el.description}
                                                </div>
                                            </div>

                                            <div className={s.content_cash}>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={CashIcon} alt='cash-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        {r(el.cash * fbts.c) + fbts.s}
                                                    </div>
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={PayCardIcon} alt='card-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        {r(el.card * fbts.c) + fbts.s}
                                                    </div>
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={MoneyIcon} alt='cash-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        {r(el.cashRemain * fbts.c) + fbts.s}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={s.content_date}>
                                                <div>
                                                    <div>Создан:</div>
                                                    <div>{formatDate(el.createdAt)}</div>
                                                </div>
                                                <div>
                                                    <div>Изменён:</div>
                                                    <div>{formatDate(el.updatedAt)}</div>
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