import React, {useEffect, useState} from 'react'
import s from "./MainPage.module.scss"
import {BikeShopPaths} from "../../../app/routes/paths"
import {LocalStorage, User} from "../../../entities"
import {useNavigate} from "react-router-dom"
import {Button, LoaderScreen} from '../../../shared/ui'
import {
    ChooseClientModal, CreateProductModal, EditProductCardModal,
    EncashmentModal, EndWorkDayModal, GetPutMoneyModal
} from '../../../features'
import useChooseClientModal from "../../../features/ChooseClientModal/ChooseClientModalStore"
import useMainPageStore from "./MainPageStore"
import useEndWorkDayModal from "../../../features/EndWorkDayModal/EndWorkDayModalStore"
import useEncashmentModal from "../../../features/CashboxModals/EncashmentModal/EncashmentModalStore"
import useGetPutMoneyModal from "../../../features/CashboxModals/GetPutMoneyModal/GetPutMoneyModalStore"
import {useEmployee} from "../../../entities/globalStore/EmployeeStore"
import {ShiftAPI} from "../../../entities/api/User/ShiftAPI"

export const MainPage = () => {

    const navigate = useNavigate()

    const isLoading = useChooseClientModal(s => s.isLoading)
    const setOpenClientModal = useChooseClientModal(s => s.setOpenClientModal)
    const setIsClientChosen = useMainPageStore(s => s.setIsClientChosen)
    const user = useMainPageStore(s => s.user)
    const setUser = useMainPageStore(s => s.setUser)

    const setOpenEncashmentModal = useEncashmentModal(s => s.setOpenEncashmentModal)
    const setOpenGetPutMoneyModal = useGetPutMoneyModal(s => s.setOpenGetPutMoneyModal)
    const setOpenEndWorkDayModal = useEndWorkDayModal(s => s.setOpenEndWorkDayModal)

    const userShiftStatus = useEmployee(s => s.shiftStatus)
    const getUserShiftStatus = useEmployee(s => s.getUserShiftStatus)

    useEffect(() => {
        getUserShiftStatus()
    }, [])

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

    const getShiftButton = () => {
        if (userShiftStatus?.lastAction.action === "Open") {
            return (
                <Button buttonDivWrapper={s.pauseWorkDay_button}
                        onClick={() => {
                            ShiftAPI.pause(LocalStorage.userId()!).then(() => {
                                getUserShiftStatus()
                            })
                        }}
                >
                    Поставить смену на паузу
                </Button>
            )
        } else if (userShiftStatus?.lastAction.action === "Pause") {
            return (
                <Button buttonDivWrapper={s.pauseWorkDay_button}
                        onClick={() => {
                            ShiftAPI.resume(LocalStorage.userId()!).then(() => {
                                getUserShiftStatus()
                            })
                        }}
                >
                    Продолжить смену
                </Button>
            )
        } else {
            return (
                <Button buttonDivWrapper={s.pauseWorkDay_button}
                        onClick={() => {
                            ShiftAPI.open(LocalStorage.userId()!).then(() => {
                                getUserShiftStatus()
                            })
                        }}
                >
                    Открыть смену
                </Button>
            )
        }
    }

    const chooseClientHandler = (user: User) => {
        setUser(user)
        setIsClientChosen(true)
        setOpenClientModal(false)
    }

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
                            <Button onClick={() => {
                            }}>
                                Новый заказ
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
                                navigate(BikeShopPaths.WORKSPACE.ARRIVAL_OF_PRODUCTS)
                            }}>
                                Приходные накладные
                            </Button>
                            <Button onClick={() => {
                            }}>
                                Клиенты
                            </Button>
                            <Button onClick={() => {
                            }}>
                                Заказы
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
                            <div className={s.rightSide_top_search}>
                                <ChooseClientModal extraCallback={(user: User) => {
                                    chooseClientHandler(user)
                                }}/>
                                <Button buttonDivWrapper={s.search_chooseClientButton}
                                        onClick={() => {
                                            setOpenClientModal(true)
                                        }}
                                >
                                    Выбрать клиента
                                </Button>
                                <div className={s.search_searchInput}>
                                    {user.lastName} {user.firstName} {user.patronymic}
                                </div>
                            </div>

                            <div className={s.rightSide_top_info}>
                                Выбранные товары
                            </div>

                            <div className={s.rightSide_top_result}>
                                <Button buttonDivWrapper={s.result_chooseCashboxBtn}
                                        onClick={() => {
                                        }}>
                                    Открыть кассу
                                </Button>
                                <Button buttonDivWrapper={s.result_cancelBtn} onClick={() => {
                                }}>
                                    X
                                </Button>
                                <div className={s.result_span}>
                                    Цена
                                </div>
                                <Button buttonDivWrapper={s.result_payBtn}
                                        onClick={() => {
                                        }}
                                >
                                    К оплате
                                </Button>
                            </div>
                        </div>

                        <div className={s.rightSide_bottom}>
                            <div className={s.bottom_left}>
                                <div>Сумма</div>
                                <div>Сумма</div>
                                <div>Сумма</div>
                            </div>

                            <div className={s.bottom_right}>
                                <div className={s.bottom_right_one}>
                                    <div>{userShiftStatus?.lastAction.action}</div>
                                    <div>{userShiftStatus?.hours}</div>
                                </div>
                                <div className={s.bottom_right_two}>
                                    <div className={s.right_two_buttons}>
                                        {getShiftButton()}

                                        <Button buttonDivWrapper={s.endWorkDay_button}
                                                onClick={() => {
                                                    ShiftAPI.close(LocalStorage.userId()!).then(() => {
                                                        getUserShiftStatus()
                                                    })
                                                }}
                                        >
                                            Закончить смену
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}