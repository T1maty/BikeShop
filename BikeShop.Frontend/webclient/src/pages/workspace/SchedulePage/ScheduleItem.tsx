import React from 'react';
import s from "./SchedulePage.module.scss";
import useSchedule from "./SchedulePageStore";
import {ScheduleItem} from "../../../entities/entities/Schedule/ScheduleItem";
import {User} from "../../../entities";

const ScheduleItemTSX = (p: { data: ScheduleItem | undefined, day: Date, user: User }) => {

    const setHoveredItem = useSchedule(s => s.setHoveredItem)
    const setSelectedDay = useSchedule(s => s.setSelectedDay)
    const setSelectedItem = useSchedule(s => s.setSelectedItem)
    const setSelectedUser = useSchedule(s => s.setSelectedUser)
    const setItemContext = useSchedule(s => s.setItemContext)
    const setItemContextEmpty = useSchedule(s => s.setItemContextEmpty)
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())

    const onContextHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (p.day >= currentDate) {
            if (p.data == undefined) setItemContextEmpty({o: true, x: e.clientX, y: e.clientY})
            else setItemContext({o: true, x: e.clientX, y: e.clientY})
        }
    }

    let timeString = ""
    let ShiftTimeString = ""

    let style = {}
    style = {backgroundColor: "#EAEAEA"}
    let styleBig = {fontSize: "16px"}
    let styleDifTarget = {fontSize: "16px"}

    let difTarget = ""
    let difActual = ""

    if (p.data != undefined) {
        let start = new Date(p.data.timeStart)
        let finish = new Date(p.data.timeFinish)

        timeString = new Date(p.data.timeStart).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        }) + ` - ` + new Date(p.data.timeFinish).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        })

        let difTargetDate = new Date(finish.getTime() - start.getTime())
        difTargetDate.setHours(difTargetDate.getHours() - 2)
        difTarget = difTargetDate.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        })

        if (p.data.finishedSpan != undefined) {
            let difTargetActual = p.data.finishedSpan.split(':')
            difActual = difTargetActual[0] + ":" + difTargetActual[1]
        }


        if (p.data.shiftFirstStart != undefined && p.data.shiftLastFinish != undefined) {
            styleBig = {fontSize: "10px"}
            ShiftTimeString = new Date(p.data.shiftFirstStart).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit'
            }) + ` - ` + new Date(p.data.shiftLastFinish).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit'
            })
        }

        if (p.data.finishedSpan === null && p.day <= currentDate && !p.data.isHolyday) difActual = "00:00"

        const isValidSpan = () => {
            if (difTarget.length === 0 || difActual.length === 0 || p.day >= currentDate) return false
            const [hoursStr, minutesStr] = difTarget.split(':');
            const hours = parseInt(hoursStr, 10);
            const minutes = parseInt(minutesStr, 10);
            const totalMinutes = (hours * 60) + minutes;

            const [hoursStr2, minutesStr2] = difActual.split(':');
            const hours2 = parseInt(hoursStr2, 10);
            const minutes2 = parseInt(minutesStr2, 10);
            const totalMinutes2 = (hours2 * 60) + minutes2;

            return totalMinutes2 <= totalMinutes;
        }

        if (new Date(start) > currentDate) style = {backgroundColor: "#FFBA52", color: "black"}
        else style = {backgroundColor: "#52ff59", color: "black"}
        if (p.data.isHolyday) style = {backgroundColor: "#313eb2", color: "white"}
        if (isValidSpan()) style = {backgroundColor: "#ff585c", color: "black"}

        if (parseFloat(difActual.split(':')[1]) === 0 && p.day > currentDate) difActual = ""

        if (difActual != "") styleDifTarget = {fontSize: "10px"}

    }


    return (
        <div className={s.cell} onContextMenu={(e) => {
            setSelectedUser(p.user)
            setSelectedDay(p.day)
            p.data != undefined ? setSelectedItem(p.data) : setSelectedItem(null)
            onContextHandler(e)
        }}
             style={style} onMouseEnter={() => {
            setHoveredItem(p.data!)
        }}>
            {p.data != undefined ?
                p.data.isHolyday ? <>Вихідний</> : <>

                    <div className={s.cell_left}>
                        <div style={styleDifTarget}>{difTarget}</div>
                        <div>{difActual}</div>
                    </div>
                    <div className={s.cell_right}>
                        <div style={styleBig}>{timeString}</div>
                        <div>{ShiftTimeString}</div>
                        <div style={styleBig}>{p.data.role}</div>
                    </div>
                </>
                : <></>}
        </div>
    );
};

export default ScheduleItemTSX;