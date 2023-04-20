import React, {useState} from 'react'
import s from "./MainPage.module.scss"
import {BikeShopPaths} from "../../../app/routes/paths"
import {User} from "../../../entities"
import {useNavigate} from "react-router-dom"
import {Button} from '../../../shared/ui'
import {
    CheckModal,
    ChooseClientModal, CreateOptionModal, CreateProductModal, CreateSpecificationModal,
    EditProductCardModal, EmployeeSalaryModal, EndWorkDayModal, ReportDayModal, SupplyInvoiceArchiveModal
} from '../../../features'
import useChooseClientModal from "../../../features/ChooseClientModal/ChooseClientModalStore"
import useMainPageStore from "./MainPageStore"
import useCreateSpecificationModal
    from '../../../features/CRUDModals/CreateSpecificationModal/CreateSpecificationModalStore'
import useCreateOptionModal from '../../../features/CRUDModals/CreateOptionModal/CreateOptionModalStore'
import useSupplyInvoiceArchiveModal from '../../../features/SupplyInvoiceArchiveModal/SupplyInvoiceArchiveModalStore'
import useEmployeeSalaryModal from "../../../features/EmployeeSalaryModal/EmployeeSalaryModalStore"
import useEndWorkDayModal from "../../../features/EndWorkDayModal/EndWorkDayModalStore"
import useReportDayModal from "../../../features/ReportDayModal/ReportDayModalStore"
import useCheckModal from "../../../features/CheckModal/CheckModalStore"
import {ShopCheck, ActServiceWork} from "../../../widgets"

export const MainPage = () => {

    const navigate = useNavigate()

    const setOpenClientModal = useChooseClientModal(s => s.setOpenClientModal)
    const setOpenCreateSpecificationModal = useCreateSpecificationModal(s => s.setOpenCreateSpecificationModal)
    const setOpenCreateOptionModal = useCreateOptionModal(s => s.setOpenCreateOptionModal)
    const setOpenSupplyInvoiceArchiveModal = useSupplyInvoiceArchiveModal(s => s.setOpenSupplyInvoiceArchiveModal)
    const setOpenEmployeeSalaryModal = useEmployeeSalaryModal(s => s.setOpenEmployeeSalaryModal)
    const setOpenEndWorkDayModal = useEndWorkDayModal(s => s.setOpenEndWorkDayModal)
    const setOpenReportDayModal = useReportDayModal(s => s.setOpenReportDayModal)
    const setOpenCheckModal = useCheckModal(s => s.setOpenCheckModal)

    const setIsClientChosen = useMainPageStore(s => s.setIsClientChosen)
    const user = useMainPageStore(s => s.user)
    const setUser = useMainPageStore(s => s.setUser)

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

    const chooseClientHandler = (user: User) => {
        setUser(user)
        setIsClientChosen(true)
        setOpenClientModal(false)
    }

    return (
        <div className={s.mainPageMainBlock}>

            <CreateProductModal/>
            <EditProductCardModal/>
            <CreateSpecificationModal/>
            <CreateOptionModal/>
            <SupplyInvoiceArchiveModal/>
            <EmployeeSalaryModal/>
            <EndWorkDayModal/>
            <ReportDayModal/>

            <CheckModal>
                <ActServiceWork/>
            </CheckModal>

            <div className={s.mainPage_header}>
                <div className={s.mainPage_header_leftSide}>
                    <div className={s.header_leftSide_deal}>
                        <Button onClick={() => {}}>
                            Создать заказ
                        </Button>
                        <Button onClick={() => {}}>
                            Добавить горячего клиента
                        </Button>
                        <Button onClick={() => {navigate(BikeShopPaths.WORKSPACE.SERVICE)}}>
                            Ремонты
                        </Button>
                        <Button onClick={() => {setOpenCreateSpecificationModal(true)}}>
                            Прокат
                        </Button>
                        <Button onClick={() => {setOpenCreateOptionModal(true)}}>
                            Внести на счёт
                        </Button>
                    </div>
                    <div className={s.header_leftSide_info}>
                        <Button onClick={() => navigate(BikeShopPaths.WORKSPACE.PRODUCT_CATALOG)}>
                            Каталог товаров
                        </Button>
                        <Button onClick={() => {navigate(BikeShopPaths.WORKSPACE.WORK_CATALOG)}}>
                            Каталог услуг
                        </Button>

                        <Button onClick={() => {setOpenSupplyInvoiceArchiveModal(true)}}>
                            Архив приходных
                        </Button>
                        <Button onClick={() => {
                            setOpenEmployeeSalaryModal(true)}}>
                            Настройка зарплаты
                        </Button>
                        <Button onClick={() => {setOpenCheckModal(true)}}>
                            Счета клиентов
                        </Button>
                        <Button onClick={() => {navigate(BikeShopPaths.WORKSPACE.ARRIVAL_OF_PRODUCTS)}}>
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
                                    <div key={t.id} className={s.tasks_taskItem}>{t.task}</div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className={s.content_rightSide}>
                    <div className={s.rightSide_top}>
                        <div className={s.rightSide_top_search}>
                            <ChooseClientModal extraCallback={(user: User) => {chooseClientHandler(user)}}/>
                            <Button buttonDivWrapper={s.search_chooseClientButton}
                                    onClick={() => {setOpenClientModal(true)}}
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
                                    onClick={() => {navigate(BikeShopPaths.WORKSPACE.CASHBOX)}}>
                                Открыть кассу
                            </Button>
                            <Button buttonDivWrapper={s.result_cancelBtn} onClick={() => {}}>
                                X
                            </Button>
                            <div className={s.result_span}>
                                Цена
                            </div>
                            <Button buttonDivWrapper={s.result_payBtn}
                                    onClick={() => {setOpenReportDayModal(true)}}
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
                                <div>Сумма</div>
                                <div>120:47:32</div>
                            </div>
                            <div className={s.bottom_right_two}>
                                <Button buttonDivWrapper={s.right_two_button}
                                        onClick={() => {setOpenEndWorkDayModal(true)}}>
                                    Закончить смену
                                </Button>
                                <div className={s.right_two_span}>
                                    Закончить смену
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}