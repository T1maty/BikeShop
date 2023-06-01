import React from 'react'
import s from './StorageProductsList.module.scss'
import {formatDate} from '../../../shared/utils/formatDate'
import CashIcon from '../../../shared/assets/workspace/cash-icon.svg'
import {ProductStorageMoveFullData} from "../../../entities/models/Acts/ProductStorageMove/ProductStorageMoveFullData";
import {useNavigate} from "react-router-dom";
import {BikeShopPaths} from "../../../app/routes/paths";
import {
    useProsuctStorageTransfer
} from "../../../pages/workspace/ProductsCount/StorageProductsTransfer/StorageProductTtransferStore";
import useStorageProductsTransferArchiveModalStore from "./StorageProductsTransferArchiveModalStore";
import {useSnackbar} from "notistack";

interface StorageProductsListProps {
    archive: ProductStorageMoveFullData[]
    isOpennable: boolean
}

export const StorageProductsList: React.FC<StorageProductsListProps> = ({archive, isOpennable}) => {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar()

    const load = useProsuctStorageTransfer(s => s.openHandler)
    const setOpen = useStorageProductsTransferArchiveModalStore(s => s.setOpenStorageProductsTransferArchiveModal)
    const {setOpenContext, setSelected} = useStorageProductsTransferArchiveModalStore(s => s)

    return (
        <>
            {
                archive.map((item) => {
                    return (
                        <div className={s.supplyInvoiceArchiveModal_item}
                             key={item.productMove.id}
                             onDoubleClick={() => {
                                 if (isOpennable) {
                                     load(item)
                                     setOpen(false)
                                     navigate(BikeShopPaths.WORKSPACE.STORAGE_PRODUCTS_TRANSFER)
                                 } else {
                                     enqueueSnackbar('Вы не можете открыть это перемещение', {
                                         variant: 'warning',
                                         autoHideDuration: 3000
                                     })
                                 }
                             }}
                             onContextMenu={e => {
                                 setSelected(item)
                                 setOpenContext({o: true, x: e.clientX, y: e.clientY})
                             }}
                        >
                            <div className={s.item_content}>
                                <div className={s.content_info}>
                                    <div className={s.cashBlock}>
                                        <div className={s.cashBlock_info}>
                                            №{item.productMove.id}
                                        </div>
                                    </div>
                                    <div className={s.cashBlock}>
                                        <div className={s.cashBlock_info}>
                                            Панкратов Евгений
                                        </div>
                                    </div>
                                    <div className={s.cashBlock}>
                                        <div className={s.cashBlock_info}>
                                            Дополнительная информация
                                        </div>
                                    </div>
                                </div>

                                <div className={s.content_cash}>
                                    <div className={s.cashBlock}>
                                        <div className={s.cashBlock_info}>
                                            {item.products.reduce((acc, obj) => acc + obj.quantity, 0)} поз.
                                        </div>
                                    </div>
                                    <div className={s.cashBlock}>
                                        <div className={s.cashBlock_info}>
                                            {item.products.reduce((acc, obj) => acc + obj.quantity, 0)} ед.
                                        </div>
                                    </div>
                                    <div className={s.cashBlock}>
                                        <div className={s.cashBlock_img}>
                                            <img src={CashIcon} alt="cash-icon"/>
                                        </div>
                                        <div className={s.cashBlock_info}>
                                            758
                                        </div>
                                    </div>
                                </div>

                                <div className={s.content_date}>
                                    <div>
                                        <div>Создан:</div>
                                        <div>{formatDate(item.productMove.createdAt)}</div>
                                    </div>
                                    <div>
                                        <div>Закрыт:</div>
                                        <div>{formatDate(item.productMove.updatedAt)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}