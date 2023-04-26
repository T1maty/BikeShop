import React from 'react'
import s from './RegistrationForm.module.scss'
import {Button, ControlledCustomInput} from '../../../../shared/ui'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Errors} from '../../../../entities/errors/workspaceErrors'
import {RegistrationData, useAuth} from '../../../../entities'
import {useSnackbar} from 'notistack'
import {useNavigate} from 'react-router-dom'
import {BikeShopPaths} from "../../../../app/routes/paths"

export const RegistrationForm = () => {

    const {enqueueSnackbar} = useSnackbar()

    const navigate = useNavigate()
    const register = useAuth(s => s.register)

    const formControl = useForm<any>({
        defaultValues: {
            phone: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<RegistrationData> = (data: RegistrationData) => {
        register(data, () => {
            navigate(BikeShopPaths.COMMON.LOGIN)
        })
    }

    return (
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
                                                   minLength: {value: 4, message: 'Минимальная длина 4 символа'},
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
                </form>
            </div>
            <Button type={'submit'} buttonDivWrapper={s.loginForm_submitButton}>
                Зарегистрироваться
            </Button>
        </div>
    )
}