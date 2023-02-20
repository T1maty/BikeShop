import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import s from "./MainPage.module.scss";
import {Button} from '../../../shared/ui';
import {ChooseClientModal, PayModal} from '../../../features';
import usePayModal from '../../../features/PayModal/PayModalStore';
import useChooseClientModal from "../../../features/ChooseClientModal/ChooseClientModalStore";
import {BikeShopPaths} from "../../../app/routes/paths";
import useGlobalDataStore from '../GlobalDataStore';

const MainPage = () => {
    const navigate = useNavigate();

    const setChooseClientModal = useChooseClientModal(s => s.setChooseClientModal)
    const setPayModal = usePayModal(s => s.setPayModal)

    const lastName = useGlobalDataStore(s => s.lastName)
    const firstName = useGlobalDataStore(s => s.firstName)
    const patronymic = useGlobalDataStore(s => s.patronymic)

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

    return (
        // <div className={s.mainPageWrapper}>
            <div className={s.mainPageMainBlock}>
                {/*<CreateShopModal/>*/}
                <div className={s.mainPage_header}>
                    <div className={s.mainPage_header_leftSide}>
                        <div className={s.header_leftSide_deal}>
                            <div>
                                <ChooseClientModal/>
                                <Button onClick={() => {
                                    navigate(BikeShopPaths.WORKSPACE.SERVICE)
                                    setChooseClientModal(true)
                                }}>
                                    Создать ремонт
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => {}}>
                                    Создать заказ
                                </Button>
                            </div>
                            <div>
                                <Button  onClick={() => {}}>
                                    Добавить горячего клиента
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => {}}>
                                    Прокат
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => {}}>
                                    Внести на счёт
                                </Button>
                            </div>
                        </div>
                        <div className={s.header_leftSide_info}>
                            <div>
                                <Button onClick={() => navigate(BikeShopPaths.WORKSPACE.PRODUCT_CATALOG)}>
                                    Каталог товаров
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => {navigate(BikeShopPaths.WORKSPACE.SERVICE)}}>
                                    Ремонты
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => {}}>
                                    Чеки
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => {}}>
                                    Заказы
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => {}}>
                                    Прокаты
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => {}}>
                                    Счета клиентов
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => {}}>
                                    Перемещение
                                </Button>
                            </div>
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
                                <div className={s.search_searchButton}>
                                    <Button onClick={() => {setChooseClientModal(true)}}>
                                        Выбрать клиента
                                    </Button>
                                </div>
                                <div className={s.search_searchInput}>
                                    {lastName} {firstName} {patronymic}
                                </div>
                            </div>

                            <div className={s.rightSide_top_info}>
                                Выбранные товары
                            </div>

                            <div className={s.rightSide_top_result}>
                                <div className={s.result_closeBtn}>
                                    <Button onClick={() => {navigate(BikeShopPaths.WORKSPACE.CASHBOX)}}>
                                        Выбрать кассу
                                    </Button>
                                </div>
                                <div className={s.result_cancelBtn}>
                                    <Button onClick={() => {}}>
                                        X
                                    </Button>
                                </div>
                                <div className={s.result_span}>
                                    Цена
                                </div>
                                <PayModal/>
                                <div className={s.result_payBtn}>
                                    <Button onClick={() => {setPayModal(true)}}>
                                        К оплате
                                    </Button>
                                </div>
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
                                    <div className={s.right_two_button}>
                                        <Button onClick={() => {}}>
                                            Закончить смену
                                        </Button>
                                    </div>
                                    <div className={s.right_two_span}>
                                        Закончить смену
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        // </div>
    );
};

export default MainPage;
