import React from 'react'
import {Controller, UseFormReturn} from "react-hook-form"
import {Checkbox, FormControlLabel} from "@mui/material"
import {RegisterOptions} from "react-hook-form/dist/types/validator";

interface ControlledCheckboxProps {
    name: string
    label: string
    control: UseFormReturn<any>
    rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

export const ControlledCheckbox = (props: ControlledCheckboxProps) => {
    return (
        <Controller
            name={props.name}
            control={props.control.control}
            render={({field}) => (
                <FormControlLabel
                    label={props.label}
                    value={field.value}
                    control={
                        <Checkbox
                            checked={field.value}
                            onChange={(event, value) => {
                                field.onChange(value)
                            }}
                        />
                    }/>
            )}/>
    );
};