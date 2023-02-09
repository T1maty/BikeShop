import React from 'react';
import {Box, Container, Grid, Paper, Stack} from "@mui/material";
import Button from "../../../shared/ui/Button/Button";
import s from "./Cashbox.module.css"

export const Cashbox = () => {

    return (
        <Container>
            <Stack sx={{mt: 2}} direction={{xs: 'column', sm: 'row'}} spacing={2}>

                <Stack
                    sx={{width: {xs: '100%', sm: '50%'}, height: '30%'}}
                    direction={{xs: 'column', sm: 'column'}}
                    spacing={2}>
                    <Box
                        sx={{
                            width: '100%',
                            height: 'fit-content',
                            p: 2,
                            backgroundColor: 'grey.800',
                            borderRadius: 2,
                        }}
                    >
                        <Paper>
                            <Container sx={{width: '100%', height: '100%'}}/>

                            <Box
                                sx={{
                                    width: '100%',
                                    height: 'fit-content',
                                    p: 2,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <div className={s.buttonsTableBlock}>
                                    <Button text={'Стол 1'}/>
                                    <Button text={'Стол 2'}/>
                                    <Button text={'Стол 3'}/>
                                    <Button text={'Стол 4'}/>
                                </div>
                            </Box>

                        </Paper>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            height: 'fit-content',
                            p: 2,
                            backgroundColor: 'grey.800',
                            borderRadius: 2,
                        }}
                    >
                        <Paper>
                            <Container sx={{width: '100%', height: '75vh'}}/>
                        </Paper>
                    </Box>
                </Stack>

                <Box
                    sx={{
                        width: {xs: '100%', sm: '70%'},
                        p: 2,
                        backgroundColor: 'grey.800',
                        borderRadius: 2,
                    }}
                >
                    <Paper>
                        <Container sx={{width: '100%', height: '100vh'}}/>
                    </Paper>
                </Box>

            </Stack>
        </Container>
    );
};


// <Grid container spacing={2}>
//     <Grid item xs={4}>
//         <Paper
//             sx={{
//                 height: '50%',
//                 width: '100%',
//                 backgroundColor: (theme) =>
//                     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//             }}
//             {/*//
//                     <div style={{backgroundColor: 'green', margin: '8px'}}>
//                         hello
//                     </div>
//                     <div style={{backgroundColor: 'blue'}}>
//                         hello
//                     </div>
//                 </Grid>
//                 <Grid item xs={8}>
//                     <div style={{backgroundColor: 'yellow'}}>
//                         hello
//                     </div>
//                 </Grid>
//             </Grid>