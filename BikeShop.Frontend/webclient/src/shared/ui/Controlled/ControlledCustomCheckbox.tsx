import React from 'react'
import {Controller, UseFormReturn} from "react-hook-form"
import {RegisterOptions} from "react-hook-form/dist/types/validator"
import {CustomCheckbox} from '../CustomCheckbox/CustomCheckbox'

interface ControlledCheckboxProps {
    name: string
    label: string
    control: UseFormReturn<any>
    rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    divClassName?: any
}

export const ControlledCustomCheckbox = (props: ControlledCheckboxProps) => {

    return (
        <div className={props.divClassName}>
            <Controller
                name={props.name}
                control={props.control.control}
                render={({field}) => (

                    // <FormControlLabel
                    //     label={props.label}
                    //     value={field.value}
                    //     control={
                    //         <Checkbox
                    //             checked={field.value}
                    //             onChange={(event, value) => {
                    //                 field.onChange(value)
                    //             }}
                    //         />
                    //     }
                    // />

                    <CustomCheckbox checked={field.value}
                                    onChangeChecked={(value) => {field.onChange(value)}}
                    >
                        {props.label}
                    </CustomCheckbox>

                )}/>
        </div>
    );
};