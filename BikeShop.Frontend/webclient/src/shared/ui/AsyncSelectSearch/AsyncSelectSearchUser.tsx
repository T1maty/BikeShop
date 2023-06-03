import React, {useState} from 'react'
import AsyncSelect from 'react-select/async'
import {AuthAPI, User} from '../../../entities'

export const AsyncSelectSearchUser = (props: { onSelect: (value: User) => void, value?: User | null }) => {

    const [value, setValue] = useState<User | null>(null)

    const loadOptions = (inputValue: string, callback: (value: User[]) => void) => {
        AuthAPI.User.search(inputValue, 30).then((resp) => {
            const asyncOptions = resp.data.map((n: User) => {
                return ({label: n.firstName, value: n.id})
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
                value={props.value != undefined ? props.value : value}
                loadOptions={loadOptions}
                onChange={(r) => {
                    setValue(r)
                    props.onSelect(r as User)
                    console.log('selected', r)
                }}
                getOptionLabel={label => label!.phoneNumber + ' | ' + label!.firstName + ' ' + label!.lastName + ' ' + label!.patronymic}
                getOptionValue={value => value!.firstName}
                placeholder={'Поиск'}
                noOptionsMessage={() => 'Чебурек не найдена'}
            />
        </div>
    )
}