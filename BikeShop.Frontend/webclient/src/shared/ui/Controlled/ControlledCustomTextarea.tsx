import React from 'react'
import {Controller, UseFormReturn} from "react-hook-form"
import {RegisterOptions} from "react-hook-form/dist/types/validator"
import {CustomTextarea} from '../CustomTextarea/CustomTextarea'

interface ControlledCustomTextareaProps {
    name: string
    placeholder: string
    type?: string
    control: UseFormReturn<any>
    rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    divClassName?: any
    disabled?: boolean
}

export const ControlledCustomTextarea = (props: ControlledCustomTextareaProps) => {

    return (
        <div className={props.divClassName}>
            <Controller
                name={props.name}
                control={props.control.control}
                rules={props.rules}
                render={({field}: any) =>
                    <CustomTextarea {...field}
                                 value={field.value}
                                 onChange={n => {field.onChange(n)}}
                                 placeholder={props.placeholder}
                                 type={props.type}
                                 error={!!props.control.formState.errors[props.name]}
                                 helperText={props.control.formState.errors[props.name]?.message}
                                 disabled={props.disabled ? props.disabled : false}
                    />
                }
            />
        </div>
    )
}