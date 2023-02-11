import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import s from "./MainPage.module.scss";
import Button from "../../../shared/ui/Button/Button";
import Input from '../../../shared/ui/Input/Input';

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

    const [tasks, setTasks] = useState([
        {id: 1, task: 'task 01'},
        {id: 2, task: 'task 02'},
        {id: 3, task: 'task 03'},
        {id: 4, task: 'task 04'},
        {id: 5, task: 'task 05'},
        {id: 6, task: 'task 06'},
        {id: 7, task: 'task 07'},
        {id: 8, task: 'task 08'},
        {id: 9, task: 'task 09'},
        {id: 10, task: 'task 10'},
    ])

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
                                <Button text={'Каталог товаров'} onClick={() => {navigate('/productcatalog')}}/>
                            </div>
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
                            {
                                tasks.map(t => {
                                    return (
                                        <div key={t.id} className={s.mainPage_main_leftSide_taskItem}>{t.task}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={s.mainPage_main_rightSide}>
                        <div className={s.mainPage_main_rightSide_top}>
                            <div className={s.mainPage_main_rightSide_top_search}>
                                <div className={s.mainPage_main_rightSide_searchButton}>
                                    <Button text={'Найти клиента'} onClick={() => {}}/>
                                </div>
                                <div className={s.mainPage_main_rightSide_searchInput}>
                                    <Input placeholder={'Поиск...'}/>
                                </div>
                            </div>
                            <div className={s.mainPage_main_rightSide_top_info}>
                                555
                            </div>
                            <div className={s.mainPage_main_rightSide_top_result}>
                                <div className={s.mainPage_main_rightSide_result_closeBtn}>
                                    <Button text={'Закрыть кассу'} onClick={() => {}}/>
                                </div>
                                <div className={s.mainPage_main_rightSide_result_cancelBtn}>
                                    <Button text={'X'} onClick={() => {}}/>
                                </div>
                                <div className={s.mainPage_main_rightSide_result_span}>
                                    Цена
                                </div>
                                <div className={s.mainPage_main_rightSide_result_payBtn}>
                                    <Button text={'К оплате'} onClick={() => {}}/>
                                </div>
                            </div>
                        </div>
                        <div className={s.mainPage_main_rightSide_bottom}>
                            <div className={s.mainPage_main_rightSide_bottom_left}>
                                <div>Сумма</div>
                                <div>Сумма</div>
                                <div>Сумма</div>
                            </div>
                            <div className={s.mainPage_main_rightSide_bottom_right}>
                                <div className={s.mainPage_main_rightSide_bottom_right_one}>
                                    <div>Сумма</div>
                                    <div>120:47:32</div>
                                </div>
                                <div className={s.mainPage_main_rightSide_bottom_right_two}>
                                    <div className={s.right_two_button}>
                                        <Button text={'Закончить смену'} onClick={() => {}}/>
                                    </div>
                                    <div className={s.right_two_span}>
                                        Закончить смену
                                    </div>
                                </div>
                            </div>
                        </div>
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