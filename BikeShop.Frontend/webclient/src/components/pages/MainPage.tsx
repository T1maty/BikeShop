import React from 'react';
import { Container, Stack, Button, Box, Paper, Typography } from '@mui/material';

const navLinks = ['Create repairing', 'Create order', 'Add hot client', 'Rent', 'Repair', 'Check', 'All Orders']

const MainPage = () => {
    return (
        <Container>
            <Stack sx={{ mb: 2 }} direction="row" alignItems='center' justifyContent='space-around' flexWrap='wrap'>
                {navLinks.map((item, index) => <Button key={index} sx={{ mt: 2, mx: 1 }} variant='contained' color='primary'>{item}</Button>)}
            </Stack>
            <Stack sx={{ mt: 2 }} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Box sx={{ width: { xs: '100%', sm: '50%' }, p: 2, backgroundColor: 'grey.800', borderRadius: 2 }}>
                    <Typography variant='h6' component='p'>Task manager</Typography>
                    <Paper >
                        <Container sx={{ width: '100%', height: '70vh' }}>

                        </Container>
                    </Paper>
                </Box>
                <Stack sx={{ width: { xs: '100%', sm: '50%' }, height: '70vh' }} direction='column' spacing={2} >
                    <Box sx={{ width: '100%', height: 'fit-content', p: 2, backgroundColor: 'grey.800', borderRadius: 2 }}>
                        <Typography variant='h6' component='p'>Cashbox</Typography>
                        <Paper >
                            {/* {высота будетзависить от контента внутри, так что потом её надо будет убрать} */}
                            <Container sx={{ width: '100%', height: 389 + 32 }}>

                            </Container>
                        </Paper>
                    </Box>
                    <Box sx={{ width: '100%', height: 'fit-content', p: 2, backgroundColor: 'grey.800', borderRadius: 2 }}>
                        <Paper sx={{ width: '60%' }}>
                            {/* {высота будетзависить от контента внутри, так что потом её надо будет убрать} */}
                            <Container sx={{ width: '100%', height: 200 }}>

                            </Container>
                        </Paper>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    );
};

export default MainPage;