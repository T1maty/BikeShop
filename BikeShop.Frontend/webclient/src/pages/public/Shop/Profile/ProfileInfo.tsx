import React, {useState, useEffect} from 'react'
import s from './ProfileInfo.module.scss'
import {Button, ControlledCustomInput} from '../../../../shared/ui'
import {Errors} from "../../../../entities/errors/workspaceErrors"
import {SubmitHandler, useForm} from 'react-hook-form'
import {AuthAPI, User} from '../../../../entities'
import {ErrorStatusTypes} from "../../../../entities/enumerables/ErrorStatusTypes"

interface ProfileInfoProps {
    user: User
    setIsLoading: (value: boolean) => void
    setErrorStatus: (value: ErrorStatusTypes) => void
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({user, setIsLoading, setErrorStatus}) => {

    const formControl = useForm<any>({
        defaultValues: {
            lastName: '',
            firstName: '',
            patronymic: '',

            gender: '',
            dateOfBirth: '',
            language: '',

            phoneNumber: '',
            email: '',
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        setIsLoading(true)
        AuthAPI.User.updateUserProfile(data).then((res) => {
            setIsLoading(false)
            setErrorStatus('success')
            console.log('обновление профиля', data)
        }).catch((error: any) => {
            console.log('ошибка профиля', error)
            setErrorStatus('error')
        }).finally(() => {
            setIsLoading(false)
            setErrorStatus('default')
        })
    }

    useEffect(() => {
        formControl.setValue('lastName', user ? user.lastName : '')
        formControl.setValue('firstName', user ? user.firstName : '')
        formControl.setValue('patronymic', user ? user.patronymic : '')

        formControl.setValue('phoneNumber', user ? user.phoneNumber : '')
        formControl.setValue('email', user ? user.email : '')
    }, [user])

    console.log('профиль', user)

    return (
        <div className={s.profileInfo_mainBox}>
            <div className={s.profileInfo_balance}>
                <div>Баланс: 999</div>
                <div>Кредитный лимит: 99</div>
            </div>

            <form onSubmit={formControl.handleSubmit(onSubmit)}>
                <div className={s.profileInfo_forms}>
                    <div className={s.profileInfo_personal}>
                        <div className={s.form_title}>
                            Персональная информация
                        </div>
                        <div className={s.personal_content}>
                            <div className={s.content_inputs}>
                                <div className={s.inputs_left}>
                                    <div className={s.inputs_left_lastName}>
                                        <ControlledCustomInput name={'lastName'}
                                                               placeholder={'Фамилия'}
                                                               color={'black'}
                                                               control={formControl}
                                            // rules={{required: Errors[0].name}}
                                        />
                                    </div>
                                    <div className={s.inputs_left_firstName}>
                                        <ControlledCustomInput name={'firstName'}
                                                               placeholder={'Имя'}
                                                               color={'black'}
                                                               control={formControl}
                                            // rules={{required: Errors[0].name}}
                                        />
                                    </div>
                                    <div className={s.inputs_left_patronymic}>
                                        <ControlledCustomInput name={'patronymic'}
                                                               placeholder={'Отчество'}
                                                               color={'black'}
                                                               control={formControl}
                                            // rules={{required: Errors[0].name}}
                                        />
                                    </div>
                                </div>
                                <div className={s.inputs_right}>
                                    <div className={s.inputs_left_lastName}>
                                        <ControlledCustomInput name={'gender'}
                                                               placeholder={'Пол'}
                                                               color={'black'}
                                                               control={formControl}
                                            // rules={{required: Errors[0].name}}
                                        />
                                    </div>
                                    <div className={s.inputs_left_lastName}>
                                        <ControlledCustomInput name={'dateOfBirth'}
                                                               placeholder={'Дата рождения'}
                                                               color={'black'}
                                                               control={formControl}
                                            // rules={{required: Errors[0].name}}
                                        />
                                    </div>
                                    <div className={s.inputs_left_lastName}>
                                        <ControlledCustomInput name={'language'}
                                                               placeholder={'Язык'}
                                                               color={'black'}
                                                               control={formControl}
                                            // rules={{required: Errors[0].name}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={s.personal_editButton}>
                                <Button type={'submit'}>
                                    Редактировать
                                </Button>
                            </div>
                        </div>
                    </div>


                    <div className={s.profileInfo_contacts}>
                        <div className={s.form_title}>
                            Контакты
                        </div>
                        <div className={s.content_inputs}>
                            <div className={s.inputs_left_phone}>
                                <ControlledCustomInput name={'phoneNumber'}
                                                       placeholder={'Телефон'}
                                                       color={'black'}
                                                       control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div className={s.inputs_right_email}>
                                <ControlledCustomInput name={'email'}
                                                       placeholder={'Почта'}
                                                       color={'black'}
                                                       control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                            </div>
                        </div>
                        <div className={s.personal_editButton}>
                            <Button onClick={() => {}}>
                                Редактировать
                            </Button>
                        </div>
                    </div>


                    <div className={s.profileInfo_delivery}>
                        <div className={s.form_title}>Доставка</div>
                        <div className={s.delivery_content}>
                            <div className={s.content_row}>
                                <ControlledCustomInput name={'delivery-company'}
                                                       placeholder={'Грузовая'}
                                                       color={'black'}
                                                       control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomInput name={'post-type'}
                                                       placeholder={'Почта'}
                                                       color={'black'}
                                                       control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomInput name={'address'}
                                                       placeholder={'Адрес'}
                                                       color={'black'}
                                                       control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                            </div>

                            <div className={s.content_row}>
                                <ControlledCustomInput name={'delivery-company'}
                                                       placeholder={'Грузовая'}
                                                       color={'black'}
                                                       control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomInput name={'post-type'}
                                                       placeholder={'Почта'}
                                                       color={'black'}
                                                       control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomInput name={'address'}
                                                       placeholder={'Адрес'}
                                                       color={'black'}
                                                       control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                            </div>

                            <div className={s.content_row}>
                                <ControlledCustomInput name={'delivery-company'}
                                                       placeholder={'Грузовая'}
                                                       color={'black'}
                                                       control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomInput name={'post-type'}
                                                       placeholder={'Почта'}
                                                       color={'black'}
                                                       control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomInput name={'address'}
                                                       placeholder={'Адрес'}
                                                       color={'black'}
                                                       control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                            </div>

                            <div className={s.content_row}>
                                <ControlledCustomInput name={'delivery-company'}
                                                       placeholder={'Грузовая'}
                                                       color={'black'}
                                                       control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomInput name={'post-type'}
                                                       placeholder={'Почта'}
                                                       color={'black'}
                                                       control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomInput name={'address'}
                                                       placeholder={'Адрес'}
                                                       color={'black'}
                                                       control={formControl}
                                    // rules={{required: Errors[0].name}}
                                />
                            </div>
                        </div>


                        <div className={s.personal_editButton}>
                            <Button onClick={() => {}}>
                                Редактировать
                            </Button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}