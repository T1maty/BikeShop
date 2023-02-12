import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import s from "./MainPage.module.scss";
import {Button, InputUI} from '../../../shared/ui';

const navLinks = [
    'Create repairing',
    'Create order',
    'Add hot client',
    'Rent',
    'Repair',
    'Check',
    'All Orders',
];

const MainPage = () => {
    const navigate = useNavigate();

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
        <div className={s.mainPageWrapper}>
            <div className={s.mainPageMainBlock}>

                <div className={s.mainPage_header}>
                    <div className={s.mainPage_header_leftSide}>
                        <div className={s.header_leftSide_deal}>
                            <div>
                                <Button text={'Создать ремонт'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Создать заказ'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Добавить горячего клиента'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Прокат'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Внести на счёт'} onClick={() => {}}/>
                            </div>
                        </div>
                        <div className={s.header_leftSide_info}>
                            <div>
                                <Button text={'Каталог товаров'}
                                        onClick={() => {navigate('/productcatalog')}}
                                />
                            </div>
                            <div>
                                <Button text={'Ремонты'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Чеки'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Заказы'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Прокаты'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Счета клиентов'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Перемещение'} onClick={() => {}}/>
                            </div>
                        </div>
                    </div>

                    <div className={s.mainPage_header_rightSide}>
                        3
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
                                    <Button text={'Найти клиента'} onClick={() => {}}/>
                                </div>
                                <div className={s.search_searchInput}>
                                    <InputUI placeholder={'Поиск...'}/>
                                </div>
                            </div>

                            <div className={s.rightSide_top_info}>
                                555
                            </div>

                            <div className={s.rightSide_top_result}>
                                <div className={s.result_closeBtn}>
                                    <Button text={'Закрыть кассу'} onClick={() => {}}/>
                                </div>
                                <div className={s.result_cancelBtn}>
                                    <Button text={'X'} onClick={() => {}}/>
                                </div>
                                <div className={s.result_span}>
                                    Цена
                                </div>
                                <div className={s.result_payBtn}>
                                    <Button text={'К оплате'} onClick={() => {}}/>
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
                                        <Button text={'Закончить смену'} onClick={() => {}}/>
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
        </div>
    );
};

export default MainPage;
