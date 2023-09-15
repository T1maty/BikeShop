import React, {useEffect} from 'react';
import s from './SchedulePage.module.scss'
import Select from "react-select";
import useSchedule from "./SchedulePageStore";
import {Shop} from "../../../entities";

const SchedulePage = () => {
    const selectedShop = useSchedule(s => s.selectedShop)
    const getShops = useSchedule(s => s.getShops)
    const shops = useSchedule(s => s.shops)
    const setSelectedShop = useSchedule(s => s.setSelectedShop)
    const users = useSchedule(s => s.users)
    const getScheduleItems = useSchedule(s => s.getScheduleItems)
    const scheduleItems = useSchedule(s => s.scheduleItems)

    useEffect(() => {
        getShops()
        getScheduleItems()
    }, [])

    // Получение текущей даты
    const currentDate = new Date();

    // Вычисление начальной даты (текущая дата минус 15 дней)
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 3);

    // Создание массива из 30 дней, начиная с startDate
    const days = Array.from({length: 30}).map((_, i) => {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        return day;
    });

    return (
        <div className={s.wrapper}>
            <div className={s.select}>
                <Select options={shops} value={selectedShop} onChange={(v) => {
                    setSelectedShop(v as Shop)
                }} getOptionLabel={label => label!.id + ' | ' + label!.name}
                        getOptionValue={value => value!.id.toString()}
                />
            </div>
            <div className={s.calendar}>
                <div className={s.main_column}>
                    {users.map(n => {
                        return (
                            <div className={s.user}>{n.firstName}</div>
                        )
                    })}
                </div>
                <div className={s.columns}>
                    {days.map((day, index) => (
                        <div
                            key={index} className={s.column} style={{backgroundColor: index === 3 ? "#0a66b7" : ""}}
                        >
                            {day.toLocaleDateString()}
                            {users.map(g => {
                                let data = scheduleItems.find(n => n.timeStart > day)
                                return (<div className={s.cell}></div>)
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;