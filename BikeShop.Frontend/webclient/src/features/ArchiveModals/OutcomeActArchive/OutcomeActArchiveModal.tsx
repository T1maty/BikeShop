import React, {useEffect, useState} from 'react';
import {CustomModal, LoaderScreen} from "../../../shared/ui";
import s from "./OutcomeActArchiveModal.module.scss"
import Enumerable from "linq";
import {formatDate} from "../../../shared/utils/formatDate";
import {useCurrency} from "../../../entities";
import useOutcomeActArchiveModal from "./OutcomeActArchiveModalStore";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import {OutcomeActWithProducts} from "../../../entities/entities/Acts/OutcomeAct/OutcomeActWithProducts";
import {OutcomeActArchiveModalContext} from "./OutcomeActArchiveModalContext";
import useOutcomeActPage from "../../../pages/workspace/ProductsCount/OutcomeActPage/OutcomeActPageStore";
import {BikeShopPaths} from "../../../app/routes/paths";

const OutcomeActArchiveModal = () => {

    const archive = useOutcomeActArchiveModal(s => s.archive)
    const open = useOutcomeActArchiveModal(s => s.open)
    const setOpen = useOutcomeActArchiveModal(s => s.setOpen)
    const getArchive = useOutcomeActArchiveModal(s => s.getArchive)
    const errorStatus = useOutcomeActArchiveModal(s => s.errorStatus)
    const isLoading = useOutcomeActArchiveModal(s => s.isLoading)
    const setSelectedOutcomeAct = useOutcomeActArchiveModal(s => s.setSelectedOutcomeAct)
    const setIsCreating = useOutcomeActPage(s => s.setIsCreating)
    const setCurrentAct = useOutcomeActPage(s => s.setCurrentAct)


    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)

    const [navContext, setNavContext] = useState<{ o: boolean, x: number, y: number }>({o: false, x: 0, y: 0})

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
                <div className={s.supplyInvoiceArchiveModal_mainBlock} onContextMenu={(e) => {
                    e.preventDefault()
                }}>

                    <OutcomeActArchiveModalContext open={navContext} setOpen={setNavContext}/>
                    <div className={s.supplyInvoiceArchiveModal_title}>
                        Приходные накладные
                    </div>
                    <div className={s.supplyInvoiceArchiveModal_list}>
                        {
                            Enumerable.from(archive as OutcomeActWithProducts[]).orderByDescending(n => n.outcomeAct.id).toArray().map((el) => {
                                return (
                                    <div className={s.supplyInvoiceArchiveModal_item} key={el.outcomeAct.id}
                                         onDoubleClick={() => {
                                             console.log(el)
                                             if (el.outcomeAct.outcomeActStatus === 'Created') {
                                                 setIsCreating(false)
                                                 setCurrentAct(el);
                                                 navigate(BikeShopPaths.WORKSPACE.OUTCOME_ACT)
                                                 setOpen(false)
                                             }
                                         }}
                                         onContextMenu={(e) => {
                                             setNavContext({o: true, x: e.clientX, y: e.clientY})
                                             setSelectedOutcomeAct(el)
                                         }}
                                    >
                                        <div className={
                                            el.outcomeAct.outcomeActStatus === 'Created' ? s.status_WaitingPayment :
                                                el.outcomeAct.outcomeActStatus === 'Executed' ? s.status_Ready :
                                                    el.outcomeAct.outcomeActStatus === 'Canceled' ? s.status_Canceled : ''}
                                        >
                                            {el.outcomeAct.outcomeActStatus}
                                        </div>
                                        <div className={s.item_content}>
                                            <div className={s.item_contentTop}>
                                                <div className={s.item_contentTop_number}>
                                                    №{el.outcomeAct.id}
                                                </div>
                                                <div className={s.item_contentTop_qty}>
                                                    {el.products.length} поз.
                                                </div>
                                                <div className={s.item_contentTop_totalNum}>
                                                    {Enumerable.from(el.products).select(n => n.quantity).sum()} ед.
                                                </div>
                                                <div className={s.item_contentTop_sum}>
                                                    {r(Enumerable.from(el.products).select(n => n.quantity * n.incomePrice).sum() * fbts.c) + fbts.s}
                                                </div>
                                            </div>
                                            <div className={s.item_contentBottom}>
                                                <div className={s.item_contentBottom_info}>
                                                    {el.outcomeAct.description}
                                                </div>
                                                <div className={s.item_contentBottom_date}>
                                                    <div>
                                                        <div>Создан:</div>
                                                        <div>{formatDate(el.outcomeAct.createdAt)}</div>
                                                    </div>
                                                    <div>
                                                        <div>Изменён:</div>
                                                        <div>{formatDate(el.outcomeAct.updatedAt)}</div>
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
};

export default OutcomeActArchiveModal;