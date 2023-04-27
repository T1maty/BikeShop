import React from 'react'
import {Controller, UseFormReturn} from "react-hook-form"
import {RegisterOptions} from "react-hook-form/dist/types/validator"
import {CustomInput} from '../CustomInput/CustomInput'

interface ControlledCustomInputProps {
    name: string
    placeholder: string
    type?: string
    control: UseFormReturn<any>
    rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    color?: 'black'
    divClassName?: any
    disabled?: boolean
}

export const ControlledCustomInput = (props: ControlledCustomInputProps) => {
    return (
        <div className={props.divClassName}>
            <Controller
                name={props.name}
                control={props.control.control}
                rules={props.rules}
                render={({field}: any) =>
                    <CustomInput {...field}
                                 value={field.value}
                                 onChange={n => {
                                     field.onChange(n)
                                 }}
                                 placeholder={props.placeholder}
                                 type={props.type}
                                 error={!!props.control.formState.errors[props.name]}
                                 helperText={props.control.formState.errors[props.name]?.message}
                                 color={props.color}
                                 disabled={props.disabled ? props.disabled : false}
                    />
                }
            />
        </div>
    );
};