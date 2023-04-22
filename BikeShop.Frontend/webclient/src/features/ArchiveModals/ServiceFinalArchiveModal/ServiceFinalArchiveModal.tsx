import React, {useEffect} from 'react'
import s from './ServiceFinalArchiveModal.module.scss'
import {CustomModal, LoaderScreen} from '../../../shared/ui'
import {useSnackbar} from 'notistack'
import {useNavigate} from 'react-router-dom'
import {SupplyInvoiceDTO} from "../../../entities/models/Acts/SupplyInvoice/SupplyInvoiceDTO"
import Enumerable from "linq"
import {BikeShopPaths} from "../../../app/routes/paths"
import useServiceFinalArchiveModal from './ServiceFinalArchiveModalStore'
import BoxIcon from '../../../shared/assets/workspace/package-icon.svg'
import WrenchIcon from '../../../shared/assets/workspace/wrench-icon.svg'
import AllIcon from '../../../shared/assets/workspace/all-icon.svg'
import ClientIcon from '../../../shared/assets/workspace/user-icon.svg'
import MasterIcon from '../../../shared/assets/workspace/mechanic-icon.svg'

export const ServiceFinalArchiveModal = () => {

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const open = useServiceFinalArchiveModal(s => s.openServiceFinalArchiveModal)
    const setOpen = useServiceFinalArchiveModal(s => s.setOpenServiceFinalArchiveModal)
    const isLoading = useServiceFinalArchiveModal(s => s.isLoading)
    const errorStatus = useServiceFinalArchiveModal(s => s.errorStatus)
    const getArchive = useServiceFinalArchiveModal(s => s.getArchive)
    const archive = useServiceFinalArchiveModal(s => s.archive)

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
                <div className={s.serviceFinalArchiveModal_mainBlock}>
                    <div className={s.serviceFinalArchiveModal_title}>
                        Архив ремонтов
                    </div>
                    <div className={s.serviceFinalArchiveModal_list}>
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
                                        <div className={s.item_content}>
                                            <div className={s.content_info}>
                                                <div>
                                                    №{el.supplyInvoice.id}
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={ClientIcon} alt='wrench-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        Петров Василий
                                                    </div>
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={MasterIcon} alt='wrench-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        Иванов Андрей
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={s.content_cash}>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={BoxIcon} alt='box-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        99999111
                                                    </div>
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={WrenchIcon} alt='wrench-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        999992
                                                    </div>
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={AllIcon} alt='all-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        99999121212
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={s.content_date}>
                                                <div>
                                                    <div>Создан:</div>
                                                    <div>{el.supplyInvoice.createdAt}</div>
                                                </div>
                                                <div>
                                                    <div>Закрыт:</div>
                                                    <div>{el.supplyInvoice.updatedAt}</div>
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