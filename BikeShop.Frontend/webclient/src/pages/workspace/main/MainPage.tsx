import React from 'react';
import {Box, Button, Container, Divider, Paper, Stack, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

const navLinks = [
    'Create repairing',
    'Create order',
    'Add hot client',
    'Rent',
    'Repair',
    'Check',
    'All Orders',
];

const MainPage = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <Stack
                sx={{mb: 2}}
                direction="row"
                alignItems="center"
                justifyContent="space-around"
                flexWrap="wrap"
                divider={<Divider orientation="vertical" flexItem sx={{mt: '21px', mb: '5px'}}/>}
            >
                <Button sx={{mt: 2, mx: 1}} variant="contained" color="secondary" onClick={() => {
                    navigate('/productcatalog')
                }}>
                    Каталог товаров
                </Button>
            </Stack>
            <Stack sx={{mt: 2}} direction={{xs: 'column', sm: 'row'}} spacing={2}>
                <Box
                    sx={{
                        width: {xs: '100%', sm: '50%'},
                        p: 2,
                        backgroundColor: 'grey.800',
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" component="p">
                        Task manager
                    </Typography>
                    <Paper>
                        <Container sx={{width: '100%', height: '70vh'}}/>
                    </Paper>
                </Box>
                <Stack
                    sx={{width: {xs: '100%', sm: '50%'}, height: '70vh'}}
                    direction="column"
                    spacing={2}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: 'fit-content',
                            p: 2,
                            backgroundColor: 'grey.800',
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" component="p">
                            Cashbox
                        </Typography>
                        <Paper>
                            {/* {высота будет зависить от контента внутри, так что потом её надо будет убрать} */}
                            <Container sx={{width: '100%', height: 389 + 32}}/>
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
                        <Paper sx={{width: '60%'}}>
                            {/* {высота будет зависить от контента внутри, так что потом её надо будет убрать} */}
                            <Container sx={{width: '100%', height: 200}}/>
                        </Paper>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    );
};

export default MainPage;
