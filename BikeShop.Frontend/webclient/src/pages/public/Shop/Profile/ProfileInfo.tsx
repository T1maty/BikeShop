import React, {useState, useEffect} from 'react'
import s from './ProfileInfo.module.scss'
import {Button, ControlledInput} from "../../../../shared/ui";
import {Errors} from "../../../../entities/errors/workspaceErrors";
import {useForm} from "react-hook-form";

export const ProfileInfo = () => {

    const InputStyles = {
        color: 'black',
        '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
        },
        '.MuiSvgIcon-root ': {
            fill: 'black',
        },
    }
    const InputLabelProps = {style: { color: 'black'}}

    // сбор данных с формы //
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

    // const onSubmit: SubmitHandler<any> = (data: any) => {
    //     addNewService(data).then((res: any) => {
    //         clearSubmitInfo() // очистка полей
    //         enqueueSnackbar('Ремонт добавлен', {variant: 'success', autoHideDuration: 3000})
    //     }).catch((error: any) => {
    //         let message = error(error.response.data.errorDescription).toString()
    //         formControl.setError('name', {type: 'serverError', message: message})
    //         enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
    //         console.error(error.response.data)
    //     })
    // }

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
                                    <ControlledInput name={'lastName'}
                                                     label={'Фамилия'}
                                                     control={formControl}
                                                     rules={{required: Errors[0].name}}
                                                     sx={InputStyles}
                                                     InputLabelProps={InputLabelProps}
                                    />
                                </div>
                                <div className={s.inputs_left_firstName}>
                                    <ControlledInput name={'firstName'}
                                                     label={'Имя'}
                                                     control={formControl}
                                                     rules={{required: Errors[0].name}}
                                                     sx={InputStyles}
                                                     InputLabelProps={InputLabelProps}
                                    />
                                </div>
                                <div className={s.inputs_left_patronymic}>
                                    <ControlledInput name={'patronymic'}
                                                     label={'Отчество'}
                                                     control={formControl}
                                                     rules={{required: Errors[0].name}}
                                                     sx={InputStyles}
                                                     InputLabelProps={InputLabelProps}
                                    />
                                </div>
                            </div>
                            <div className={s.inputs_right}>
                                <div className={s.inputs_left_lastName}>
                                    <ControlledInput name={'gender'}
                                                     label={'Пол'}
                                                     control={formControl}
                                                     rules={{required: Errors[0].name}}
                                                     sx={InputStyles}
                                                     InputLabelProps={InputLabelProps}
                                    />
                                </div>
                                <div className={s.inputs_left_lastName}>
                                    <ControlledInput name={'dateOfBirth'}
                                                     label={'Дата рождения'}
                                                     control={formControl}
                                                     rules={{required: Errors[0].name}}
                                                     sx={InputStyles}
                                                     InputLabelProps={InputLabelProps}
                                    />
                                </div>
                                <div className={s.inputs_left_lastName}>
                                    <ControlledInput name={'language'}
                                                     label={'Язык'}
                                                     control={formControl}
                                                     rules={{required: Errors[0].name}}
                                                     sx={InputStyles}
                                                     InputLabelProps={InputLabelProps}
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
                            <ControlledInput name={'phone'}
                                             label={'Телефон'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             sx={InputStyles}
                                             InputLabelProps={InputLabelProps}
                            />
                        </div>
                        <div className={s.inputs_right_email}>
                            <ControlledInput name={'email'}
                                             label={'Почта'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             sx={InputStyles}
                                             InputLabelProps={InputLabelProps}
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
                            <ControlledInput name={'delivery-company'}
                                             label={'Грузовая'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             sx={InputStyles}
                                             InputLabelProps={InputLabelProps}
                            />
                            <ControlledInput name={'post-type'}
                                             label={'Почта'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             sx={InputStyles}
                                             InputLabelProps={InputLabelProps}
                            />
                            <ControlledInput name={'address'}
                                             label={'Адрес'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             sx={InputStyles}
                                             InputLabelProps={InputLabelProps}
                            />
                        </div>

                        <div className={s.content_row}>
                            <ControlledInput name={'delivery-company'}
                                             label={'Грузовая'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             sx={InputStyles}
                                             InputLabelProps={InputLabelProps}
                            />
                            <ControlledInput name={'post-type'}
                                             label={'Почта'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             sx={InputStyles}
                                             InputLabelProps={InputLabelProps}
                            />
                            <ControlledInput name={'address'}
                                             label={'Адрес'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             sx={InputStyles}
                                             InputLabelProps={InputLabelProps}
                            />
                        </div>

                        <div className={s.content_row}>
                            <ControlledInput name={'delivery-company'}
                                             label={'Грузовая'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             sx={InputStyles}
                                             InputLabelProps={InputLabelProps}
                            />
                            <ControlledInput name={'post-type'}
                                             label={'Почта'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             sx={InputStyles}
                                             InputLabelProps={InputLabelProps}
                            />
                            <ControlledInput name={'address'}
                                             label={'Адрес'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             sx={InputStyles}
                                             InputLabelProps={InputLabelProps}
                            />
                        </div>

                        <div className={s.content_row}>
                            <ControlledInput name={'delivery-company'}
                                             label={'Грузовая'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             sx={InputStyles}
                                             InputLabelProps={InputLabelProps}
                            />
                            <ControlledInput name={'post-type'}
                                             label={'Почта'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             sx={InputStyles}
                                             InputLabelProps={InputLabelProps}
                            />
                            <ControlledInput name={'address'}
                                             label={'Адрес'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             sx={InputStyles}
                                             InputLabelProps={InputLabelProps}
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