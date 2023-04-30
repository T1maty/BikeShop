import React, {useEffect, useState} from 'react'
import {ClientCard} from "../../../widgets"
import {ChooseClientModal} from "../../../features"
import {User} from "../../../entities"
import {Controller, UseFormReturn} from "react-hook-form"
import {RegisterOptions} from "react-hook-form/dist/types/validator"
import {$api} from "../../index"
import {AxiosResponse} from "axios"
import useService from '../../../pages/workspace/Service/ServiceStore'

interface props {
    control: UseFormReturn<any>
    name: string
    className?: any
    disabled?: boolean
    rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    state: boolean
    setState: (state: boolean) => void
}

export const ControlledClientCard = (props: props) => {

    const isLoading = useService(s => s.isLoading)
    const setIsLoading = useService(s => s.setIsLoading)
    const [user, setUser] = useState<User>()

    useEffect(() => {
        let id = props.control.getValues(props.name)

        if (user === undefined || user?.id != id) {
            console.log('Пытаемся загружать юзера', user?.id, id)

            // setIsLoading(true)
            $api.get(`/user/getbyid?id=${id}`).then((r: AxiosResponse<User>) => {
                setUser(r.data)
                setIsLoading(false)
            }).catch((error) => {
                console.log('ошибка загрузки пользователя', error)
                setUser({} as User)
            }).finally(() => {
                setIsLoading(false)
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
                                ? <div>Выбирите клиента</div>
                                : true
                        }

                        <ClientCard user={user}
                                    onDoubleClick={() => {if (!props.disabled) props.setState(true)}}
                        />
                        <ChooseClientModal state={props.state}
                                           setState={props.setState}
                                           extraCallback={(user: User) => {
                                               setUser(user)
                                               field.onChange(user.id)
                                               props.setState(false)
                                           }}
                        />
                    </div>
                }
            />
        </div>
    )
}