import React, {useEffect, useState} from 'react';
import s from './SchedulePage.module.scss'
import Select from "react-select";
import useSchedule from "./SchedulePageStore";
import {Shop} from "../../../entities";
import ScheduleContextItem from "../../../entities/models/Schedule/ScheduleContextItem";
import ScheduleContextEmptyItem from "../../../entities/models/Schedule/ScheduleContextEmptyItem";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';

const SchedulePage = () => {
    const selectedShop = useSchedule(s => s.selectedShop)
    const getShops = useSchedule(s => s.getShops)
    const shops = useSchedule(s => s.shops)
    const setSelectedShop = useSchedule(s => s.setSelectedShop)
    const users = useSchedule(s => s.users)
    const getScheduleItems = useSchedule(s => s.getScheduleItems)
    const scheduleItems = useSchedule(s => s.scheduleItems)
    const setHoveredItem = useSchedule(s => s.setHoveredItem)
    const setSelectedDay = useSchedule(s => s.setSelectedDay)
    const setSelectedItem = useSchedule(s => s.setSelectedItem)
    const timePickerValue = useSchedule(s => s.timePickerValue)
    const setTimePickerValue = useSchedule(s => s.setTimePickerValue)
    const setSelectedUser = useSchedule(s => s.setSelectedUser)

    const [itemContext, setItemContext] = useState<{ o: boolean, x: number, y: number }>({o: false, x: 0, y: 0})
    const [itemContextE, setItemContextE] = useState<{ o: boolean, x: number, y: number }>({o: false, x: 0, y: 0})

    useEffect(() => {
        getShops()
        getScheduleItems()
    }, [])

    useEffect(() => {
        console.log(timePickerValue)
    }, [timePickerValue])

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
        <div className={s.wrapper} onContextMenu={e => e.preventDefault()}>
            <ScheduleContextItem open={itemContext} setOpen={setItemContext}/>
            <ScheduleContextEmptyItem open={itemContextE} setOpen={setItemContextE}/>
            <div className={s.head}>
                <div className={s.clock}>
                    <TimeRangePicker className={s.clc} onChange={setTimePickerValue} value={timePickerValue}
                                     clockIcon={null}
                                     shouldOpenClock={() => {
                                         return false
                                     }} clearIcon={null}/>
                </div>
                <div className={s.select}>
                    <Select options={shops} value={selectedShop} onChange={(v) => {
                        setSelectedShop(v as Shop)
                    }} getOptionLabel={label => label!.id + ' | ' + label!.name}
                            getOptionValue={value => value!.id.toString()}
                    />

                </div>

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
                            key={index} className={s.column}
                            style={index === 3 ? {backgroundColor: "#656565", border: "1px white solid"} : {}}
                        >
                            {day.toLocaleDateString()}
                            {users.map(g => {
                                let nextDay: Date = new Date()
                                nextDay.setDate(day.getDate() + 1)

                                let data = scheduleItems.find(h => h.targetUser === g.id && new Date(h.timeStart).getDate().toString() === day.getDate().toString())

                                if (data != null) {

                                    if (data.isHolyday) {
                                        return (
                                            <div className={s.cell}
                                                 onContextMenu={(e) => {
                                                     setSelectedUser(g)
                                                     setSelectedDay(day)
                                                     setSelectedItem(data!)
                                                     new Date(data!.timeStart) > currentDate ? setItemContext({
                                                         o: true,
                                                         x: e.clientX,
                                                         y: e.clientY
                                                     }) : null
                                                 }}
                                                 style={{
                                                     backgroundColor: "#313eb2",
                                                     color: "white"
                                                 }} onMouseEnter={() => {
                                                setHoveredItem(data!)
                                            }}>
                                                Вихідний
                                            </div>)
                                    }

                                    let timeString = `${new Date(data.timeStart).getHours()}:${new Date(data.timeStart).getMinutes()} - ${new Date(data.timeFinish).getHours()}:${new Date(data.timeFinish).getMinutes()}`;
                                    return (
                                        <div className={s.cell} onContextMenu={(e) => {
                                            setSelectedUser(g)
                                            setSelectedDay(day)
                                            setSelectedItem(data!)
                                            new Date(data!.timeStart) > currentDate ? setItemContext({
                                                o: true,
                                                x: e.clientX,
                                                y: e.clientY
                                            }) : null
                                        }}
                                             style={new Date(data.timeStart) > currentDate ? {
                                                 backgroundColor: "#FFBA52",
                                                 color: "black"
                                             } : {
                                                 backgroundColor: "#52ff59",
                                                 color: "black"
                                             }} onMouseEnter={() => {
                                            setHoveredItem(data!)
                                        }}>
                                            <div>{timeString}</div>
                                            <div>{data.role}</div>
                                        </div>)
                                }
                                return (
                                    <div className={s.cell} style={{backgroundColor: "#EAEAEA"}} onContextMenu={(e) => {
                                        setSelectedUser(g)
                                        setSelectedDay(day)
                                        setSelectedItem(null)
                                        day.getDate() >= currentDate.getDate() ? setItemContextE({
                                            o: true,
                                            x: e.clientX,
                                            y: e.clientY
                                        }) : null
                                    }}></div>)
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;