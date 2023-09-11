import React, {useState} from 'react'
import s from "./EditProductCardStatus.module.scss"
import Select from "react-select"
import useEditProductCardModal from "./EditProductCardModalStore"

interface ControlledProps {
    name: string
}

export const EditProductCardStatus = (props: ControlledProps) => {

    const currentProduct = useEditProductCardModal(s => s.currentProduct)
    const setStatus = useEditProductCardModal(s => s.setStatus)

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

    return (
        <div className={s.productStatus}>
            <div className={s.productStatus_title}>
                Статус товара:
            </div>
            <div className={s.productStatus_select}>
                <Select
                    className={s.options_search}
                    placeholder={'Выбор...'}
                    options={checkStatus}
                    defaultValue={checkStatus.find(n => n.name === currentProduct.product.checkStatus)}
                    value={checkStatus.find(n => n.name === currentProduct.product.checkStatus)}
                    onChange={(value) => {
                        value ? setStatus(value.name) : false
                    }}
                    getOptionLabel={label => label.name}
                    getOptionValue={value => value.name}
                    isSearchable={false}
                />
            </div>
        </div>
    )
}