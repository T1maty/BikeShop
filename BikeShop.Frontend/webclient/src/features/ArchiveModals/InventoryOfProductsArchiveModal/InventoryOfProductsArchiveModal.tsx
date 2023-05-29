import React, {useEffect, useState} from 'react'
import s from './InventoryOfProductsArchiveModal.module.scss'
import {Button, CustomModal, LoaderScreen} from '../../../shared/ui'
import {useSnackbar} from 'notistack'
import {useNavigate} from 'react-router-dom'
import {BikeShopPaths} from "../../../app/routes/paths"
import useInventoryOfProductsArchiveModal from "./InventoryOfProductsArchiveModalStore"
import {useInventarization} from "../../../pages/workspace/ProductsCount/InventarizationPage/InventarizationPageStore"
import {InventarizationAPI, LocalStorage} from "../../../entities"
import {InventoryArchiveContext} from "./InventoryArchiveContext"
import {formatDate} from '../../../shared/utils/formatDate'

export const InventoryOfProductsArchiveModal = () => {

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const open = useInventoryOfProductsArchiveModal(s => s.openInventoryOfProductsArchiveModal)
    const setOpen = useInventoryOfProductsArchiveModal(s => s.setOpenInventoryOfProductsArchiveModal)
    const isLoading = useInventoryOfProductsArchiveModal(s => s.isLoading)
    const errorStatus = useInventoryOfProductsArchiveModal(s => s.errorStatus)

    const getArchive = useInventoryOfProductsArchiveModal(s => s.getArchive)
    const getLackArchive = useInventoryOfProductsArchiveModal(s => s.getLackArchive)
    const archive = useInventoryOfProductsArchiveModal(s => s.archive)
    const lackArchive = useInventoryOfProductsArchiveModal(s => s.lackArchive)
    const setArchive = useInventoryOfProductsArchiveModal(s => s.setArchive)
    const setSelected = useInventoryOfProductsArchiveModal(s => s.setSelected)

    const setInventariazation = useInventarization(s => s.setInventariazation)

    const [context, setContext] = useState<{ o: boolean, x: number, y: number }>({o: false, x: 0, y: 0})

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        open ? getArchive() : false
        open ? getLackArchive() : false
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
                <InventoryArchiveContext open={context} setOpen={setContext}/>
                <div className={s.encashmentArchiveModal_mainBlock} onContextMenu={e => {
                    e.preventDefault()
                }}>
                    <Button buttonDivWrapper={s.newInventory_btn}
                            onClick={() => {
                                InventarizationAPI.create(LocalStorage.shopId()!, LocalStorage.userId()!).then(n => {
                                    enqueueSnackbar('Ивентаризация создана', {
                                        variant: 'success',
                                        autoHideDuration: 3000
                                    })
                                    setArchive([...archive, n.data])
                                })
                            }}
                    >
                        Новая инвентаризация
                    </Button>

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
                            <div className={s.encashmentArchiveModal_list}>
                                {
                                    archive.map((el) => {
                                        let lack = lackArchive.find(n => n.inventarizationLack.inventarizationId === el.inventarization.id)

                                        return (
                                            <>
                                                <div className={s.supplyInvoiceArchiveModal_item}
                                                     key={el.inventarization.id}
                                                     onClick={() => {
                                                         setSelected(el)
                                                     }}
                                                     onDoubleClick={() => {
                                                         console.log(el)
                                                         setInventariazation(el);
                                                         navigate(BikeShopPaths.WORKSPACE.INVENTARIZATION)
                                                         setOpen(false)
                                                     }}
                                                     onContextMenu={(e) => {
                                                         setSelected(el)
                                                         setContext({o: true, x: e.clientX, y: e.clientY})
                                                     }}
                                                >
                                                    <div className={
                                                        // s.item_status
                                                        el.inventarization.status === 'InWork' ? s.status_WaitingPayment :
                                                            el.inventarization.status === 'Closed' ? s.status_Ready :
                                                                el.inventarization.status === 'Canceled' ? s.status_Canceled : ''}
                                                    >
                                                        {el.inventarization.status}
                                                    </div>
                                                    <div className={s.item_content}>
                                                        <div className={s.item_contentTop}>
                                                            <div className={s.item_contentTop_number}>
                                                                №{el.inventarization.id}
                                                            </div>
                                                            <div className={s.item_contentTop_sum}>
                                                                Инфа
                                                            </div>
                                                        </div>
                                                        <div className={s.item_contentBottom}>
                                                            <div className={s.item_contentBottom_info}>
                                                                {el.inventarization.description}
                                                            </div>
                                                            <div className={s.item_contentBottom_date}>
                                                                <div>
                                                                    <div>Создан:</div>
                                                                    <div>{formatDate(el.inventarization.createdAt)}</div>
                                                                </div>
                                                                <div>
                                                                    <div>Изменён:</div>
                                                                    <div>{formatDate(el.inventarization.updatedAt)}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {
                                                    lack !== undefined ?
                                                        <div className={s.shortFall_Block}>
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
                                                        : <div className={s.no_shortFall}>{''}</div>
                                                }
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>


                    </div>
                </div>
            </CustomModal>
        )
    }
}