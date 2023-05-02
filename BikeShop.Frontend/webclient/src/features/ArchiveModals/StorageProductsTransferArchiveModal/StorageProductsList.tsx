import React from 'react'
import s from './StorageProductsList.module.scss'
import {formatDate} from '../../../shared/utils/formatDate'
import {ServiceWithData} from '../../../entities'
import ClientIcon from '../../../shared/assets/workspace/user-icon.svg'
import CashIcon from '../../../shared/assets/workspace/cash-icon.svg'
import MasterIcon from '../../../shared/assets/workspace/mechanic-icon.svg'
import BoxIcon from '../../../shared/assets/workspace/package-icon.svg'
import WrenchIcon from '../../../shared/assets/workspace/wrench-icon.svg'
import AllIcon from '../../../shared/assets/workspace/all-icon.svg'

interface StorageProductsListProps {
    archive: any
}

export const StorageProductsList: React.FC<StorageProductsListProps> = ({archive}) => {

    return (
        <>
            {
                archive.map((service: ServiceWithData) => {
                    return (
                        <div className={s.supplyInvoiceArchiveModal_item}
                             key={service.service.id}
                             onDoubleClick={() => {
                                 // setIsCreating(false)
                                 // setCurrentSupplyInvoice(el);
                                 // navigate(BikeShopPaths.WORKSPACE.ARRIVAL_OF_PRODUCTS)
                             }}
                        >
                            <div className={s.item_content}>
                                <div className={s.content_info}>
                                    <div className={s.cashBlock}>
                                        <div className={s.cashBlock_info}>
                                            №{service.service.id}
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
                                            {service.products.reduce((acc, obj) => acc + obj.price, 0)} поз.
                                        </div>
                                    </div>
                                    <div className={s.cashBlock}>
                                        <div className={s.cashBlock_info}>
                                            {service.works.reduce((acc, obj) => acc + obj.price, 0)} ед.
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
        </>
    )
}