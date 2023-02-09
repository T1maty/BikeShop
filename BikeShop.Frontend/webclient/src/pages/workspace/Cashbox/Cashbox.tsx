import React from 'react';
import {Box, Container, Grid, Paper, Stack, Typography} from "@mui/material";

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
                            <Container sx={{width: '100%', height: '20vh'}}/>
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