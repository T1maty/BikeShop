import React, {useState} from 'react'
import AsyncSelect from 'react-select/async'
import {AuthAPI} from '../../../entities'
import {UserWithRoles} from "../../../entities/models/Auth/UserWithRoles";

export const AsyncSelectSearchUser = (props: { onSelect: (value: UserWithRoles) => void, value?: UserWithRoles | null }) => {

    const [value, setValue] = useState<UserWithRoles | null>(null)

    const loadOptions = (inputValue: string, callback: (value: UserWithRoles[]) => void) => {
        AuthAPI.User.search(inputValue, 30).then((resp) => {
            const asyncOptions = resp.data.map((n: UserWithRoles) => {
                return ({label: n.user.firstName, value: n.user.id})
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
                    props.onSelect(r as UserWithRoles)
                    console.log('selected', r)
                }}
                getOptionLabel={label => label!.user.phoneNumber + ' | ' + label!.user.firstName + ' ' + label!.user.lastName + ' ' + label!.user.patronymic}
                getOptionValue={value => value!.user.firstName}
                placeholder={'Поиск'}
                noOptionsMessage={() => 'Чебурек не найдена'}
            />
        </div>
    )
}