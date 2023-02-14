import React from "react";
import {Box, Button, Container, Stack, TextField, Typography} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";
import {ILoginData, useAuthUser} from "../../../entities";


const LoginForm = () => {

    const login = useAuthUser(s => s.login);
    const setUser = useAuthUser(s => s.setUser);
    const user = useAuthUser(s => s.user);


    const navigate = useNavigate();

    const {
        control,
        formState: {
            errors
        },
        handleSubmit
    } = useForm<ILoginData>({
        defaultValues: {
            phone: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<ILoginData> = (data: ILoginData) => {
        login(data).then((r) => {

            localStorage.setItem('accessToken', r.data.accessToken)
            setUser(r.data.user)

            navigate('/mainpage')

        });
    };

    return (
        <Stack justifyContent="center" alignItems="center" sx={{height: "100vh"}}>
            <Container maxWidth="sm">
                <Typography variant="h4">Login</Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="phone"
                        control={control}
                        rules={{
                            required: "Phone number is required",
                            minLength: {value: 4, message: "Min length is 4"},
                            pattern: {
                                value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                                message: "Phone number is invalid"
                            }
                        }}
                        render={({field}: any) => <TextField {...field}
                                                             error={!!errors.phone}
                                                             helperText={errors.phone ? errors.phone?.message : ""}
                                                             label="Phone number"
                                                             variant="outlined"
                                                             fullWidth margin="dense"/>}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{required: "Password is required"}}
                        render={({field}: any) => <TextField {...field}
                                                             type="password"
                                                             error={!!errors.password}
                                                             helperText={errors.password ? errors.password?.message : ""}
                                                             label="Password" variant="outlined"
                                                             fullWidth
                                                             margin="dense"/>}
                    />

                    <Button type="submit" variant="contained" sx={{mt: 2}}>Login</Button>
                </Box>
                <NavLink to="/registration">Registration</NavLink><br/>
                <NavLink to="/main">main page</NavLink><br/>
                <NavLink to="/workcatalog">workcatalog</NavLink><br/>
            </Container>
        </Stack>
    );
};
export default LoginForm;