import React, {useEffect, useState} from 'react'
import s from "./MainPage.module.scss"
import {BikeShopPaths} from "../../../app/routes/paths"
import {CatalogAPI, LocalStorage, ShiftAPI, useAuth, useCurrency} from "../../../entities"
import {useNavigate} from "react-router-dom"
import {Button, LoaderScreen} from '../../../shared/ui'

import useChooseClientModal from "../../../features/ChooseClientModal/ChooseClientModalStore"
import useEncashmentModal from "../../../features/CashboxModals/EncashmentModal/EncashmentModalStore"
import useGetPutMoneyModal from "../../../features/CashboxModals/GetPutMoneyModal/GetPutMoneyModalStore"
import {useEmployee} from "../../../entities/globalStore/EmployeeStore"
import ShiftTime from "./ShiftTime"
import useCashboxStore from "../Cashbox/CashboxStore"
import {useSnackbar} from "notistack"
import useSupplyInvoice from "../ProductsCount/SupplyInvoice/models/SupplyInvoiceStore";
import {
    BarcodeScannerListenerProvider
} from "../../../app/providers/BarcodeScannerListenerProvider/BarcodeScannerListenerProvider";
import {MainPageCashbox} from "../../../widgets/workspace/MainPageCashbox/MainPageCashbox";
import useOutcomeActPage from "../ProductsCount/OutcomeActPage/OutcomeActPageStore";
import {CreateProductModal} from "../../../widgets/workspace/ProductCatalog/CreateProductModal/CreateProductModal";
import {
    EditProductCardModal,
    EmployeeSalaryModal,
    EncashmentModal,
    EndWorkDayModal,
    GetPutMoneyModal
} from "../../../features";

export const MainPage = () => {

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()

    const shop = useAuth(s => s.shop)
    const logout = useAuth(s => s.logout)

    const isLoading = useChooseClientModal(s => s.isLoading)
    const setIsLoading = useChooseClientModal(s => s.setIsLoading)
    const clearOutcome = useOutcomeActPage(s => s.clear)

    const setOpenEncashmentModal = useEncashmentModal(s => s.setOpenEncashmentModal)
    const setOpenGetPutMoneyModal = useGetPutMoneyModal(s => s.setOpenGetPutMoneyModal)

    const userShiftStatus = useEmployee(s => s.shiftStatus)
    const getUserShiftStatus = useEmployee(s => s.getUserShiftStatus)

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)

    const setSum = useCashboxStore(s => s.setSum)
    const bill = useCashboxStore(s => s.bill)
    const addProduct = useCashboxStore(s => s.addProduct)

    const clearCurrentSupplyInvoice = useSupplyInvoice(s => s.clearCurrent)

    const [tasks, setTasks] = useState([
        {id: 1, task: 'task 01'},
        {id: 2, task: 'task 02'},
        {id: 3, task: 'task 03'},
        {id: 4, task: 'task 04'},
        {id: 5, task: 'task 05'},
        {id: 6, task: 'task 06'},
        {id: 7, task: 'task 07'},
        {id: 8, task: 'task 08'},
        {id: 9, task: 'task 09'},
        {id: 10, task: 'task 10'},
    ])

    console.log('shop', shop)
    console.log('date', new Date().toString())
    console.log('shift', userShiftStatus?.hours)
    console.log('shiftStart', userShiftStatus?.lastAction?.time)


    const getShiftButtonUniversal = (buttonTitle: string, requestAPI: any) => {
        return (
            <Button buttonDivWrapper={s.pauseWorkDay_button}
                    onClick={() => {
                        setIsLoading(true)
                        requestAPI(LocalStorage.userId()!).then(() => {
                            getUserShiftStatus()
                            //logout()
                            setIsLoading(false)
                        })
                    }}
            >
                {buttonTitle}
            </Button>
        )
    }

    const getShiftButton = () => {
        if (userShiftStatus?.lastAction?.action === 'Open') {
            return getShiftButtonUniversal('Поставить смену на паузу', ShiftAPI.pause)
        } else if (userShiftStatus?.lastAction?.action === 'Pause') {
            return getShiftButtonUniversal('Продолжить смену', ShiftAPI.resume)
        } else return getShiftButtonUniversal('Открыть смену', ShiftAPI.open)
    }

    const endShiftHandler = () => {
        if (userShiftStatus?.lastAction.action === "Pause") {
            enqueueSnackbar('Перед закрытием необходимо снять смену с паузы',
                {variant: 'error', autoHideDuration: 3000})
            return
        } else {
            setIsLoading(true)
            ShiftAPI.close(LocalStorage.userId()!)
                .then(() => {
                    getUserShiftStatus()
                    logout()
                    navigate(BikeShopPaths.COMMON.LOGIN)
                    setIsLoading(false)
                })
        }
    }

    const onBarcodeHandler = (lastBarcode: string) => {
        enqueueSnackbar(`Штрихкод ${lastBarcode}`, {variant: 'default', autoHideDuration: 3000})
        if (lastBarcode == '') return
        console.log('Barcode: ', lastBarcode)
        CatalogAPI.getProductByBarcode(lastBarcode).then(n => {
            enqueueSnackbar('Товар добавлен', {variant: 'success', autoHideDuration: 3000})
            addProduct(n.data)
        }).catch(() => {
            enqueueSnackbar('Товар не найден', {variant: 'warning', autoHideDuration: 5000})
        })
    }

    useEffect(() => {
        let sum = 0
        bill.products?.forEach(n => {
            sum += (n.quantity * n.price - n.discount)
        })
        setSum(sum)
    }, [bill])

    useEffect(() => {
        getUserShiftStatus()
    }, [])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <BarcodeScannerListenerProvider onBarcodeRead={onBarcodeHandler}>
                <div className={s.mainPageMainBlock}>

                    <CreateProductModal/>
                    <EditProductCardModal/>
                    <EncashmentModal/>
                    <GetPutMoneyModal/>
                    <EndWorkDayModal/>

                    <EmployeeSalaryModal/>

                    <div className={s.mainPage_header}>
                        <div className={s.mainPage_header_leftSide}>
                            <div className={s.header_leftSide_deal}>
                                <Button onClick={() => {
                                    navigate(BikeShopPaths.WORKSPACE.SERVICE)
                                }}>
                                    Мастерская
                                </Button>
                                <Button onClick={() => {
                                    navigate(BikeShopPaths.WORKSPACE.CASHBOX)
                                }}>
                                    Касса
                                </Button>
                                <Button onClick={() => {
                                    setOpenGetPutMoneyModal(true)
                                }}>
                                    Акт внесения
                                </Button>
                                <Button onClick={() => {
                                    setOpenEncashmentModal(true)
                                }}>
                                    Инкассация
                                </Button>
                                <Button onClick={() => {
                                    navigate(BikeShopPaths.WORKSPACE.SCHEDULE)
                                }}>
                                    Расписание
                                </Button>
                            </div>

                            <div className={s.header_leftSide_info}>
                                <Button onClick={() => navigate(BikeShopPaths.WORKSPACE.PRODUCT_CATALOG)}>
                                    Каталог товаров
                                </Button>
                                <Button onClick={() => navigate(BikeShopPaths.WORKSPACE.CARD_CATALOG)}>
                                    Каталог карт товаров
                                </Button>
                                <Button onClick={() => {
                                    navigate(BikeShopPaths.WORKSPACE.WORK_CATALOG)
                                }}>
                                    Каталог услуг
                                </Button>
                                <Button onClick={() => {
                                    clearCurrentSupplyInvoice()
                                    navigate(BikeShopPaths.WORKSPACE.ARRIVAL_OF_PRODUCTS)
                                }}>
                                    Новая приходная накладная
                                </Button>
                                <Button onClick={() => {
                                    clearOutcome()
                                    navigate(BikeShopPaths.WORKSPACE.OUTCOME_ACT)
                                }}>
                                    Новое списание
                                </Button>
                                <Button onClick={() => {
                                    navigate(BikeShopPaths.WORKSPACE.CRM)
                                }}>
                                    Балансы
                                </Button>
                            </div>
                        </div>

                        <div className={s.mainPage_header_rightSide}>
                            Здесь будет что-то интересное
                        </div>
                    </div>


                    <div className={s.mainPage_content}>
                        <div className={s.content_leftSide}>
                            <div className={s.leftSide_title}>
                                Персональные задания
                            </div>
                            <div className={s.leftSide_tasks}>
                                {
                                    tasks.map(t => {
                                        return (
                                            <div key={t.id} className={s.tasks_taskItem}>
                                                {t.task}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className={s.content_rightSide}>

                            <MainPageCashbox/>


                            <div className={s.rightSide_bottom}>
                                <div className={s.bottom_left}>
                                    <div>Касса: {shop?.cashboxCash != undefined ? r(shop?.cashboxCash * fbts.c) + ' ' + fbts.s : 'Ошибка'}</div>
                                    <div>Терминал: {shop?.cashboxCash != undefined ? r(shop?.cashboxTerminal * fbts.c) + ' ' + fbts.s : 'Ошибка'}</div>
                                </div>

                                <div className={s.bottom_right}>
                                    <div
                                        className={userShiftStatus?.lastAction?.action === 'Open' ? s.shiftStatus_open :
                                            userShiftStatus?.lastAction?.action === 'Pause' ? s.shiftStatus_pause :
                                                s.shiftStatus_closed}
                                    >
                                        {
                                            userShiftStatus?.lastAction?.action === 'Open' ? 'Смена открыта' :
                                                userShiftStatus?.lastAction?.action === 'Pause' ? 'Пауза' : 'Смена закрыта'
                                        }
                                    </div>
                                    <div className={s.shiftTime}>
                                        <div style={{textDecoration: 'underline'}}>Время смены:</div>
                                        <div><ShiftTime/></div>
                                    </div>
                                    <div className={s.shiftTiming}>
                                        <div>
                                            <div>Открыто в:</div>
                                            <div>10:00</div>
                                        </div>
                                        <div>
                                            <div>До конца смены:</div>
                                            <div>10:00</div>
                                        </div>
                                    </div>
                                    <div className={s.buttons}>
                                        {getShiftButton()}

                                        <Button buttonDivWrapper={s.endWorkDay_button}
                                                onClick={endShiftHandler}
                                        >
                                            Закончить смену
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </BarcodeScannerListenerProvider>
        )
    }
}