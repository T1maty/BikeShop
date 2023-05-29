import React, {useEffect} from 'react'
import s from './ServiceFinalArchiveModal.module.scss'
import {CustomModal, LoaderScreen} from '../../../shared/ui'
import {useSnackbar} from 'notistack'
import {useNavigate} from 'react-router-dom'
import useServiceFinalArchiveModal from './ServiceFinalArchiveModalStore'
import BoxIcon from '../../../shared/assets/workspace/package-icon.svg'
import WrenchIcon from '../../../shared/assets/workspace/wrench-icon.svg'
import AllIcon from '../../../shared/assets/workspace/all-icon.svg'
import ClientIcon from '../../../shared/assets/workspace/user-icon.svg'
import MasterIcon from '../../../shared/assets/workspace/mechanic-icon.svg'
import {ServiceWithData} from "../../../entities"
import {formatDate} from 'shared/utils/formatDate'

export const ServiceFinalArchiveModal = () => {

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const open = useServiceFinalArchiveModal(s => s.openServiceFinalArchiveModal)
    const setOpen = useServiceFinalArchiveModal(s => s.setOpenServiceFinalArchiveModal)
    const isLoading = useServiceFinalArchiveModal(s => s.isLoading)
    const errorStatus = useServiceFinalArchiveModal(s => s.errorStatus)
    const archive = useServiceFinalArchiveModal(s => s.archive)
    const getEndedServices = useServiceFinalArchiveModal(s => s.getEndedServices)

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        open ? getEndedServices() : false
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
                <div className={s.serviceFinalArchiveModal_mainBlock}>
                    <div className={s.serviceFinalArchiveModal_title}>
                        Архив завершённых ремонтов
                    </div>
                    <div className={s.serviceFinalArchiveModal_list}>
                        {
                            archive.map((service: ServiceWithData) => {
                                return (
                                    <div className={s.supplyInvoiceArchiveModal_item} key={service.service.id}
                                         onDoubleClick={() => {
                                             // setIsCreating(false)
                                             // setCurrentSupplyInvoice(el);
                                             // navigate(BikeShopPaths.WORKSPACE.ARRIVAL_OF_PRODUCTS)
                                         }}
                                    >
                                        <div className={s.item_content}>
                                            <div className={s.content_info}>
                                                <div>
                                                    №{service.service.id}, {service.service.name}
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={ClientIcon} alt='client-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        {//service.client !== null ? service.client.lastName : 'Неизвестный'
                                                        } {''}
                                                        {//service.client !== null ? service.client.firstName : 'клиент'
                                                        }
                                                    </div>
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={MasterIcon} alt='master-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        {//service.userMaster !== null ? service.userMaster.lastName : 'Неизвестный'
                                                        } {''}
                                                        {//service.userMaster !== null ? service.userMaster.firstName : 'мастер'
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={s.content_cash}>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={BoxIcon} alt='box-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        {service.products.reduce((acc, obj) => acc + obj.price, 0)}
                                                    </div>
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={WrenchIcon} alt='wrench-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        {service.works.reduce((acc, obj) => acc + obj.price, 0)}
                                                    </div>
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={AllIcon} alt='all-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        {
                                                            service.products.reduce((acc, obj) => acc + obj.price, 0)
                                                            +
                                                            service.works.reduce((acc, obj) => acc + obj.price, 0)
                                                        }
                                                    </div>
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