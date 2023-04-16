import React from 'react'
import s from "./EditProductCardDescriptionShort.module.scss"
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

                <div className={s.shortDescription}>
                    <div className={s.shortDescription_title}>
                        Краткое описание товара:
                    </div>
                    <div className={s.shortDescription_textarea}>
                            <textarea placeholder={'Введите текст...'}
                                      value={field.value.shortDescription}
                                      onChange={(v) => {
                                          field.onChange({
                                              ...field.value,
                                              shortDescription: v.target.value
                                          })
                                      }}
                            />
                    </div>
                </div>

            }
        />
    )
}