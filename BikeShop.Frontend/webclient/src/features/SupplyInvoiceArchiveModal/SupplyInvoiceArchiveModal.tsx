import React, {useState, useEffect} from 'react'
import s from './SupplyInvoiceArchiveModal.module.scss'
import {CustomModal, LoaderScreen} from '../../shared/ui'
import useSupplyInvoiceArchiveModal from './SupplyInvoiceArchiveModalStore'
import {useSnackbar} from 'notistack'
import {useNavigate} from 'react-router-dom'
import {BikeShopPaths} from '../../app/routes/paths'

export const SupplyInvoiceArchiveModal = () => {

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const open = useSupplyInvoiceArchiveModal(s => s.openSupplyInvoiceArchiveModalStore)
    const setOpen = useSupplyInvoiceArchiveModal(s => s.setOpenSupplyInvoiceArchiveModalStore)
    const isLoading = useSupplyInvoiceArchiveModal(s => s.isLoading)
    const errorStatus = useSupplyInvoiceArchiveModal(s => s.errorStatus)
    const getArchive = useSupplyInvoiceArchiveModal(s => s.getArchive)

    const [data, setData] = useState<any>([
        {id: 100, status: 'Ожидает', qty: 28, totalNum: 59, sum: 9999,
            info: 'blalfldflfsldflsf sfsdfs sfsfs', created: '21/04/2023', updated: '22/04/2023'},
        {id: 200, status: 'Отменён', qty: 58, totalNum: 69, sum: 9999999,
            info: 'blalfldfgdg dgyry545s sfsfs', created: '21/04/2023', updated: '22/04/2023'},
        {id: 300, status: 'Применён', qty: 158, totalNum: 189, sum: 109999,
            info: 'blalfldflfrete gergf sfsdfs sfsfs dfg dgfd dfffffffffff fgfg453453 rg f dfgd dg d',
            created: '21/04/2023', updated: '22/04/2023'},
        {id: 400, status: 'Применён', qty: 158, totalNum: 189, sum: 109999,
            info: 'blalfldflfrete gergf sfsdfs sfsfs dfg dgfd dfffffffffff fgfg453453 rg f dfgd dg d',
            created: '21/04/2023', updated: '22/04/2023'},
        {id: 500, status: 'Применён', qty: 158, totalNum: 189, sum: 109999,
            info: 'blalfldflfrete gergf sfsdfs sfsfs dfg dgfd dfffffffffff fgfg453453 rg f dfgd dg d',
            created: '21/04/2023', updated: '22/04/2023'},
    ])

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        // getArchive()
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
                    <div className={s.supplyInvoiceArchiveModal_title}>Приходные накладные</div>
                    <div className={s.supplyInvoiceArchiveModal_list}>
                        {
                            data.map((el: any) => {
                                return (
                                    <div className={s.supplyInvoiceArchiveModal_item} key={el.id}
                                         onDoubleClick={() => {navigate(BikeShopPaths.WORKSPACE.CASHBOX)}}
                                    >
                                        <div className={
                                            // s.item_status
                                            el.status === 'Ожидает' ? s.status_WaitingPayment :
                                                el.status === 'Применён' ? s.status_Ready :
                                                    el.status === 'Отменён' ? s.status_Canceled : ''
                                        }>
                                            {el.status}
                                        </div>
                                        <div className={s.item_content}>
                                            <div className={s.item_contentTop}>
                                                <div className={s.item_contentTop_number}>
                                                    №{el.id}
                                                </div>
                                                <div className={s.item_contentTop_qty}>
                                                    {el.qty} поз.
                                                </div>
                                                <div className={s.item_contentTop_totalNum}>
                                                    {el.totalNum} ед.
                                                </div>
                                                <div className={s.item_contentTop_sum}>
                                                    {el.sum} ГРН.
                                                </div>
                                            </div>
                                            <div className={s.item_contentBottom}>
                                                <div className={s.item_contentBottom_info}>
                                                    {el.info}
                                                </div>
                                                <div className={s.item_contentBottom_date}>
                                                    <div>
                                                        <div>Создан:</div>
                                                        <div>{el.created}</div>
                                                    </div>
                                                    <div>
                                                        <div>Изменён:</div>
                                                        <div>{el.updated}</div>
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