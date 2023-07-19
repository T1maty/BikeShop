import React from 'react'
import s from '../LoginPage/LoginPage.module.scss'
import {SubmitHandler, useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"
import {LoginData, useAuth} from "../../../entities"
import {BikeShopPaths} from "../../../app/routes/paths"
import {Button, ControlledCustomInput, LoaderScreen} from '../../../shared/ui'
import {Errors} from '../../../entities/errors/workspaceErrors'
import {useTranslation} from "react-i18next"
import {useSnackbar} from "notistack"
import {phoneMaskRemove} from "../../../shared/utils/phoneMaskRemove";
import {
    BarcodeScannerListenerProvider
} from "../../../app/providers/BarcodeScannerListenerProvider/BarcodeScannerListenerProvider";

export const LoginPage = () => {

    const {enqueueSnackbar} = useSnackbar()
    const {t} = useTranslation('errors')
    const navigate = useNavigate()

    const login = useAuth(s => s.login)
    const secretLogin = useAuth(s => s.secretLogin)
    const isLoading = useAuth(s => s.isLoading)

    const formControl = useForm<LoginData>({
        defaultValues: {
            phone: '',
            password: '',
        }
    })

    const onBarcodeHandler = (lastBarcode: string) => {
        enqueueSnackbar(`Секрет считан`, {variant: 'default', autoHideDuration: 3000})
        if (lastBarcode == '') return
        console.log('Barcode: ', lastBarcode)
        secretLogin(lastBarcode, (data) => {
            enqueueSnackbar('Успешный вход', {variant: 'success', autoHideDuration: 3000})
            if (data.user.shopId > 0) {
                navigate(BikeShopPaths.WORKSPACE.MAIN_PAGE)
            } else {
                navigate(BikeShopPaths.SHOP.HOME)
            }
        }, () => {
            enqueueSnackbar('Ошибка входа', {variant: 'warning', autoHideDuration: 5000})
        })
    }

    const onSubmit: SubmitHandler<LoginData> = (data: LoginData) => {
        data.phone = phoneMaskRemove(data.phone)
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
            <BarcodeScannerListenerProvider onBarcodeRead={onBarcodeHandler}>

                <div className={s.loginPage_container}>
                    <div className={s.loginForm_mainBox}>

                        <div className={s.loginForm_title}>
                            Авторизация
                        </div>
                        <form onSubmit={formControl.handleSubmit(onSubmit)}>
                            <div className={s.loginForm_form}>
                                <div className={s.phone}>
                                    <ControlledCustomInput name={'phone'}
                                                           mask={"+38 (999) 999-99-99"}
                                                           placeholder={'Почта или номер телефона'}
                                                           control={formControl}
                                                           rules={{
                                                               required: 'Поле обязательно для заполнения',
                                                               minLength: {
                                                                   value: 4,
                                                                   message: 'Минимальная длина 4 символа'
                                                               },
                                                               pattern: {
                                                                   value: /^(\s*)?(\+)?([- _():=+]?\d[- ():=+]?){10,14}(\s*)?$/,
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
                                        onClick={() => {
                                            navigate(BikeShopPaths.COMMON.REGISTRATION)
                                        }}
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
            </BarcodeScannerListenerProvider>
        )
    }
}