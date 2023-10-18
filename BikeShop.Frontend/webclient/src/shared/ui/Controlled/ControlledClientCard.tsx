import React, {memo, useEffect, useState} from 'react'
import {ClientCard} from "../../../widgets"
import {AuthAPI, User} from '../../../entities'
import {Controller, UseFormReturn} from "react-hook-form"
import {RegisterOptions} from "react-hook-form/dist/types/validator"
import {AxiosResponse} from "axios"
import ClientSearchModal from "../../../features/ClientSearchModal/ClientSearchModal";
import {validate} from "uuid";

interface ControlledClientCardProps {
    control: UseFormReturn<any>
    name: string
    className?: any
    disabled?: boolean
    rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    state: boolean
    setState: (state: boolean) => void
}


export const ControlledClientCard = memo((props: ControlledClientCardProps) => {

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {

        let id = props.control.getValues(props.name)
        console.log('reload', user)

        if ((user === null || user.id !== id) && validate(id)) {
            console.log('Пытаемся загружать юзера', user?.id, id)
            AuthAPI.User.getUserById(id).then((r: AxiosResponse<User>) => {
                console.log(r.data)
                setUser(r.data)
            }).catch((error) => {
                console.log('ошибка загрузки пользователя', error)
                setUser(null)
            })
        }
    }, [props.control.watch(props.name)])

    return (
        <div>
            <Controller
                name={props.name}
                control={props.control.control}
                rules={props.rules}
                render={({field}: any) =>
                    <div>
                        {
                            !!props.control.formState.errors[props.name]
                                ? <div>Выберите клиента</div>
                                : true
                        }

                        <ClientCard user={user}
                                    onDoubleClick={() => {
                                        if (!props.disabled) props.setState(true)
                                    }}
                        />
                        <ClientSearchModal setIsComponentVisible={props.setState} isComponentVisible={props.state}
                                           onSuccess={(user: User) => {
                                               setUser(user)
                                               field.onChange(user.id)
                                               props.setState(false)
                                           }
                                           }></ClientSearchModal>

                    </div>
                }
            />
        </div>
    )
})