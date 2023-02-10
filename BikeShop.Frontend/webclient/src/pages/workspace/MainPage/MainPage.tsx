import React from 'react';
import {Box, Container, Divider, Paper, Stack, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import s from "./MainPage.module.scss";
import Button from "../../../shared/ui/Button/Button";

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
        <div className={s.mainPageWrapper}>
            <div className={s.mainPageMainBlock}>
                <div className={s.mainPage_header}>
                    <div className={s.mainPage_header_leftSide}>
                        <div className={s.mainPage_header_leftSide_deal}>
                            <div>
                                <Button text={'Создать ремонт'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Создать заказ'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Добавить горячего клиента'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Прокат'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Внести на счёт'} onClick={() => {}}/>
                            </div>
                        </div>
                        <div className={s.mainPage_header_leftSide_info}>
                            <div>
                                <Button text={'Ремонты'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Чеки'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Заказы'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Прокаты'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Счета клиентов'} onClick={() => {}}/>
                            </div>
                            <div>
                                <Button text={'Перемещение'} onClick={() => {}}/>
                            </div>
                        </div>
                    </div>
                    <div className={s.mainPage_header_rightSide}>
                        3
                    </div>
                </div>
                <div className={s.mainPage_main}>
                    <div className={s.mainPage_main_leftSide}>
                        <div className={s.mainPage_main_leftSide_title}>
                            Персональные задания
                        </div>
                        <div className={s.mainPage_main_leftSide_tasks}>
                            <div>Задания</div>
                            <div>Задания</div>
                            <div>Задания</div>
                            <div>Задания</div>
                            <div>Задания</div>
                            <div>Задания</div>
                            <div>Задания</div>
                        </div>
                    </div>
                    <div className={s.mainPage_main_rightSide}>
                        <div className={s.mainPage_main_rightSide_top}>5</div>
                        <div className={s.mainPage_main_rightSide_bottom}>6</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;

// <Container>
//     <Stack
//         sx={{mb: 2}}
//         direction="row"
//         alignItems="center"
//         justifyContent="space-around"
//         flexWrap="wrap"
//         divider={<Divider orientation="vertical" flexItem sx={{mt: '21px', mb: '5px'}}/>}
//     >
//         <Button sx={{mt: 2, mx: 1}} variant="contained" color="secondary" onClick={() => {
//             navigate('/productcatalog')
//         }}>
//             Каталог товаров
//         </Button>
//     </Stack>
//     <Stack sx={{mt: 2}} direction={{xs: 'column', sm: 'row'}} spacing={2}>
//         <Box
//             sx={{
//                 width: {xs: '100%', sm: '50%'},
//                 p: 2,
//                 backgroundColor: 'grey.800',
//                 borderRadius: 2,
//             }}
//         >
//             <Typography variant="h6" component="p">
//                 Task manager
//             </Typography>
//             <Paper>
//                 <Container sx={{width: '100%', height: '70vh'}}/>
//             </Paper>
//         </Box>
//         <Stack
//             sx={{width: {xs: '100%', sm: '50%'}, height: '70vh'}}
//             direction="column"
//             spacing={2}
//         >
//             <Box
//                 sx={{
//                     width: '100%',
//                     height: 'fit-content',
//                     p: 2,
//                     backgroundColor: 'grey.800',
//                     borderRadius: 2,
//                 }}
//             >
//                 <Typography variant="h6" component="p">
//                     Cashbox
//                 </Typography>
//                 <Paper>
//                     {/* {высота будет зависить от контента внутри, так что потом её надо будет убрать} */}
//                     <Container sx={{width: '100%', height: 389 + 32}}/>
//                 </Paper>
//             </Box>
//             <Box
//                 sx={{
//                     width: '100%',
//                     height: 'fit-content',
//                     p: 2,
//                     backgroundColor: 'grey.800',
//                     borderRadius: 2,
//                 }}
//             >
//                 <Paper sx={{width: '60%'}}>
//                     {/* {высота будет зависить от контента внутри, так что потом её надо будет убрать} */}
//                     <Container sx={{width: '100%', height: 200}}/>
//                 </Paper>
//             </Box>
//         </Stack>
//     </Stack>
// </Container>