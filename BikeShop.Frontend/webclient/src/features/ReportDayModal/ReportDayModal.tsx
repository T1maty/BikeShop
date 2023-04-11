import React, {useEffect} from 'react'
import s from './ReportDayModal.module.scss'
import {Button, CustomModal, LoaderScreen} from '../../shared/ui'
import {useSnackbar} from 'notistack'
import useReportDayModal from "./ReportDayModalStore"

export const ReportDayModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useReportDayModal(s => s.openReportDayModal)
    const setOpen = useReportDayModal(s => s.setOpenReportDayModal)
    const isLoading = useReportDayModal(s => s.isLoading)
    const errorStatus = useReportDayModal(s => s.errorStatus)
    const getArchive = useReportDayModal(s => s.getArchive)

    const data = [
        {id: 1, title: 'Отработано часов:', qty: 20, sum: 999999},
        {id: 2, title: 'Ремонты в мастерской:', qty: 210, sum: 999999},
        {id: 3, title: 'Продажи в мастерской:', qty: 20, sum: 999999},
        {id: 4, title: 'Продажи в магазине:', qty: 20, sum: 999999},
    ]

    const totalSum = data.reduce((acc, obj) => acc + obj.sum, 0)

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
                <div className={s.reportDayModal_mainBlock}>
                    <div className={s.reportDayModal_title}>Иванов Иван Васильевич</div>
                    <div className={s.reportDayModal_date}>Последний отчёт: 25.01.2023 16:32</div>
                    <div className={s.reportDayModal_info}>
                        {
                            data.map(el => {
                                return (
                                    <div className={s.info_contentItem} key={el.id}>
                                        <div className={s.content_text}>
                                            {el.title} {el.qty}
                                        </div>
                                        <div className={s.content_price}>
                                            {el.sum} грн
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={s.reportDayModal_total}>
                        <div>Всего</div>
                        <div>{totalSum} грн</div>
                    </div>
                    <Button buttonDivWrapper={s.reportDayModal_cancelBtn}
                            // onClick={() => {setCurrentEmployee(null)}}
                    >
                        ОК
                    </Button>
                </div>
            </CustomModal>
        )
    }
}