import React from 'react'
import AsyncSelect from 'react-select/async'
import {asyncSelectSearchProductF} from './asyncSelectSearchProductF'
import {CatalogAPI, Product} from '../../../entities'

export const AsyncSelectSearchProduct = () => {

    const loadOptions = (inputValue: string, callback: (value: Product[]) => void) => {
        CatalogAPI.searchProductByName(inputValue).then((resp) => {
            const asyncOptions = resp.data.map((n: Product) => {
                return ({label: n.name, value: n.id})
            })
            console.log(asyncOptions)
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
                onChange={(r) => {asyncSelectSearchProductF(r as Product); console.log('selected', r)}}
                getOptionLabel={label => label!.id + ' | ' + label!.name + ' | ' + label!.catalogKey}
                getOptionValue={value => value!.name}
                placeholder={'Поиск'}
                noOptionsMessage={() => 'Товар не найден'}
            />
        </div>
    )
}