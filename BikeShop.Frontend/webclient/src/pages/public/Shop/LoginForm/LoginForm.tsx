import React from 'react'
import s from './LoginForm.module.scss'
import {Button, ControlledCustomInput, ControlledInput} from "../../../../shared/ui"
import {SubmitHandler, useForm} from "react-hook-form"
import {Errors} from "../../../../entities/errors/workspaceErrors"

export const LoginForm = () => {

    const formControl = useForm<any>({
        defaultValues: {
            lastName: '',
            firstName: '',
            phone: '',
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        //     registerNewUser(data).then((res: any) => {
        //         enqueueSnackbar('Вы успешно зарегистрировались',
        //         {variant: 'success', autoHideDuration: 3000})
        //     }).catch((error: any) => {
        //         let message = error(error.response.data.errorDescription).toString()
        //         formControl.setError('name', {type: 'serverError', message: message})
        //         enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
        //         console.error(error.response.data)
        //     })
    }

    return (
        <div className={s.loginForm_mainBox}>
            <div className={s.loginForm_title}>
                Регистрация
            </div>
            <div className={s.loginForm_form}>
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <ControlledCustomInput name={'lastName'}
                                           placeholder={'Фамилия'}
                                           control={formControl}
                                           rules={{required: Errors[0].name}}
                    />
                    <ControlledCustomInput name={'firstName'}
                                           placeholder={'Имя'}
                                           control={formControl}
                                           rules={{required: Errors[0].name}}
                    />
                    <ControlledCustomInput name={'phone'}
                                           placeholder={'Номер телефона'}
                                           control={formControl}
                                           rules={{required: Errors[0].name}}
                    />
                    {/*<ControlledInput name={'lastName'}*/}
                    {/*                 label={'Фамилия'}*/}
                    {/*                 control={formControl}*/}
                    {/*                 rules={{required: Errors[0].name}}*/}
                    {/*                 divClassName={s.options_search}*/}
                    {/*/>*/}
                    {/*<ControlledInput name={'firstName'}*/}
                    {/*                 label={'Имя'}*/}
                    {/*                 control={formControl}*/}
                    {/*                 rules={{required: Errors[0].name}}*/}
                    {/*                 divClassName={s.options_search}*/}
                    {/*/>*/}
                    {/*<ControlledInput name={'phone'}*/}
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