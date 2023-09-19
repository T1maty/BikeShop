import React, {useState} from 'react'
import AsyncSelect from 'react-select/async'
import {CatalogAPI, Product} from '../../../entities'

export const AsyncSelectSearchProduct = (props: { onSelect: (value: Product, searchResult: Product[]) => void }) => {

    const [arr, setArr] = useState<Product[]>([])
    const loadOptions = (inputValue: string, callback: (value: Product[]) => void) => {
        CatalogAPI.searchProductByName(inputValue).then((resp) => {
            const asyncOptions = resp.data.map((n: Product) => {
                return ({label: n.name, value: n.id})
            })
            console.log(asyncOptions)
            setArr(resp.data)
            callback(resp.data)
        }).catch((r) => {
            console.log('searchError', r)
        })
    }

    return (
        <div style={{color: 'black'}}>
            <AsyncSelect
                cacheOptions
                defaultOptions
                isClearable
                value={null}
                loadOptions={loadOptions}
                onChange={(r) => {
                    props.onSelect(r as Product, arr)
                    console.log('selected', r)
                }}
                getOptionLabel={label => label!.id + ' | ' + label!.name + ' | ' + label!.catalogKey}
                getOptionValue={value => value!.name}
                placeholder={'Поиск'}
                noOptionsMessage={() => 'Товар не найден'}
            />
        </div>
    )
}