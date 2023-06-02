import React from 'react'
import {Controller, UseFormReturn} from "react-hook-form"
import {RegisterOptions} from "react-hook-form/dist/types/validator"
import {CustomInput} from '../CustomInput/CustomInput'
import {useCurrency} from "../../../entities";

interface ControlledCustomInputProps {
    name: string
    placeholder: string
    type?: string
    control: UseFormReturn<any>
    rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    color?: 'black'
    divClassName?: any
    disabled?: boolean
    isCurrecy?: boolean
}

export const ControlledCustomInput = (props: ControlledCustomInputProps) => {
    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)

    const getValue = (field: any) => {
        if (props.isCurrecy != null && props.isCurrecy) {
            let buf = r(parseFloat(field.value) * fbts.c)
            if (buf === "NaN") return ''
            else return buf
        } else return field.value
    }

    const getOnChange = (field: any, n: any) => {
        if (props.isCurrecy != null && props.isCurrecy) {
            return field.onChange(parseFloat(n.target.value) * fstb.c)
        } else return field.onChange(n.target.value)
    }

    return (
        <div className={props.divClassName}>

            <Controller
                name={props.name}
                control={props.control.control}
                rules={props.rules}
                render={({field}: any) =>
                    <>
                        <CustomInput {...field}
                                     value={getValue(field)}
                                     onChange={n => {
                                         getOnChange(field, n)
                                     }}
                                     placeholder={props.placeholder}
                                     type={props.type}
                                     error={!!props.control.formState.errors[props.name]}
                                     helperText={props.control.formState.errors[props.name]?.message}
                                     color={props.color}
                                     disabled={props.disabled ? props.disabled : false}
                        />
                        {props.isCurrecy ? <div>{fbts.s}</div> : <></>}
                    </>
                }
            />
        </div>
    )
}