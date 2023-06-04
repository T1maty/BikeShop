import React, {useEffect, useState} from 'react'
import s from "./MainPage.module.scss"
import {BikeShopPaths} from "../../../app/routes/paths"
import {BillWithProducts, LocalStorage, PaymentData, ShiftAPI, useAuth, useCurrency, User} from "../../../entities"
import {useNavigate} from "react-router-dom"
import {AsyncSelectSearchProduct, Button, DeleteButton, LoaderScreen} from '../../../shared/ui'
import {
    CreateProductModal,
    EditProductCardModal,
    EmployeeSalaryModal,
    EncashmentModal,
    EndWorkDayModal,
    GetPutMoneyModal,
    PayModal,
    PrintModal
} from '../../../features'
import useChooseClientModal from "../../../features/ChooseClientModal/ChooseClientModalStore"
import useMainPageStore from "./MainPageStore"
import useEndWorkDayModal from "../../../features/EndWorkDayModal/EndWorkDayModalStore"
import useEncashmentModal from "../../../features/CashboxModals/EncashmentModal/EncashmentModalStore"
import useGetPutMoneyModal from "../../../features/CashboxModals/GetPutMoneyModal/GetPutMoneyModalStore"
import {useEmployee} from "../../../entities/globalStore/EmployeeStore"
import ShiftTime from "./ShiftTime"
import useCashboxStore from "../Cashbox/CashboxStore"
import {useSnackbar} from "notistack"
import {CheckForShop} from "../../../widgets"
import useEmployeeSalaryModal from '../../../features/EmployeeSalaryModal/EmployeeSalaryModalStore'
import useSupplyInvoice from "../ProductsCount/SupplyInvoice/models/SupplyInvoiceStore";

type ShiftStatusTypes = 'Open' | 'Closed' | 'Pause'

export const MainPage = () => {

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()

    const shop = useAuth(s => s.shop)

    const isLoading = useChooseClientModal(s => s.isLoading)
    const setIsLoading = useChooseClientModal(s => s.setIsLoading)
    const setOpenClientModal = useChooseClientModal(s => s.setOpenClientModal)

    const setIsClientChosen = useMainPageStore(s => s.setIsClientChosen)
    const user = useMainPageStore(s => s.user)
    const setUser = useMainPageStore(s => s.setUser)

    const setOpenEncashmentModal = useEncashmentModal(s => s.setOpenEncashmentModal)
    const setOpenGetPutMoneyModal = useGetPutMoneyModal(s => s.setOpenGetPutMoneyModal)
    const setOpenEndWorkDayModal = useEndWorkDayModal(s => s.setOpenEndWorkDayModal)
    const setOpenEmployeeSalaryModal = useEmployeeSalaryModal(s => s.setOpenEmployeeSalaryModal)

    const userShiftStatus = useEmployee(s => s.shiftStatus)
    const getUserShiftStatus = useEmployee(s => s.getUserShiftStatus)

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)

    const sum = useCashboxStore(s => s.sum)
    const setSum = useCashboxStore(s => s.setSum)
    const bill = useCashboxStore(s => s.bill)
    const setData = useCashboxStore(s => s.setProducts)
    const addProduct = useCashboxStore(s => s.addProduct)
    const paymentHandler = useCashboxStore(s => s.paymentHandler)

    const clearCurrentSupplyInvoice = useSupplyInvoice(s => s.clearCurrent)


    const [openPay, setOpenPay] = useState(false)
    const [res, setRes] = useState<BillWithProducts>()
    const [openPrint, setOpenPrint] = useState(false)
    const [openClientSearch, setOpenClientSearch] = useState(false)

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
    console.log('shiftStart', userShiftStatus?.lastAction.time)

    const chooseClientHandler = (user: User) => {
        setUser(user)
        setIsClientChosen(true)
        setOpenClientModal(false)
    }

    const paymentResultHandler = (value: PaymentData) => {
        paymentHandler(value, (r) => {
            enqueueSnackbar('Покупка совершена', {variant: 'success', autoHideDuration: 4000})
            setRes(r)
            console.log(r)
            setOpenPrint(true)
            setData([])
        })
    }

    const getShiftButtonUniversal = (buttonTitle: string, requestAPI: any) => {
        return (
            <Button buttonDivWrapper={s.pauseWorkDay_button}
                    onClick={() => {
                        setIsLoading(true)
                        requestAPI(LocalStorage.userId()!).then(() => {
                            getUserShiftStatus()
                            setIsLoading(false)
                        })
                    }}
            >
                {buttonTitle}
            </Button>
        )
    }

    const getShiftButton = () => {
        if (userShiftStatus?.lastAction.action === 'Open') {
            return getShiftButtonUniversal('Поставить смену на паузу', ShiftAPI.pause)
        } else if (userShiftStatus?.lastAction.action === 'Pause') {
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
                    setIsLoading(false)
                })
        }
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
                                Новый ремонт
                            </Button>
                            <Button onClick={() => {
                                navigate(BikeShopPaths.WORKSPACE.CASHBOX)
                            }}>
                                Касса
                            </Button>
                            {/*<Button onClick={() => {*/}
                            {/*    setOpenEmployeeSalaryModal(true)*/}
                            {/*}}>*/}
                            {/*    Новый заказ*/}
                            {/*</Button>*/}
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
                        </div>

                        <div className={s.header_leftSide_info}>
                            <Button onClick={() => navigate(BikeShopPaths.WORKSPACE.PRODUCT_CATALOG)}>
                                Каталог товаров
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
                        <div className={s.rightSide_top}>
                            <div className={s.select}>
                                <AsyncSelectSearchProduct onSelect={addProduct}/>
                            </div>
                            <div className={s.rightSide_top_search}>

                                {
                                    //<ClientSearchModal setIsComponentVisible={setOpenClientSearch} isVisible={openClientSearch} onSuccess={handler}/>
                                    //<ChooseClientModal extraCallback={(user: User) => {chooseClientHandler(user)}}/>
                                }
                                <Button buttonDivWrapper={s.search_chooseClientButton}
                                        onClick={() => {
                                            setOpenClientModal(true)
                                        }}
                                >
                                    Выбрать клиента
                                </Button>
                                <div className={s.search_searchInput}>
                                    {user && user.lastName} {user && user.firstName} {user && user.patronymic}
                                </div>
                            </div>

                            <div className={s.rightSide_top_info}>
                                {
                                    bill.products?.map(n => {
                                        return (
                                            <div className={s.cashbox_table_wrapper}>
                                                <div className={s.cashbox_table_left}>
                                                    <div className={s.cashbox_table_name}>
                                                        {n.name}
                                                    </div>
                                                    <div className={s.cashbox_table_price}>
                                                        {n.price * fbts.c + fbts.s}
                                                    </div>
                                                    <div className={s.cashbox_table_total}>
                                                        {n.total * fbts.c + fbts.s}
                                                    </div>
                                                </div>
                                                <DeleteButton size={30}
                                                              onClick={() => {
                                                                  setData(bill.products.filter(h => h.productId != n.productId))
                                                              }}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className={s.rightSide_top_result}>
                                <Button buttonDivWrapper={s.result_chooseCashboxBtn}
                                        onClick={() => {
                                            navigate(BikeShopPaths.WORKSPACE.CASHBOX)
                                        }}>
                                    Открыть кассу
                                </Button>
                                <Button buttonDivWrapper={s.result_cancelBtn}
                                        onClick={() => {
                                        }}
                                >
                                    X
                                </Button>
                                <div className={s.result_span}>
                                    {sum * fbts.c + fbts.s}
                                </div>
                                <PayModal open={openPay}
                                          setOpen={setOpenPay}
                                          user={user}
                                          summ={sum}
                                          result={paymentResultHandler}
                                />
                                <PrintModal open={openPrint}
                                            setOpen={setOpenPrint}>
                                    <CheckForShop children={res!}/>
                                </PrintModal>
                                <Button buttonDivWrapper={s.result_payBtn}
                                        onClick={() => {
                                            setOpenPay(true)
                                        }}
                                >
                                    К оплате
                                </Button>
                            </div>
                        </div>

                        <div className={s.rightSide_bottom}>
                            <div className={s.bottom_left}>
                                <div>Касса: {shop?.cashboxCash ? r(shop?.cashboxCash * fbts.c) + ' ' + fbts.s : 'Ошибка'}</div>
                                <div>Терминал: {shop?.cashboxCash ? r(shop?.cashboxTerminal * fbts.c) + ' ' + fbts.s : 'Ошибка'}</div>
                            </div>

                            <div className={s.bottom_right}>
                                <div className={userShiftStatus?.lastAction.action === 'Open' ? s.shiftStatus_open :
                                    userShiftStatus?.lastAction.action === 'Pause' ? s.shiftStatus_pause :
                                        s.shiftStatus_closed}
                                >
                                    {
                                        userShiftStatus?.lastAction.action === 'Open' ? 'Смена открыта' :
                                            userShiftStatus?.lastAction.action === 'Pause' ? 'Пауза' : 'Смена закрыта'
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
        )
    }
}