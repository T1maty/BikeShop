import React, {useEffect} from 'react'
import s from '../LoginPage/LoginPage.module.scss'
import {SubmitHandler, useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"
import {LoginData, useAuth} from "../../../entities"
import {BikeShopPaths} from "../../../app/routes/paths"
import {Button, ControlledCustomInput, LoaderScreen} from '../../../shared/ui'
import {Errors} from '../../../entities/errors/workspaceErrors'
import {useTranslation} from "react-i18next"
import {useSnackbar} from "notistack"

export const LoginPage = () => {

    const {enqueueSnackbar} = useSnackbar()
    const {t} = useTranslation('errors')
    const navigate = useNavigate()

    const login = useAuth(s => s.login)
    const isLoading = useAuth(s => s.isLoading)

    const formControl = useForm<LoginData>({
        defaultValues: {
            phone: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<LoginData> = (data: LoginData) => {
        login(data,
            (data) => {
                if (data.user.shopId > 0) {
                    navigate(BikeShopPaths.WORKSPACE.MAIN_PAGE)
                } else {
                    navigate(BikeShopPaths.SHOP.HOME)
                }
            },
            (r: any) => {
                formControl.setError(r.response.data.reasonField, {
                    type: 'serverError',
                    message: t(r.response.data.error).toString()
                })
                enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
            })
    }

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <div className={s.loginPage_container}>
                <div className={s.loginForm_mainBox}>

                    <div className={s.loginForm_title}>
                        Авторизация
                    </div>
                    <form onSubmit={formControl.handleSubmit(onSubmit)}>
                        <div className={s.loginForm_form}>
                            <div className={s.phone}>
                                <ControlledCustomInput name={'phone'}
                                                       placeholder={'Почта или номер телефона'}
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
                            <ControlledCustomInput name={'password'}
                                                   type={'password'}
                                                   placeholder={'Пароль'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                        </div>
                        <div className={s.loginForm_buttons}>
                            <Button buttonDivWrapper={s.loginForm_registerButton}
                                    onClick={() => {navigate(BikeShopPaths.COMMON.REGISTRATION)}}
                            >
                                Регистрация
                            </Button>
                            <Button type={'submit'} buttonDivWrapper={s.loginForm_loginButton}>
                                Вход
                            </Button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}