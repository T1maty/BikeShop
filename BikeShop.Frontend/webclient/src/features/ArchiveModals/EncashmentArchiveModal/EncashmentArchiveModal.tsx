import React, {useEffect} from 'react'
import s from './EncashmentArchiveModal.module.scss'
import {CustomModal, LoaderScreen} from '../../../shared/ui'
import {useSnackbar} from 'notistack'
import {useNavigate} from 'react-router-dom'
import Enumerable from "linq"
import useSupplyInvoice from "../../../pages/workspace/SupplyInvoice/models/SupplyInvoiceStore"
import {BikeShopPaths} from "../../../app/routes/paths"
import useEncashmentArchiveModal from "./EncashmentArchiveModalStore"

export const EncashmentArchiveModal = () => {

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const open = useEncashmentArchiveModal(s => s.openEncashmentArchiveModal)
    const setOpen = useEncashmentArchiveModal(s => s.setOpenEncashmentArchiveModal)
    const isLoading = useEncashmentArchiveModal(s => s.isLoading)
    const errorStatus = useEncashmentArchiveModal(s => s.errorStatus)
    const getArchive = useEncashmentArchiveModal(s => s.getArchive)
    const archive = useEncashmentArchiveModal(s => s.archive)

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
                <div className={s.encashmentArchiveModal_mainBlock}>

                    <div className={s.header_title}>
                        <div className={s.encashmentArchiveModal_title}>
                            Архив инвентаризации
                        </div>
                        <div className={s.shortFall_title}>
                            Недостача
                        </div>
                    </div>

                    <div className={s.scroll_wrapper}>

                        <div className={s.encashment_Block}>
                            {/*<div className={s.encashmentArchiveModal_title}>*/}
                            {/*    Архив инвентаризации*/}
                            {/*</div>*/}
                            <div className={s.encashmentArchiveModal_list}>
                                {
                                    archive.map((el: any) => {
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
                                                        <div className={s.item_contentTop_sum}>
                                                            Инфа
                                                        </div>
                                                    </div>
                                                    <div className={s.item_contentBottom}>
                                                        <div className={s.item_contentBottom_info}>
                                                            {el.supplyInvoice.description}
                                                        </div>
                                                        <div className={s.item_contentBottom_date}>
                                                            <div>
                                                                <div>Создан:</div>
                                                                <div>{el.supplyInvoice.createdAt}</div>
                                                            </div>
                                                            <div>
                                                                <div>Изменён:</div>
                                                                <div>{el.supplyInvoice.updatedAt}</div>
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

                        <div className={s.shortFall_Block}>
                            {/*<div className={s.shortFall_title}>*/}
                            {/*    Недостача*/}
                            {/*</div>*/}
                            <div className={s.shortFall_list}>
                                <div className={s.shortFall_listItem}>
                                    <div className={s.listItem_title}>
                                        №121212
                                    </div>
                                    <div className={s.listItem_content}>
                                        <div className={s.content_info}>
                                            <div>Недостача: 12121</div>
                                            <div>Позиций: 12</div>
                                            <div>Единиц: 3</div>
                                            <div>Инфа</div>
                                        </div>
                                        <div className={s.content_date}>
                                            <div>
                                                <div>Создан:</div>
                                                <div>12-04-2023</div>
                                            </div>
                                            <div>
                                                <div>Изменён:</div>
                                                <div>15-04-2023</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </CustomModal>
        )
    }
}