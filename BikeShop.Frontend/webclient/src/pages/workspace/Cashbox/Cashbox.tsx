import React from 'react';
import {Box, Container, Paper, Stack} from "@mui/material";
import Button from "../../../shared/ui/Button/Button";
import s from "./Cashbox.module.css"
import Input from 'shared/ui/Input/Input';
import useChooseClientModal from '../../../features/ChooseClientModal/ChooseClientModalStore';
import ChooseClientModal from '../../../features/ChooseClientModal/ChooseClientModal';

const Cashbox = () => {

    const setChooseClientModal = useChooseClientModal(s => s.setChooseClientModal)

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
                        <Box
                            sx={{
                                width: '100%',
                                height: 'fit-content',
                                p: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}
                            className={s.tableBlock_buttons}
                        >
                            <Button text={'Стол 1'} onClick={() => {}}/>
                            <Button text={'Стол 2'} onClick={() => {}}/>
                            <Button text={'Стол 3'} onClick={() => {}}/>
                            <Button text={'Стол 4'} onClick={() => {}}/>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            // height: 'fit-content',
                            height: '100vh',
                            p: 2,
                            backgroundColor: 'grey.800',
                            borderRadius: 2,
                        }}
                    >
                        <Paper style={{borderRadius: '10px'}}>
                            <div className={s.clientBox}>
                                <h3 style={{textAlign: 'center', marginTop: '0px'}}>Клиент</h3>
                                <p>Панкратов Евгений Владимирович</p>
                                <p>Номер телефона</p>
                                <p>Почта</p>
                                <p>Баланс: 0</p>
                            </div>
                        </Paper>
                        <ChooseClientModal/>
                        <div className={s.clientBox_buttons}>
                            <div className={s.clientBox_buttons_chooseBtn}>
                                <Button text={'Выбрать клиента'} onClick={() => setChooseClientModal(true)}/>
                            </div>
                            <div className={s.clientBox_buttons_cancelBtn}>
                                <Button text={'X'} onClick={() => {}}/>
                            </div>
                        </div>
                    </Box>
                </Stack>

                <Box
                    sx={{
                        width: {xs: '100%', sm: '100%'},
                        p: 2,
                        backgroundColor: 'grey.800',
                        borderRadius: 2,
                    }}
                >
                    <div className={s.cashbox_rightBlock}>
                        <div className={s.cashbox_rightBlock_header}>
                            <div className={s.cashbox_header_chooseBtn}>
                                <Button text={'Выбрать товары'} onClick={() => {}}/>
                            </div>
                            <div className={s.cashbox_header_searchInput}>
                                <Input placeholder={'Поиск...'}/>
                            </div>
                        </div>
                    </div>
                    <Paper style={{borderRadius: '10px'}}>
                        <Container sx={{width: '100%', height: '100vh'}}/>
                    </Paper>
                    <div className={s.cashbox_rightBlock_bottom}>
                        <div className={s.cashbox_rightBlock_bottom_buttonsLeft}>
                            <div className={s.cashbox_rightBlock_bottom_cancelBtn}>
                                <Button text={'X'} onClick={() => {}}/>
                            </div>
                            <div className={s.cashbox_rightBlock_bottom_sumNoDiscount}>
                                Без скидки
                            </div>
                            <div className={s.cashbox_rightBlock_bottom_discount}>
                                Скидка
                            </div>
                        </div>
                        <div className={s.cashbox_rightBlock_bottom_Sum}>
                            Итоговая сумма
                        </div>
                    </div>
                    <div className={s.cashbox_rightBlock_bottom_buttonResult}>
                        <Button text={'К оплате'} onClick={() => {}}/>
                    </div>
                </Box>

            </Stack>
        </Container>

    );
};

export default Cashbox;