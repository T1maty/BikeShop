import React, {useEffect} from 'react';
import s from './SchedulePage.module.scss'
import Select from "react-select";
import useSchedule from "./SchedulePageStore";
import {Shop} from "../../../entities";
import ScheduleContextItem from "../../../entities/models/Schedule/ScheduleContextItem";
import ScheduleContextEmptyItem from "../../../entities/models/Schedule/ScheduleContextEmptyItem";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import {CustomInput, LoaderScreen} from "../../../shared/ui";
import ScheduleItemTSX from "./ScheduleItem";

const SchedulePage = () => {
    const selectedShop = useSchedule(s => s.selectedShop)
    const getShops = useSchedule(s => s.getShops)
    const shops = useSchedule(s => s.shops)
    const setSelectedShop = useSchedule(s => s.setSelectedShop)
    const users = useSchedule(s => s.users)
    const getScheduleItems = useSchedule(s => s.getScheduleItems)
    const scheduleItems = useSchedule(s => s.scheduleItems)

    const timePickerValue = useSchedule(s => s.timePickerValue)
    const setTimePickerValue = useSchedule(s => s.setTimePickerValue)
    const isLoading = useSchedule(s => s.isLoading)

    const itemContext = useSchedule(s => s.itemContext)
    const setItemContext = useSchedule(s => s.setItemContext)
    const itemContextEmpty = useSchedule(s => s.itemContextEmpty)
    const setItemContextEmpty = useSchedule(s => s.setItemContextEmpty)
    const role = useSchedule(s => s.role)
    const setRole = useSchedule(s => s.setRole)
    const scheduleHistory = useSchedule(s => s.scheduleHistory)

    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())

    useEffect(() => {
        getShops()
        getScheduleItems()
    }, [])

    // Вычисление начальной даты (текущая дата минус 15 дней)
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 3);

    // Создание массива из 30 дней, начиная с startDate
    const days = Array.from({length: 30}).map((_, i) => {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        return day;
    });
    if (isLoading) return (<LoaderScreen variant={"ellipsis"}/>)
    return (
        <div className={s.wrapper} onContextMenu={e => e.preventDefault()}>
            <ScheduleContextItem open={itemContext} setOpen={setItemContext}/>
            <ScheduleContextEmptyItem open={itemContextEmpty} setOpen={setItemContextEmpty}/>
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

                <div>
                    <CustomInput value={role} onChange={(v) => {
                        setRole(v.target.value)
                    }}/>
                </div>

            </div>
            <div className={s.calendar}>
                <div className={s.main_column}>
                    {users.map((n, indx) => {
                        return (
                            <div className={s.user} key={indx}>{n.firstName}</div>
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

                            {users.map((g, ind) => {
                                let data = scheduleItems.find(h => h.targetUser === g.id && new Date(h.timeStart).toLocaleDateString() === day.toLocaleDateString())

                                return (<ScheduleItemTSX data={data} day={day} user={g}
                                                         key={index.toString() + ind.toString()}/>)
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <div className={s.history}>
                {scheduleHistory?.map(n => {
                    console.log(n)
                    return (
                        <div className={s.hist_item}>
                            <div style={{fontSize: "10px"}}>Дія</div>
                            <div>{n.action}</div>
                            <div style={{fontSize: "10px"}}>Змінив:</div>
                            <div style={{whiteSpace: "nowrap"}}>{n.actionUserFIO}</div>
                            <div style={{fontSize: "10px"}}>Користувачу:</div>
                            <div>{n.actionTargetUserFIO}</div>
                            <div style={{fontSize: "10px"}}>Було:</div>
                            <div
                                style={{fontSize: "14px"}}>{new Date(n.timeStartPrev.split('+')[0]).toLocaleString(undefined, {
                                day: '2-digit',
                                month: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                            }) + " - " + new Date(n.timeFinishPrev.split('+')[0]).toLocaleString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</div>
                            <div style={{fontSize: "10px"}}>Стало:</div>
                            <div
                                style={{fontSize: "14px"}}>{new Date(n.timeStartActual.split('+')[0]).toLocaleString(undefined, {
                                day: '2-digit',
                                month: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                            }) + " - " + new Date(n.timeFinishActual.split('+')[0]).toLocaleString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</div>
                        </div>)
                })}
            </div>
        </div>
    );
};

export default SchedulePage;