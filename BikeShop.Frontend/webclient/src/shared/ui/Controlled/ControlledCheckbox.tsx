import React from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import {Checkbox, FormControlLabel} from "@mui/material";

interface Iprops {
    name: string,
    lable: string,

    control: UseFormReturn<any>
}

export const ControlledCheckbox = (props: Iprops) => {
    return (
        <Controller
            name={props.name}
            control={props.control.control}
            render={({field}) => (
                <FormControlLabel
                    label={props.lable}
                    value={field.value}
                    control={
                        <Checkbox
                            value={field.value}
                            onChange={(event, value) => {
                                field.onChange(value);
                            }}/>
                    }/>
            )}/>
    );
};