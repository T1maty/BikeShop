import React, {useEffect, useMemo, useState} from 'react'


export const Clock = () => {

    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    const time = useMemo(() => {
        const hours = currentTime.getHours()
        const minutes = currentTime.getMinutes()
        const seconds = currentTime.getSeconds()

        return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }, [currentTime])

    return <>{time}</>
}
