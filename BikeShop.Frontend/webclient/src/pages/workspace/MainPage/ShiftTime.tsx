import React, {useEffect, useMemo, useState} from 'react';
import {useEmployee} from "../../../entities/globalStore/EmployeeStore";

const ShiftTime = () => {

    const userShiftStatus = useEmployee(s => s.shiftStatus)
    const getUserShiftStatus = useEmployee(s => s.getUserShiftStatus)

    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        getUserShiftStatus()
    }, [])

    useEffect(() => {
        if (userShiftStatus != undefined) {
            let parts = userShiftStatus.hours.split(":");
            parts.forEach((part, index) => {
                if (index === 0) setHours(parseFloat(part))
                if (index === 1) setMinutes(parseFloat(part))
                if (index === 2) setSeconds(Math.round(parseFloat(part)))
            });
        }

        const timer = setInterval(() => {
            if (userShiftStatus?.lastAction.action === 'Open')
                setSeconds(s => s + 1)
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [userShiftStatus])

    useEffect(() => {
        if (seconds === 60) {
            setSeconds(0)
            setMinutes(s => s + 1)
            if (minutes === 59) {
                setMinutes(0)
                setHours(h => h + 1)
            }
        }
    }, [seconds])


    const time = useMemo(() => {
        return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }, [hours, minutes, seconds])

    return <>{time}</>
};

export default ShiftTime;