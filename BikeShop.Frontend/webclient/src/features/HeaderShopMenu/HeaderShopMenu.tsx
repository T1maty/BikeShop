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
import useServiceFinalArchiveModal from '../ArchiveModals/ServiceFinalArchiveModal/ServiceFinalArchiveModalStore'
import useSupplyInvoiceArchiveModal from "../ArchiveModals/SupplyInvoiceArchiveModal/SupplyInvoiceArchiveModalStore"
import useInventoryOfProductsArchiveModal
    from "../ArchiveModals/InventoryOfProductsArchiveModal/InventoryOfProductsArchiveModalStore"
import useEncashmentArchiveModal from '../ArchiveModals/EncashmentArchiveModal/EncashmentArchiveModalStore'
import useCheckArchiveModal from "../ArchiveModals/CheckArchiveModal/CheckArchiveModalStore"
import useStorageProductsTransferArchiveModalStore
    from '../ArchiveModals/StorageProductsTransferArchiveModal/StorageProductsTransferArchiveModalStore'
import {CreateShopModal} from "../CRUDModals/CreateShopModal/CreateShopModal"
import {CreateStorageModal} from "../CRUDModals/CreateStorageModal/CreateStorageModal"
import {CreateCurrencyModal} from "../CRUDModals/CreateCurrencyModal/CreateCurrencyModal"
import {CreateQuantityUnitModal} from "../CRUDModals/CreateQuantityUnitModal/CreateQuantityUnitModal"
import {ServiceArchiveModal} from "../ArchiveModals/ServiceArchiveModal/ServiceArchiveModal"
import {
    InventoryOfProductsArchiveModal
} from "../ArchiveModals/InventoryOfProductsArchiveModal/InventoryOfProductsArchiveModal"
import {SupplyInvoiceArchiveModal} from "../ArchiveModals/SupplyInvoiceArchiveModal/SupplyInvoiceArchiveModal"
import {EncashmentArchiveModal} from '../ArchiveModals/EncashmentArchiveModal/EncashmentArchiveModal'
import {ServiceFinalArchiveModal} from '../ArchiveModals/ServiceFinalArchiveModal/ServiceFinalArchiveModal'
import {CheckArchiveModal} from "../ArchiveModals/CheckArchiveModal/CheckArchiveModal"
import {
    StorageProductsTransferArchiveModal
} from '../ArchiveModals/StorageProductsTransferArchiveModal/StorageProductsTransferArchiveModal'
import {EmployeeSalaryModal} from "../EmployeeSalaryModal/EmployeeSalaryModal";
import useEmployeeSalaryModal from "../EmployeeSalaryModal/EmployeeSalaryModalStore";
import useUserRoleModal from "../UserRoleModal/UserRoleModalStore";

export const HeaderShopMenu = () => {

    const {t} = useTranslation()
    const navigate = useNavigate()
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

    const openSupplyInvoiceArchiveModal = useSupplyInvoiceArchiveModal(s => s.setOpenSupplyInvoiceArchiveModal)
    const openInventoryOfProductsArchiveModal = useInventoryOfProductsArchiveModal(s => s.setOpenInventoryOfProductsArchiveModal)
    const openCheckArchiveModal = useCheckArchiveModal(s => s.setOpenCheckArchiveModal)
    const openServiceArchiveModal = useServiceArchiveModal(s => s.setOpenServiceArchiveModal)
    const openServiceFinalArchiveModal = useServiceFinalArchiveModal(s => s.setOpenServiceFinalArchiveModal)
    const openEncashmentArchiveModal = useEncashmentArchiveModal(s => s.setOpenEncashmentArchiveModal)
    const openStorageProductsTransferArchiveModal = useStorageProductsTransferArchiveModalStore(s => s.setOpenStorageProductsTransferArchiveModal)

    const openShopModal = useCreateShopModal(s => s.setOpenCreateShopModal)
    const openStorageModal = useCreateStorageModal(s => s.setOpenCreateStorageModal)
    const openCurrencyModal = useCreateCurrencyModal(s => s.setOpenCreateCurrencyModal)
    const openQuantityUnitModal = useCreateQuantityUnitModal(s => s.setOpenCreateQuantityUnitModal)

    const setOpenEmployeeSalaryModal = useEmployeeSalaryModal(s => s.setOpenEmployeeSalaryModal)
    const setOpenRoleModal = useUserRoleModal(s => s.setOpenUserRoleModal)


    const [menuItems1, setMenuItems1] = useState([
        {
            title: 'Архив',
            func: () => {
            }
        },
    ])
    const [subMenuItems1, setSubMenuItems1] = useState([
        {
            title: 'Приходы товаров',
            func: () => {
                openSupplyInvoiceArchiveModal(true)
                setIsComponentVisible(false)
            }
        },
        {
            title: 'Инвентаризации',
            func: () => {
                openInventoryOfProductsArchiveModal(true)
                setIsComponentVisible(false)
            }
        },
        {
            title: 'Чеки',
            func: () => {
                openCheckArchiveModal(true)
                setIsComponentVisible(false)
            }
        },
        {
            title: 'Завершенные ремонты',
            func: () => {
                openServiceFinalArchiveModal(true)
                setIsComponentVisible(false)
            }
        },
        {
            title: 'Инкассации',
            func: () => {
                openEncashmentArchiveModal(true)
                setIsComponentVisible(false)
            }
        },
        {
            title: 'Перемещение товаров',
            func: () => {
                openStorageProductsTransferArchiveModal(true)
                setIsComponentVisible(false)
            }
        },
    ])

    const [menuItems2, setMenuItems2] = useState([
        {
            title: 'Создать перемещение',
            func: () => {
                navigate(BikeShopPaths.WORKSPACE.STORAGE_PRODUCTS_TRANSFER)
                setIsComponentVisible(false)
            }

        },
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
            title: 'Ставки',
            func: () => {
                setOpenEmployeeSalaryModal(true)
                setIsComponentVisible(false)
            }
        },
        {
            title: 'Роли',
            func: () => {
                setOpenRoleModal(true)
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
            <CheckArchiveModal/>
            <ServiceArchiveModal/>
            <ServiceFinalArchiveModal/>
            <EncashmentArchiveModal/>
            <StorageProductsTransferArchiveModal/>

            <CreateShopModal/>
            <CreateStorageModal/>
            <CreateCurrencyModal/>
            <CreateQuantityUnitModal/>

            <EmployeeSalaryModal/>

            <div className={s.leftSide_burgerMenu}>
                <div className={s.burgerMenu_iconButton}>
                    <MenuIcon onClick={() => {
                        setIsComponentVisible(!isComponentVisible)
                    }}/>
                </div>
                {
                    isComponentVisible ?
                        <div className={s.burgerMenu_menuList} ref={ref}>
                            {
                                menuItems1.map(item => (
                                    <div className={s.menuList_itemNoClick}
                                         key={item.title}
                                        // onClick={item.func}
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