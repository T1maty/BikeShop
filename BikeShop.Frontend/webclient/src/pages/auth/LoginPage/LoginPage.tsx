import React from "react"
import s from '../LoginPage/LoginPage.module.scss'
import {SubmitHandler, useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"
import {LoginData} from "../../../entities"
import {BikeShopPaths} from "../../../app/routes/paths"
import useAuthUser from '../useAuthUser'
import {Button, ControlledCustomInput} from '../../../shared/ui'
import {Errors} from '../../../entities/errors/workspaceErrors'

export const LoginPage = () => {

    const login = useAuthUser(s => s.login)
    const setUser = useAuthUser(s => s.setUser)
    const loginToShop = useAuthUser(s => s.loginToShop)

    const navigate = useNavigate()

    const formControl = useForm<LoginData>({
        defaultValues: {
            phone: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<LoginData> = (data: LoginData) => {
        login(data).then((r) => {
            localStorage.setItem('accessToken', r.data.accessToken)
            setUser(r.data.user)
            if (r.data.user.shopId != 0) {
                loginToShop(r.data.user.shopId)
                navigate(BikeShopPaths.WORKSPACE.MAIN_PAGE)
            } else {
                navigate(BikeShopPaths.SHOP.PROFILE)
            }
        })
    }

    return (
        <div className={s.loginPage_container}>

            <div className={s.loginForm_mainBox}>
                <div className={s.loginForm_title}>
                    Авторизация
                </div>
                <div className={s.loginForm_form}>
                    <form onSubmit={formControl.handleSubmit(onSubmit)}>
                        <div>
                            <ControlledCustomInput name={'phone'}
                                                   placeholder={'Почта или номер телефона'}
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
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                        </div>
                        <Button type={'submit'} buttonDivWrapper={s.loginForm_loginButton}>
                            Вход
                        </Button>
                    </form>
                </div>
                <div className={s.loginForm_buttons}>
                    <Button buttonDivWrapper={s.loginForm_registerButton}
                            onClick={() => {
                                navigate(BikeShopPaths.COMMON.REGISTRATION)
                            }}
                    >
                        Регистрация
                    </Button>

                </div>

            </div>

        </div>
    )
}