import React, {useState} from 'react'
import AsyncSelect from 'react-select/async'
import {RoleAPI} from '../../../entities'
import {UserWithRoles} from "../../../entities/models/Auth/UserWithRoles";

export const AsyncSelectSearchEmployee = (props: { onSelect: (value: UserWithRoles) => void, value?: UserWithRoles | null, setValue: (v: UserWithRoles | null) => void, shopId: number }) => {

    const [value, setValue] = useState<UserWithRoles | null>(null)

    const loadOptions = (inputValue: string, callback: (value: UserWithRoles[]) => void) => {
        RoleAPI.getEmpoyeelByShop(props.shopId).then((resp) => {
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
                placeholder={'Поиск сотрудника'}
                noOptionsMessage={() => 'Сотрудник не найден'}
            />
        </div>
    )
}