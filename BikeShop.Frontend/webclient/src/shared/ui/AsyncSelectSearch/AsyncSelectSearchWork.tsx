import React from 'react'
import AsyncSelect from 'react-select/async'
import {ServiceAPI, Work} from '../../../entities'

export const AsyncSelectSearchWork = (props: { onSelect: (value: Work) => void }) => {

    const loadOptions = (inputValue: string, callback: (value: Work[]) => void) => {
        ServiceAPI.searchWork(inputValue).then((resp) => {
            const asyncOptions = resp.data.map((n: Work) => {
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
                onChange={(r) => {
                    props.onSelect(r as Work)
                    console.log('selected', r)
                }}
                getOptionLabel={label => label!.id + ' | ' + label!.name + ' | ' + label!.price}
                getOptionValue={value => value!.name}
                placeholder={'Поиск'}
                noOptionsMessage={() => 'Услуга не найдена'}
            />
        </div>
    )
}