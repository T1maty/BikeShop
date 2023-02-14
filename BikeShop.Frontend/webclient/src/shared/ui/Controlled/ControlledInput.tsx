import React from 'react';
import {TextField} from "@mui/material";
import {Controller, UseFormReturn} from "react-hook-form";
import {RegisterOptions} from "react-hook-form/dist/types/validator";

interface Iprops {
    name: string,
    lable: string,

    control: UseFormReturn<any>
    rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

export const ControlledInput = (props: Iprops) => {
    return (
        <Controller
            name={props.name}
            control={props.control.control}
            rules={props.rules}
            render={({field}: any) =>
                <TextField {...field} sx={{pb: 3}}
                           fullWidth={true}
                           error={!!props.control.formState.errors[props.name]}
                           label={props.lable}
                           variant="outlined"
                           helperText={props.control.formState.errors[props.name]?.message}
                />
            }/>
    );
};