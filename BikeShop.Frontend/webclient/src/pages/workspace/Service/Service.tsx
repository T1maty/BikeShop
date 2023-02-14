import React, {useState} from 'react';
import s from './Service.module.scss'
import {ClientCard} from '../../../features';
import {Button, InputUI} from '../../../shared/ui';
import {ServiceTable} from '../../index';

const Service = () => {

    const [repair, setRepair] = useState([
        {id: 1, repair: 'repair 01'},
        {id: 2, repair: 'repair 02'},
        {id: 3, repair: 'repair 03'},
        {id: 4, repair: 'repair 04'},
        {id: 5, repair: 'repair 05'},
        {id: 6, repair: 'repair 06'},
        {id: 7, repair: 'repair 07'},
        {id: 8, repair: 'repair 08'},
        {id: 9, repair: 'repair 09'},
        {id: 10, repair: 'repair 10'}
    ])

    const [productsItem, setProductsItem] = useState([
        {id: 1, title: 'Колесо', price: 25, count: 3},
        {id: 2, title: 'Велосипед', price: 25000000, count: 1},
        {id: 3, title: 'Руль', price: 250, count: 2},
        {id: 4, title: 'Рама', price: 500, count: 1},
        {id: 5, title: 'Вилка', price: 1000, count: 1},
        {id: 6, title: 'Втулка', price: 2000, count: 1},
        {id: 7, title: 'Вынос', price: 1500, count: 1},
    ])

    const [repairItems, setRepairItems] = useState([
        {id: 1, title: 'Замена покрышки', price: 25, count: 3},
        {id: 2, title: 'Сезонное ТО', price: 2500, count: 1},
        {id: 3, title: 'Переспицовка колеса', price: 250, count: 2},
    ])

    return (
        // <div className={s.serviceWrapper}>
            <div className={s.serviceBlock}>

                <div className={s.service_leftSide}>
                    <div className={s.leftSide_buttons}>
                        <div className={s.buttons_create}>
                            <Button onClick={() => {}}>
                                Создать ремонт
                            </Button>
                        </div>
                        <div className={s.buttons_info}>
                            <div>
                                <Button onClick={() => {}}>
                                    Ожидают
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => {}}>
                                    В ремонте
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => {}}>
                                    Готово
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={s.leftSide_content}>
                        <div className={s.content_title}>
                            Таблица ремонтов
                        </div>
                        <div className={s.content_info}>
                            {
                                repair.map(r => {
                                    return (
                                        <div key={r.id}>{r.repair}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>


                <div className={s.service_rightSide}>
                    <div className={s.rightSide_stuffInput}>
                        <InputUI placeholder={'Техника'}/>
                    </div>

                    <div className={s.rightSide_infoFields}>
                        <div className={s.infoFields_content}>
                            <div className={s.content_detailsInput}>
                                <InputUI placeholder={'Детальное описание'}/>
                            </div>
                            <div className={s.content_masterInput}>
                                <InputUI placeholder={'Мастер не выбран'}/>
                            </div>
                            <div className={s.content_buttons}>
                                <div className={s.content_saveBtn}>
                                    <Button onClick={() => {}}>
                                        Сохранить
                                    </Button>
                                </div>
                                <div className={s.content_cancelBtn}>
                                    <Button onClick={() => {}}>
                                        Отмена
                                    </Button>
                                </div>
                                <div className={s.content_sumField}>
                                    Сумма
                                </div>
                            </div>
                        </div>
                        <div className={s.infoFields_clientCard}>
                            <ClientCard/>
                            <div className={s.clientCard_changeClientBtn}>
                                <Button onClick={() => {}}>
                                    Изменить клиента
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={s.rightSide_tables}>
                        <ServiceTable data={productsItem}/>
                        <ServiceTable data={repairItems}/>
                    </div>
                </div>

            </div>
        // </div>
    );
};
export default Service;
