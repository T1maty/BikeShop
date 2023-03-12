import React from 'react';
import {TextField} from "@mui/material";
import {Controller, UseFormReturn} from "react-hook-form";
import {RegisterOptions} from "react-hook-form/dist/types/validator";

interface ControlledInputProps {
    name: string
    label: string
    control: UseFormReturn<any>
    rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    // style?: any
    sx?: any
    InputLabelProps?: any
    divClassName?: any
    disabled?: boolean
}

export const ControlledInput = (props: ControlledInputProps) => {

    return (
        <div className={props.divClassName}>
            <Controller
                name={props.name}
                control={props.control.control}
                rules={props.rules}
                render={({field}: any) =>
                    <TextField {...field}
                               fullWidth={true}
                               disabled={props.disabled ? props.disabled : false}
                               variant="outlined"
                               label={props.label}
                               error={!!props.control.formState.errors[props.name]}
                               helperText={props.control.formState.errors[props.name]?.message}
                               // style={{height: '80px'}}
                               sx={props.sx}
                               InputLabelProps={props.InputLabelProps}
                    />
                }
            />
        </div>
    );
};