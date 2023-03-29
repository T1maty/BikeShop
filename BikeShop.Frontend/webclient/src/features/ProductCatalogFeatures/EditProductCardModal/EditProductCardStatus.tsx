import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import Select from "react-select"
import useEditProductCardModal from "./EditProductCardModalStore"
import {Controller, UseFormReturn} from "react-hook-form"

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
}

export const EditProductCardStatus = (props: ControlledProps) => {

    const productStatus = useEditProductCardModal(s => s.productStatus)
    // const [selectedStatus, setSelectedStatus] = useState<any>(productStatus)

    // данные для статуса
    const [checkStatus, setCheckStatus] = useState([
        {id: 1, name: 'JustCreatedByUser'},
        {id: 2, name: 'JustCreatedByScript'},
        {id: 3, name: 'PartiallyFilledByUser'},
        {id: 4, name: 'PartiallyFilledByScript'},
        {id: 5, name: 'FilledByUser'},
        {id: 6, name: 'FilledByScript'},
        {id: 7, name: 'Confirmed'},
    ])

    // const [checkStatus, setCheckStatus] = useState([
    //     'JustCreatedByUser', 'JustCreatedByScript', 'PartialyFilledByUser',
    //     'PartialyFilledByScript', 'FilledByUser', 'FilledByScript', 'Confirmed'
    // ])

    return (
        <Controller
            name={props.name}
            control={props.control.control}
            render={({field}: any) =>

                <div className={s.rightSide_productStatus}>
                    <div className={s.productStatus_title}>
                        Статус товара:
                    </div>
                    <div className={s.productStatus_select}>
                        <Select
                            className={s.options_search}
                            options={checkStatus}
                            placeholder={'Выбор...'}
                            // defaultInputValue={productStatus}
                            // value={selectedStatus ? selectedStatus : null}
                            // onChange={(value) => {setSelectedStatus(value as string)}}
                            value={checkStatus.find(n => n.name === field.value)}
                            onChange={(value) => {
                                value ? field.onChange(value.name) : false
                            }}
                            getOptionLabel={label => label.name}
                            getOptionValue={value => value.name}
                            isSearchable={false}
                            // noOptionsMessage={() => 'Статус не найден'}
                        />
                    </div>
                </div>
            }
        />
    )
}