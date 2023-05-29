import React, {useEffect, useState} from 'react'
import s from './CheckArchiveModal.module.scss'
import useCheckArchiveModal from "./CheckArchiveModalStore"
import {CustomModal, LoaderScreen} from "../../../shared/ui"
import {useSnackbar} from "notistack"
import {BillWithProducts, useCurrency} from "../../../entities"
import Enumerable from "linq"
import {formatDate} from "../../../shared/utils/formatDate"
import {CheckForShop} from "../../../widgets"
import {PrintModal} from "../../PrintModal/PrintModal"

export const CheckArchiveModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useCheckArchiveModal(s => s.openCheckArchiveModal)
    const setOpen = useCheckArchiveModal(s => s.setOpenCheckArchiveModal)
    const isLoading = useCheckArchiveModal(s => s.isLoading)
    const errorStatus = useCheckArchiveModal(s => s.errorStatus)
    const archive = useCheckArchiveModal(s => s.archive)
    const loadArchive = useCheckArchiveModal(s => s.loadArchive)
    const findCurrency = useCurrency(s => s.find)


    const [openPrint, setOpenPrint] = useState(false)
    const [selected, setSelected] = useState<BillWithProducts | null>(null)

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        open ? loadArchive() : false
        // console.log(archive)
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
                <div className={s.checkArchiveModal_mainBox}>
                    <div className={s.checkArchiveModal_title}>
                        Архив чеков
                    </div>

                    <PrintModal open={openPrint} setOpen={setOpenPrint}>
                        <CheckForShop children={selected!}/>
                    </PrintModal>

                    <div className={s.checkArchiveModal_list}>
                        {
                            !(archive.length > 1) ? <div>Список пуст</div> :

                                archive?.map((bill: BillWithProducts) => {
                                    return (
                                        <div className={s.checkArchiveModal_item} key={bill.bill?.id}
                                             onClick={() => {
                                                 setSelected(bill)
                                             }}
                                             onDoubleClick={() => {
                                                 console.log(bill)
                                                 setOpenPrint(true)
                                             }}
                                        >
                                            <div className={s.item_content}>
                                                <div className={s.content_info}>
                                                    <div>
                                                        ID {bill.bill?.id}
                                                    </div>
                                                    <div className={s.cashBlock}>
                                                        {bill.products.length} поз.
                                                    </div>
                                                    <div className={s.cashBlock}>
                                                        {Enumerable.from(bill?.products).sum(n => n.quantity)} ед.
                                                    </div>
                                                </div>

                                                <div className={s.content_info} style={{paddingLeft: '10px'}}>
                                                    <div>
                                                        {bill.bill?.price + findCurrency(bill.bill?.currencyId)?.symbol!}
                                                    </div>
                                                    <div className={s.cashBlock}>
                                                        {bill.bill?.discount * -1 + findCurrency(bill.bill?.currencyId)?.symbol!}
                                                    </div>
                                                    <div className={s.cashBlock}>
                                                        {bill.bill?.total + findCurrency(bill.bill?.currencyId)?.symbol!}
                                                    </div>
                                                </div>

                                                <div className={s.content_cash}>
                                                    <div className={s.cashBlock}>
                                                        Имя кассира
                                                    </div>
                                                    <div className={s.cashBlock}>
                                                        Имя клиента
                                                    </div>
                                                </div>

                                                <div className={s.content_date}>
                                                    <div>
                                                        <div>Создан:</div>
                                                        <div>{bill.bill ? formatDate(bill.bill?.createdAt) : "0"}</div>
                                                    </div>
                                                    <div>
                                                        <div>Закрыт:</div>
                                                        <div>{bill.bill ? formatDate(bill.bill?.updatedAt) : "0"}</div>
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