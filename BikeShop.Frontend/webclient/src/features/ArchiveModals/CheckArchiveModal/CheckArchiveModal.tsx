import React, {useEffect} from 'react'
import s from './CheckArchiveModal.module.scss'
import useCheckArchiveModal from "./CheckArchiveModalStore"
import {CustomModal, LoaderScreen} from "../../../shared/ui"
import {useSnackbar} from "notistack"
import {formatDate} from "../../../shared/utils/formatDate"
import {ServiceWithData} from "../../../entities"

export const CheckArchiveModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useCheckArchiveModal(s => s.openCheckArchiveModal)
    const setOpen = useCheckArchiveModal(s => s.setOpenCheckArchiveModal)
    const isLoading = useCheckArchiveModal(s => s.isLoading)
    const errorStatus = useCheckArchiveModal(s => s.errorStatus)
    const archive = useCheckArchiveModal(s => s.archive)
    const getEndedServices = useCheckArchiveModal(s => s.getEndedServices)

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        getEndedServices()
    }, [])

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
                    <div className={s.checkArchiveModal_list}>
                        {
                            archive.map((service: ServiceWithData) => {
                                return (
                                    <div className={s.checkArchiveModal_item} key={service.service.id}
                                         onDoubleClick={() => {
                                             // setIsCreating(false)
                                             // setCurrentSupplyInvoice(el);
                                             // navigate(BikeShopPaths.WORKSPACE.ARRIVAL_OF_PRODUCTS)
                                         }}
                                    >
                                        <div className={s.item_content}>
                                            <div className={s.content_info}>
                                                <div>
                                                    №{service.service.id}
                                                </div>
                                                <div className={s.cashBlock}>
                                                    1 позиция
                                                </div>
                                                <div className={s.cashBlock}>
                                                    3 ед. товара
                                                </div>
                                            </div>

                                            <div className={s.content_info} style={{paddingLeft: '10px'}}>
                                                <div>
                                                    $ 99991
                                                </div>
                                                <div className={s.cashBlock}>
                                                    $ 121323
                                                </div>
                                                <div className={s.cashBlock}>
                                                    $ 5646
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
                                                    <div>{formatDate(service.service.createdAt)}</div>
                                                </div>
                                                <div>
                                                    <div>Закрыт:</div>
                                                    <div>{formatDate(service.service.updatedAt)}</div>
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