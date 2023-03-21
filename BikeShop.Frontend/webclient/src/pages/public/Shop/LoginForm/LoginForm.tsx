import React from 'react'
import s from './LoginForm.module.scss'
import {Button, ControlledCustomInput, ControlledInput} from '../../../../shared/ui'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Errors} from '../../../../entities/errors/workspaceErrors'
import {IRegistrationData} from '../../../../entities'
import {useSnackbar} from 'notistack'
import {BikeShopPaths} from '../../../../app/routes/paths'
import {useNavigate} from 'react-router-dom'
import useAuthUser from '../../../auth/useAuthUser'

export const LoginForm = () => {

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()
    const register = useAuthUser(s => s.register)

    const formControl = useForm<any>({
        defaultValues: {
            phone: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<IRegistrationData> = (data: IRegistrationData) => {
        register(data).then((res: any) => {
            enqueueSnackbar('Вы успешно зарегистрировались',
                {variant: 'success', autoHideDuration: 3000})
            // navigate(BikeShopPaths.COMMON.LOGIN)
        }).catch((error: any) => {
            let message = error(error.response.data.errorDescription).toString()
            formControl.setError('name', {type: 'serverError', message: message})
            enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
            console.error(error.response.data)
        })
    }

    return (
        <div className={s.loginForm_mainBox}>
            <div className={s.loginForm_title}>
                Регистрация
            </div>
            <div className={s.loginForm_form}>
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <ControlledCustomInput name={'phone'}
                                           placeholder={'Номер телефона'}
                                           control={formControl}
                                           rules={{required: Errors[0].name}}
                    />
                    <ControlledCustomInput name={'password'}
                                           placeholder={'Пароль'}
                                           control={formControl}
                                           rules={{required: Errors[0].name}}
                    />

                    {/*<ControlledInput name={'phone'}*/}
                    {/*                 label={'Номер телефона'}*/}
                    {/*                 control={formControl}*/}
                    {/*                 rules={{required: Errors[0].name}}*/}
                    {/*                 divClassName={s.options_search}*/}
                    {/*/>*/}
                    {/*<ControlledInput name={'password'}*/}
                    {/*                 label={'Номер телефона'}*/}
                    {/*                 control={formControl}*/}
                    {/*                 rules={{required: Errors[0].name}}*/}
                    {/*                 divClassName={s.options_search}*/}
                    {/*/>*/}
                </form>
            </div>
            <Button type={'submit'} buttonDivWrapper={s.loginForm_submitButton}>
                Готово
            </Button>
        </div>
    )
}