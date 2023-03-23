import React from 'react'
import {Controller, UseFormReturn} from "react-hook-form"
import Select from 'react-select'

interface props {
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

export const ControlledReactSelect = (props: props) => {

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
                        value={props.value}
                        // onChange={(value: any) => {
                        //     field.onChange(value)
                        //     // console.log(value)
                        //     // props.onChangeSelect
                        // }}
                        onChange={props.onChangeSelect}
                    />
                }
            />
        </div>
    )
}