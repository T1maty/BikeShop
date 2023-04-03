import React from 'react'
import s from './RegistrationPage.module.scss'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {RegistrationData} from '../../../entities'
import {BikeShopPaths} from '../../../app/routes/paths'
import useAuthUser from '../useAuthUser'
import {Button, ControlledCustomCheckbox, ControlledCustomInput} from '../../../shared/ui'
import {Errors} from '../../../entities/errors/workspaceErrors'

export const RegistrationPage = () => {

    const navigate = useNavigate()
    const register = useAuthUser(s => s.register)

    const formControl = useForm<RegistrationData>({
        defaultValues: {
            phone: '',
            password: '',
            isAgree: false,
        }
    })

    const onSubmit: SubmitHandler<RegistrationData> = (data: RegistrationData) => {
        register(data).then(() => {navigate(BikeShopPaths.COMMON.LOGIN)})
    }

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
                                                   rules={{required: Errors[0].name}}
                            />
                        </div>
                        <div>
                            <ControlledCustomInput name={'password'}
                                                   placeholder={'Пароль'}
                                                   control={formControl}
                                                   rules={{required: Errors[0].name}}
                            />
                        </div>
                        <ControlledCustomCheckbox name={'isAgree'}
                                                  label={'С условиями пользования ознакомлен и согласен'}
                                                  control={formControl}
                                                  divClassName={s.checkbox_block}
                        />
                    </form>
                </div>
                <Button type={'submit'} buttonDivWrapper={s.loginForm_submitButton}>
                    Зарегистрироваться
                </Button>
                <div className={s.haveAccount}
                     onClick={() => {navigate(BikeShopPaths.COMMON.LOGIN)}}
                >
                    Я уже зарегистрирован
                </div>
            </div>

        </div>
    )
}


// <Stack justifyContent="center" alignItems="center" sx={{height: '100vh'}}>
//     <Container maxWidth="sm">
//         <Typography variant="h4">Registration</Typography>
//         <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//             <Controller
//                 name="phone"
//                 control={control}
//                 rules={{
//                     required: 'Phone number is required',
//                     minLength: {value: 4, message: 'Min length is 4'},
//                     pattern: {
//                         value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
//                         message: 'Phone number is invalid'
//                     }
//                 }}
//                 render={({field}: any) => <TextField {...field}
//                                                      error={!!errors.phone}
//                                                      helperText={errors.phone ? errors.phone?.message : ''}
//                                                      label="Phone number" variant="outlined"
//                                                      fullWidth margin="dense"/>}
//             />
//
//             <Controller
//                 name="password"
//                 control={control}
//                 rules={{required: 'Password is required'}}
//                 render={({field}: any) => <TextField {...field}
//                                                      type="password"
//                                                      error={!!errors.password}
//                                                      helperText={errors.password ? errors.password?.message : ''}
//                                                      label="Password" variant="outlined"
//                                                      fullWidth
//                                                      margin="dense"/>}
//             />
//
//             <Button type="submit" variant="contained" sx={{mt: 2}}>Register</Button>
//         </Box>
//         <br/>
//         <NavLink to="/login">Login</NavLink><br/>
//     </Container>
// </Stack>