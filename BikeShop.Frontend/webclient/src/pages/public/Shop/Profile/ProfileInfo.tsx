import React, {useState, useEffect} from 'react'
import s from './ProfileInfo.module.scss'
import {Button, ControlledCustomInput} from '../../../../shared/ui'
import {Errors} from "../../../../entities/errors/workspaceErrors"
import {SubmitHandler, useForm} from 'react-hook-form'

export const ProfileInfo = () => {

    const formControl = useForm({
        defaultValues: {
            lastName: '',
            firstName: '',
            patronymic: '',
            gender: '',
            dateOfBirth: '',
            language: '',
        }
    });

    const onSubmit: SubmitHandler<any> = (data: any) => {
        //
    }

    return (
        <div className={s.profileInfo_mainBox}>
            <div className={s.profileInfo_balance}>
                <div>Баланс: 999</div>
                <div>Кредитный лимит: 99</div>
            </div>
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
                                                           rules={{required: Errors[0].name}}
                                    />
                                </div>
                                <div className={s.inputs_left_firstName}>
                                    <ControlledCustomInput name={'firstName'}
                                                           placeholder={'Имя'}
                                                           color={'black'}
                                                           control={formControl}
                                                           rules={{required: Errors[0].name}}
                                    />
                                </div>
                                <div className={s.inputs_left_patronymic}>
                                    <ControlledCustomInput name={'patronymic'}
                                                           placeholder={'Отчество'}
                                                           color={'black'}
                                                           control={formControl}
                                                           rules={{required: Errors[0].name}}
                                    />
                                </div>
                            </div>
                            <div className={s.inputs_right}>
                                <div className={s.inputs_left_lastName}>
                                    <ControlledCustomInput name={'gender'}
                                                           placeholder={'Пол'}
                                                           color={'black'}
                                                           control={formControl}
                                                           rules={{required: Errors[0].name}}
                                    />
                                </div>
                                <div className={s.inputs_left_lastName}>
                                    <ControlledCustomInput name={'dateOfBirth'}
                                                           placeholder={'Дата рождения'}
                                                           color={'black'}
                                                           control={formControl}
                                                           rules={{required: Errors[0].name}}
                                    />
                                </div>
                                <div className={s.inputs_left_lastName}>
                                    <ControlledCustomInput name={'language'}
                                                           placeholder={'Язык'}
                                                           color={'black'}
                                                           control={formControl}
                                                           rules={{required: Errors[0].name}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={s.personal_editButton}>
                            <Button onClick={() => {}}>
                                Редактировать
                            </Button>
                        </div>
                    </div>
                </div>


                <div className={s.profileInfo_contacts}>
                    <div className={s.form_title}>Контакты</div>
                    <div className={s.content_inputs}>
                        <div className={s.inputs_left_phone}>
                            <ControlledCustomInput name={'phone'}
                                                   placeholder={'Телефон'}
                                                   color={'black'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                        </div>
                        <div className={s.inputs_right_email}>
                            <ControlledCustomInput name={'email'}
                                                   placeholder={'Почта'}
                                                   color={'black'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
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
                                                   rules={{required: Errors[0].name}}
                            />
                            <ControlledCustomInput name={'post-type'}
                                                   placeholder={'Почта'}
                                                   color={'black'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                            <ControlledCustomInput name={'address'}
                                                   placeholder={'Адрес'}
                                                   color={'black'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                        </div>

                        <div className={s.content_row}>
                            <ControlledCustomInput name={'delivery-company'}
                                                   placeholder={'Грузовая'}
                                                   color={'black'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                            <ControlledCustomInput name={'post-type'}
                                                   placeholder={'Почта'}
                                                   color={'black'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                            <ControlledCustomInput name={'address'}
                                                   placeholder={'Адрес'}
                                                   color={'black'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                        </div>

                        <div className={s.content_row}>
                            <ControlledCustomInput name={'delivery-company'}
                                                   placeholder={'Грузовая'}
                                                   color={'black'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                            <ControlledCustomInput name={'post-type'}
                                                   placeholder={'Почта'}
                                                   color={'black'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                            <ControlledCustomInput name={'address'}
                                                   placeholder={'Адрес'}
                                                   color={'black'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                        </div>

                        <div className={s.content_row}>
                            <ControlledCustomInput name={'delivery-company'}
                                                   placeholder={'Грузовая'}
                                                   color={'black'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                            <ControlledCustomInput name={'post-type'}
                                                   placeholder={'Почта'}
                                                   color={'black'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                            <ControlledCustomInput name={'address'}
                                                   placeholder={'Адрес'}
                                                   color={'black'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
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
        </div>
    )
}