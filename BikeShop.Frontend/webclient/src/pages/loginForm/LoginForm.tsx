import React from 'react'
import { Container, TextField, Button, Box, Typography, Stack } from '@mui/material'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { NavLink } from 'react-router-dom'


type LoginData = {
    phoneNumber: string,
    password: string
}


const LoginForm = () => {

    const {
        control,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm<LoginData>({
        defaultValues: {
            phoneNumber: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<LoginData> = (data: any) => {
        console.log(data)
    }


    return (
        <Stack justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
            <Container maxWidth="sm">
                <Typography variant='h4'>Login</Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{
                            required: 'Phone number is required',
                            minLength: { value: 4, message: 'Min length is 4' },
                            pattern: {
                                value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                                message: 'Phone number is invalid'
                            }
                        }}
                        render={({ field }: any) => <TextField {...field}
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber ? errors.phoneNumber?.message : ''}
                            label="Phone number" variant='outlined'
                            fullWidth margin='dense' />}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'Password is required' }}
                        render={({ field }: any) => <TextField {...field}
                            type="password"
                            error={!!errors.password}
                            helperText={errors.password ? errors.password?.message : ''}
                            label="Password" variant='outlined'
                            fullWidth
                            margin='dense' />}
                    />

                    <Button type='submit' variant='contained' sx={{ mt: 2 }}>Login</Button>
                </Box>
                <NavLink to='/registration'>Registration</NavLink><br />
                <NavLink to='/main'>main page</NavLink><br/>
                <NavLink to='/workcatalog'>workcatalog</NavLink>
            </Container>
        </Stack>
    )
}
export default LoginForm;