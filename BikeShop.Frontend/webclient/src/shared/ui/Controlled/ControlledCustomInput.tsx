import React from 'react'
import {Controller, UseFormReturn} from "react-hook-form"
import {RegisterOptions} from "react-hook-form/dist/types/validator"
import {CustomInput} from '../CustomInput/CustomInput'

interface ControlledCustomInputProps {
    name: string
    placeholder: string
    control: UseFormReturn<any>
    rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

export const ControlledCustomInput = (props: ControlledCustomInputProps) => {
    return (
        // <div className={props.className}>
            <Controller
                name={props.name}
                control={props.control.control}
                rules={props.rules}
                render={({field}: any) =>
                    <CustomInput {...field}
                                 placeholder={props.placeholder}
                                 error={!!props.control.formState.errors[props.name]}
                                 helperText={props.control.formState.errors[props.name]?.message}
                    />
                }
            />
        // </div>
    );
};