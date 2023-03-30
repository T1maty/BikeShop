import React from 'react'
import {Controller, UseFormReturn} from "react-hook-form"
import Select from 'react-select'

interface ControlledReactSelectProps {
    name: string
    control: UseFormReturn<any>

    placeholder: string
    data: any[]
    isSearchable?: boolean
    value: any
    onChangeSelect: (value: any) => void

    divClassName?: any
    className?: any
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
                        isSearchable={props.isSearchable ? props.isSearchable : false}

                        // value={props.value}
                        value={field.value}

                        // onChange={props.onChangeSelect}
                        // onChange={(event) => {
                        //     field.onChange(event.target.value)
                        // }}
                        onChange={(value: any) => {
                            field.onChange(value)
                            console.log('значение из селекта', value)
                            // props.onChangeSelect
                        }}
                    />
                }
            />
        </div>
    )
}