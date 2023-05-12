import React from 'react'
import s from './ToggleSwitch.module.css'

export const ToggleSwitch = () => {
    return (
        <>
            <label className={s.switch}>
                <input type='checkbox'/>
                    <span className={`${s.slider} ${s.round}`}></span>

                    {/*Квадратный переключатель*/}
                    {/*<span className={s.slider}></span>*/}
            </label>
        </>
    )
}