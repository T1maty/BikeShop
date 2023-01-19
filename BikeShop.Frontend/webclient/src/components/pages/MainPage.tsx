import React from 'react';
import { Container, Stack, Button, Box, Paper, Typography } from '@mui/material';

const MainPage = () => {
    return (
        <Container>
            <Stack sx={{ mb: 2 }} direction="row" spacing={2}>
                <Button fullWidth variant='contained' color='primary'>Button</Button>
                <Button fullWidth variant='contained' color='primary'>Button</Button>
                <Button fullWidth variant='contained' color='primary'>Button</Button>
                <Button fullWidth variant='contained' color='primary'>Button</Button>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Button fullWidth variant='contained' color='primary'>Button</Button>
                <Button fullWidth variant='contained' color='primary'>Button</Button>
                <Button fullWidth variant='contained' color='primary'>Button</Button>
                <Button fullWidth variant='contained' color='primary'>Button</Button>
            </Stack>
            <Box sx={{ height: '100%', p: 2, mt: 2, backgroundColor: 'grey.800', borderRadius: 2 }}>
                <Typography variant='h6' component='p'>Task manager</Typography>
                <Paper >
                    <Container sx={{ width: '100%', height: 100 }}>

                    </Container>
                </Paper>
            </Box>
        </Container>
    );
};

export default MainPage;