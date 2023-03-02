import React from 'react'
import {Controller, UseFormReturn} from "react-hook-form"
import {Checkbox, FormControlLabel} from "@mui/material"

interface ControlledCheckboxProps {
    name: string
    label: string
    control: UseFormReturn<any>
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
                            onChange={(event, value) => {field.onChange(value)}}
                        />
                    }/>
            )}/>
    );
};