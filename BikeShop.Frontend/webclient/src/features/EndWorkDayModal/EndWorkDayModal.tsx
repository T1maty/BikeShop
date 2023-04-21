import React, {useEffect} from 'react'
import s from './EndWorkDayModal.module.scss'
import {Button, CustomModal, LoaderScreen} from '../../shared/ui'
import {useSnackbar} from 'notistack'
import useEndWorkDayModal from "./EndWorkDayModalStore"

export const EndWorkDayModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useEndWorkDayModal(s => s.openEndWorkDayModal)
    const setOpen = useEndWorkDayModal(s => s.setOpenEndWorkDayModal)
    const isLoading = useEndWorkDayModal(s => s.isLoading)
    const errorStatus = useEndWorkDayModal(s => s.errorStatus)
    const getArchive = useEndWorkDayModal(s => s.getArchive)

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
                <div className={s.endWorkDayModal_mainBlock}>
                    <div className={s.endWorkDayModal_title}>
                        Закрытие смены
                    </div>
                    <div className={s.endWorkDayModal_content}>
                        <div className={s.content_report}>
                            <div className={s.report}>
                                Отчёт
                            </div>
                            <Button buttonDivWrapper={s.makeVideoBtn}
                                    // disabled={currentEmployee === null}
                                    // onClick={() => {setCurrentEmployee(null)}}
                            >
                                Снять видео
                            </Button>
                        </div>
                        <div className={s.content_info}>
                            <div className={s.infoBlock}>
                                <div>Отработано: 10ч. из 11ч.</div>
                                <div>Принято ремонтов: 10</div>
                                <div>Выдано ремонтов: 10</div>
                                <div>Продаж: 15</div>
                                <div>Средний чек: 999</div>
                            </div>
                            <div className={s.buttonsBlock}>
                                <Button buttonDivWrapper={s.makeVideoBtn}
                                    // disabled={currentEmployee === null}
                                    // onClick={() => {setCurrentEmployee(null)}}
                                >
                                    Отмена
                                </Button>
                                <Button buttonDivWrapper={s.makeVideoBtn}
                                    // disabled={currentEmployee === null}
                                    // onClick={() => {setCurrentEmployee(null)}}
                                >
                                    Закрыть смену
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CustomModal>
        )
    }
}