import React from 'react'
import {Box, Button, Container, Stack, TextField, Typography} from '@mui/material'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {NavLink, useNavigate} from 'react-router-dom'
import {IRegistrationData} from '../../../entities'
import {BikeShopPaths} from '../../../app/routes/paths'
import useAuthUser from '../useAuthUser'

const RegistrationForm = () => {

    const navigate = useNavigate()
    const register = useAuthUser(s => s.register)

    const {control, formState: {errors}, handleSubmit} = useForm<IRegistrationData>({
        defaultValues: {
            phone: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<IRegistrationData> = (data: IRegistrationData) => {
        register(data).then(() => {navigate(BikeShopPaths.COMMON.LOGIN)})
    };

    return (
        <Stack justifyContent="center" alignItems="center" sx={{height: '100vh'}}>
            <Container maxWidth="sm">
                <Typography variant="h4">Registration</Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="phone"
                        control={control}
                        rules={{
                            required: 'Phone number is required',
                            minLength: {value: 4, message: 'Min length is 4'},
                            pattern: {
                                value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                                message: 'Phone number is invalid'
                            }
                        }}
                        render={({field}: any) => <TextField {...field}
                                                             error={!!errors.phone}
                                                             helperText={errors.phone ? errors.phone?.message : ''}
                                                             label="Phone number" variant="outlined"
                                                             fullWidth margin="dense"/>}
                    />

                    <Controller
                        name="password"
                        control={control}
                        rules={{required: 'Password is required'}}
                        render={({field}: any) => <TextField {...field}
                                                             type="password"
                                                             error={!!errors.password}
                                                             helperText={errors.password ? errors.password?.message : ''}
                                                             label="Password" variant="outlined"
                                                             fullWidth
                                                             margin="dense"/>}
                    />

                    <Button type="submit" variant="contained" sx={{mt: 2}}>Register</Button>
                </Box>
                <br/>
                <NavLink to="/login">Login</NavLink><br/>
            </Container>
        </Stack>
    );
};

export default RegistrationForm;