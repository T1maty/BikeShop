import React from 'react'
import s from './RegistrationPage.module.scss'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {RegistrationData, useAuth} from '../../../entities'
import {BikeShopPaths} from '../../../app/routes/paths'
import {Button, ControlledCustomCheckbox, ControlledCustomInput, LoaderScreen} from '../../../shared/ui'
import {Errors} from '../../../entities/errors/workspaceErrors'

export const RegistrationPage = () => {

    const navigate = useNavigate()

    const register = useAuth(s => s.register)
    const isLoading = useAuth(s => s.isLoading)

    const formControl = useForm<RegistrationData>({
        defaultValues: {
            phone: '',
            password: '',
            isAgree: false,
        }
    })

    const onSubmit: SubmitHandler<RegistrationData> = (data: RegistrationData) => {
        console.log('submit', data)
        register(data, () => {
            navigate(BikeShopPaths.COMMON.LOGIN)
        })
    }

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <div className={s.registrationPage_container}>

                <div className={s.loginForm_mainBox}>
                    <div className={s.loginForm_title}>
                        Регистрация
                    </div>
                    <div className={s.loginForm_form}>
                        <form onSubmit={formControl.handleSubmit(onSubmit)}>
                            <div>
                                <ControlledCustomInput name={'phone'}
                                                       placeholder={'Номер телефона'}
                                                       control={formControl}
                                                       rules={{
                                                           required: 'Поле обязательно для заполнения',
                                                           minLength: {
                                                               value: 4,
                                                               message: 'Минимальная длина 4 символа'
                                                           },
                                                           pattern: {
                                                               value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                                                               message: 'Неверный формат номера телефона'
                                                           }
                                                       }}
                                />
                            </div>
                            <div>
                                <ControlledCustomInput name={'password'}
                                                       placeholder={'Пароль'}
                                                       type={'password'}
                                                       control={formControl}
                                                       rules={{required: Errors[0].name}}
                                />
                            </div>
                            <ControlledCustomCheckbox name={'isAgree'}
                                                      label={'С условиями пользования ознакомлен и согласен'}
                                                      control={formControl}
                                                      divClassName={s.checkbox_block}
                            />
                            <Button type={'submit'} buttonDivWrapper={s.loginForm_submitButton}>
                                Зарегистрироваться
                            </Button>
                        </form>
                    </div>

                    <div className={s.haveAccount}
                         onClick={() => {
                             navigate(BikeShopPaths.COMMON.LOGIN)
                         }}
                    >
                        Я уже зарегистрирован
                    </div>
                </div>

            </div>
        )
    }
}