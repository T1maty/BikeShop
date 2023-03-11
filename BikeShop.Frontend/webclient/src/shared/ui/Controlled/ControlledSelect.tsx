import React from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

interface props {
    control: UseFormReturn<any>
    name: string
    label: string
    className?: any
    disabled?: boolean

    data: any
    onChangeSelect?: (event: SelectChangeEvent) => void
}

export const ControlledSelect = (props: props) => {

    return (
        <div className={props.className}>
            <Controller
                name={props.name}
                control={props.control.control}
                render={({field}: any) =>
                    <FormControl fullWidth>
                        <InputLabel>{props.label}</InputLabel>
                        <Select
                            disabled={props.disabled ? props.disabled : false}
                            value={field.value}
                            label={props.name}
                            onChange={(event) => {
                                field.onChange(event.target.value)
                            }}
                        >
                            {
                                props.data.map((m: any) => {

                                    return (

                                        <MenuItem key={m.id} value={m.id}>
                                            {m.value}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                }
            />

        </div>
    )


};