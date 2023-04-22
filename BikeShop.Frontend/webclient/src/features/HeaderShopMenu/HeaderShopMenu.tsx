import React, {useState} from 'react'
import s from '../../widgets/workspace/Header/ui/Header.module.scss'
import {BikeShopPaths} from "../../app/routes/paths"
import {useNavigate} from "react-router-dom"
import {useTranslation} from "react-i18next"
import {useComponentVisible} from "../../shared/hooks/useComponentVisible"
import {MenuIcon} from 'shared/ui/IconButtons/MenuIcon'
import useCreateShopModal from "../CRUDModals/CreateShopModal/CreateShopModalStore"
import useCreateStorageModal from "../CRUDModals/CreateStorageModal/CreateStorageModalStore"
import useCreateCurrencyModal from "../CRUDModals/CreateCurrencyModal/CreateCurrencyModalStore"
import useCreateQuantityUnitModal from "../CRUDModals/CreateQuantityUnitModal/CreateQuantityUnitModalStore"
import useServiceArchiveModal from "../ArchiveModals/ServiceArchiveModal/ServiceArchiveModalStore"
import useSupplyInvoiceArchiveModal from "../ArchiveModals/SupplyInvoiceArchiveModal/SupplyInvoiceArchiveModalStore"
import useEncashmentArchiveModal from "../ArchiveModals/InventoryOfProductsArchiveModal/InventoryOfProductsArchiveModalStore"
import {CreateShopModal} from "../CRUDModals/CreateShopModal/CreateShopModal"
import {CreateStorageModal} from "../CRUDModals/CreateStorageModal/CreateStorageModal"
import {CreateCurrencyModal} from "../CRUDModals/CreateCurrencyModal/CreateCurrencyModal"
import {CreateQuantityUnitModal} from "../CRUDModals/CreateQuantityUnitModal/CreateQuantityUnitModal"
import {ServiceArchiveModal} from "../ArchiveModals/ServiceArchiveModal/ServiceArchiveModal"
import {InventoryOfProductsArchiveModal} from "../ArchiveModals/InventoryOfProductsArchiveModal/InventoryOfProductsArchiveModal"
import {SupplyInvoiceArchiveModal} from "../ArchiveModals/SupplyInvoiceArchiveModal/SupplyInvoiceArchiveModal"
import useInventoryOfProductsArchiveModal
    from "../ArchiveModals/InventoryOfProductsArchiveModal/InventoryOfProductsArchiveModalStore";

export const HeaderShopMenu = () => {

    const {t} = useTranslation()
    const navigate = useNavigate()
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

    const openSupplyInvoiceArchiveModal = useSupplyInvoiceArchiveModal(s => s.setOpenSupplyInvoiceArchiveModal)
    const openInventoryOfProductsArchiveModal = useInventoryOfProductsArchiveModal(s => s.setOpenInventoryOfProductsArchiveModal)
    const openServiceArchiveModal = useServiceArchiveModal(s => s.setOpenServiceArchiveModal)

    const openShopModal = useCreateShopModal(s => s.setOpenCreateShopModal)
    const openStorageModal = useCreateStorageModal(s => s.setOpenCreateStorageModal)
    const openCurrencyModal = useCreateCurrencyModal(s => s.setOpenCreateCurrencyModal)
    const openQuantityUnitModal = useCreateQuantityUnitModal(s => s.setOpenCreateQuantityUnitModal)

    const [menuItems1, setMenuItems1] = useState([
        {
            title: 'Архив',
            func: () => {
                // navigate(BikeShopPaths.WORKSPACE.SERVICE)
            }
        },
    ])
    const [subMenuItems1, setSubMenuItems1] = useState([
        {
            title: 'Приход товара',
            func: () => {
                openSupplyInvoiceArchiveModal(true)
                setIsComponentVisible(false)
            }
        },
        {
            title: 'Инвентаризация',
            func: () => {
                openInventoryOfProductsArchiveModal(true)
                setIsComponentVisible(false)
            }
        },
        {
            title: 'Чеки',
            func: () => {
                // openShopModal(true)
                // setIsComponentVisible(false)
            }
        },
        {
            title: 'Ремонты',
            func: () => {
                openServiceArchiveModal(true)
                setIsComponentVisible(false)
            }
        },
    ])

    const [menuItems2, setMenuItems2] = useState([
        {
            title: 'Магазины',
            func: () => {
                openShopModal(true)
                setIsComponentVisible(false)
            }

        },
        {
            title: 'Склады',
            func: () => {
                openStorageModal(true)
                setIsComponentVisible(false)
            }
        },
        {
            title: 'Валюты',
            func: () => {
                openCurrencyModal(true)
                setIsComponentVisible(false)
            }
        },
        {
            title: 'Ед. измерения',
            func: () => {
                openQuantityUnitModal(true)
                setIsComponentVisible(false)
            }
        },
    ])

    const [menuItems3, setMenuItems3] = useState([
        {
            title: 'Валюта:',
            func: () => {
                //
            }
        },
        {
            title: 'Язык:',
            func: () => {
                //
            }
        },
        {
            title: 'Тема:',
            func: () => {
                //
            }
        },
    ])

    const [menuItems4, setMenuItems4] = useState([
        {
            title: 'Статистика магазина',
            func: () => {
                //
            }
        },
        {
            title: 'Статистика сети',
            func: () => {
                //
            }
        },
        {
            title: 'Общие настройки',
            func: () => {
                //
            }
        },
        {
            title: 'Настройки',
            func: () => {
                //
            }
        },
    ])

    return (
        <>
            <SupplyInvoiceArchiveModal/>
            <InventoryOfProductsArchiveModal/>
            <ServiceArchiveModal/>

            <CreateShopModal/>
            <CreateStorageModal/>
            <CreateCurrencyModal/>
            <CreateQuantityUnitModal/>

            <div className={s.leftSide_burgerMenu}>
                <div className={s.burgerMenu_iconButton}>
                    <MenuIcon onClick={() => {setIsComponentVisible(!isComponentVisible)}}/>
                </div>
                {
                    isComponentVisible ?
                        <div className={s.burgerMenu_menuList} ref={ref}>
                            {
                                menuItems1.map(item => (
                                    <div className={s.menuList_itemNoClick}
                                         key={item.title}
                                         onClick={item.func}
                                    >
                                        {item.title}
                                    </div>
                                ))
                            }
                            {
                                subMenuItems1.map(item => (
                                    <div className={s.subMenuList_item}
                                         key={item.title}
                                         onClick={item.func}
                                    >
                                        {item.title}
                                    </div>
                                ))
                            }
                            <hr/>

                            {
                                menuItems2.map(item => (
                                    <div className={s.menuList_item}
                                         key={item.title}
                                         onClick={item.func}
                                    >
                                        {item.title}
                                    </div>
                                ))
                            }
                            <hr/>

                            {
                                menuItems3.map(item => (
                                    <div className={s.menuList_item}
                                         key={item.title}
                                         onClick={item.func}
                                    >
                                        {item.title}
                                    </div>
                                ))
                            }
                            <hr/>

                            {
                                menuItems4.map(item => (
                                    <div className={s.menuList_item}
                                         key={item.title}
                                         onClick={item.func}
                                    >
                                        {item.title}
                                    </div>
                                ))
                            }
                        </div>

                        : ''
                }
            </div>
        </>
    )
}