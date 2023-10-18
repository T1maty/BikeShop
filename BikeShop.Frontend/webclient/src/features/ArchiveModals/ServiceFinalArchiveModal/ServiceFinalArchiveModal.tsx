import React, {useEffect, useState} from 'react'
import s from './ServiceFinalArchiveModal.module.scss'
import {CustomModal, LoaderScreen} from '../../../shared/ui'
import {useSnackbar} from 'notistack'
import useServiceFinalArchiveModal from './ServiceFinalArchiveModalStore'
import BoxIcon from '../../../shared/assets/workspace/package-icon.svg'
import WrenchIcon from '../../../shared/assets/workspace/wrench-icon.svg'
import AllIcon from '../../../shared/assets/workspace/all-icon.svg'
import ClientIcon from '../../../shared/assets/workspace/user-icon.svg'
import MasterIcon from '../../../shared/assets/workspace/mechanic-icon.svg'
import {ServiceWithData, useCurrency} from "../../../entities"
import {formatDate} from 'shared/utils/formatDate'
import {CheckForServiceWork} from "../../../widgets";
import {PrintModal} from "../../PrintModal/PrintModal";
import Enumerable from "linq";
import {PrintNameEnum} from "../../../entities/enumerables/PrintNameEnum";

export const ServiceFinalArchiveModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const r = useCurrency(s => s.roundUp)
    const fbts = useCurrency(s => s.fromBaseToSelected)

    const open = useServiceFinalArchiveModal(s => s.openServiceFinalArchiveModal)
    const setOpen = useServiceFinalArchiveModal(s => s.setOpenServiceFinalArchiveModal)
    const isLoading = useServiceFinalArchiveModal(s => s.isLoading)
    const errorStatus = useServiceFinalArchiveModal(s => s.errorStatus)
    const archive = useServiceFinalArchiveModal(s => s.archive)
    const getEndedServices = useServiceFinalArchiveModal(s => s.getEndedServices)

    const [v4, sv4] = useState(false)
    const [service, setService] = useState<ServiceWithData>()


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
                    <PrintModal open={v4} setOpen={sv4} children={<CheckForServiceWork children={service!}/>}
                                printAgentName={PrintNameEnum.AgentPrintServiceOutcomeFullAct}
                                id={service ? service.service.id : 0}/>
                    <div className={s.serviceFinalArchiveModal_title}>
                        Архив завершённых ремонтов
                    </div>
                    <div className={s.serviceFinalArchiveModal_list}>
                        {
                            Enumerable.from(archive).orderByDescending(n => n.service.updatedAt).toArray().map((service: ServiceWithData) => {
                                return (
                                    <div className={s.supplyInvoiceArchiveModal_item} key={service.service.id}
                                         onDoubleClick={() => {
                                             setService(service)
                                             sv4(true)
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
                                                        {service.service.userFIO}
                                                    </div>
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={MasterIcon} alt='master-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        {service.service.masterFIO}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={s.content_cash}>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={BoxIcon} alt='box-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        {r(service.service.totalProduct * fbts.c) + fbts.s}
                                                    </div>
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={WrenchIcon} alt='wrench-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        {r(service.service.totalWork * fbts.c) + fbts.s}
                                                    </div>
                                                </div>
                                                <div className={s.cashBlock}>
                                                    <div className={s.cashBlock_img}>
                                                        <img src={AllIcon} alt='all-icon'/>
                                                    </div>
                                                    <div className={s.cashBlock_info}>
                                                        {
                                                            r(service.service.total * fbts.c) + fbts.s
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