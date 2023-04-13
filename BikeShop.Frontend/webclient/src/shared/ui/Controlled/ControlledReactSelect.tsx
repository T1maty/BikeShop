import React, {ReactNode} from 'react'
import {Controller, UseFormReturn} from "react-hook-form"
import Select from 'react-select'

interface ControlledReactSelectProps {
    name: string
    control: UseFormReturn<any>

    placeholder: string
    data: any[]
    isSearchable?: boolean
    disabled?: boolean
    onChangeSelect?: (value: any) => void
    noOptionsMessage?: (obj: { inputValue: string }) => ReactNode | undefined

    value?: (data: any[], fieldValue: any) => any
    divClassName?: any
    className?: any

    getOptionLabel: (value: any) => string
    getOptionValue: (value: any) => string
}

export const ControlledReactSelect = (props: ControlledReactSelectProps) => {

    return (
        <div className={props.divClassName}>
            <Controller
                name={props.name}
                control={props.control.control}
                render={({field}: any) =>
                    <Select
                        className={props.className}
                        placeholder={props.placeholder}
                        options={props.data}
                        isDisabled={props.disabled ? props.disabled : false}
                        isSearchable={props.isSearchable ? props.isSearchable : false}
                        value={props.value ? props.value(props.data, field.value) : field.value}
                        onChange={(value: any) => {
                            if (props.onChangeSelect != undefined) {
                                props.onChangeSelect(value)
                            } else {
                                field.onChange(value)
                            }
                        }}
                        noOptionsMessage={props.noOptionsMessage}
                        getOptionLabel={label => props.getOptionLabel(label)}
                        getOptionValue={value => props.getOptionValue(value)}
                    />
                }
            />
        </div>
    )
}