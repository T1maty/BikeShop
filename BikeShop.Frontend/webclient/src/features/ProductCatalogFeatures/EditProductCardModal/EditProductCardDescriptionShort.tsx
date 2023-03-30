import React from 'react'
import s from "./EditProductCardModal.module.scss"
import {Controller, UseFormReturn} from "react-hook-form"

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
}

export const EditProductCardDescriptionShort = (props: ControlledProps) => {

    return (
        <Controller
            name={props.name}
            control={props.control.control}
            render={({field}: any) =>

                <div className={s.shortEditor}>
                    <div className={s.shortEditor_title}>Краткое описание товара:</div>
                    <div className={s.shortEditor_textarea}>
                        <div className={s.shortEditor_textarea_wrapper}>
                            <textarea {...field} placeholder={'Введите текст...'}/>
                        </div>
                    </div>
                </div>

            }
        />
    )
}