import React from 'react';
import Button from '../../../shared/ui/Button/Button';
import s from './Cashbox.module.scss'
import Input from 'shared/ui/Input/Input';
import useChooseClientModal from '../../../features/ChooseClientModal/ChooseClientModalStore';
import ChooseClientModal from '../../../features/ChooseClientModal/ChooseClientModal';

const Cashbox = () => {

    const setChooseClientModal = useChooseClientModal(s => s.setChooseClientModal)

    return (
        <div className={s.cashboxWrapper}>
            <div className={s.cashboxMainBlock}>
                <div className={s.cashboxMainBlock_leftSideWrapper}>
                    <div className={s.leftSide_tables}>
                        <Button text={'Стол 1'} onClick={() => {}}/>
                        <Button text={'Стол 2'} onClick={() => {}}/>
                        <Button text={'Стол 3'} onClick={() => {}}/>
                        <Button text={'Стол 4'} onClick={() => {}}/>
                    </div>
                    <div className={s.leftSide_client}>
                        <div className={s.leftSide_client_background}>
                            <h3 style={{textAlign: 'center', marginTop: '0px'}}>Клиент</h3>
                            <p>Панкратов Евгений Владимирович</p>
                            <p>Номер телефона</p>
                            <p>Почта</p>
                            <p>Баланс: 0</p>
                        </div>
                        <ChooseClientModal/>
                        <div className={s.leftSide_client_buttons}>
                            <div className={s.leftSide_client_buttons_choose}>
                                <Button text={'Выбрать клиента'}
                                        onClick={() => setChooseClientModal(true)}
                                />
                            </div>
                            <div className={s.leftSide_client_buttons_cancel}>
                                <Button text={'X'} onClick={() => {
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={s.cashboxMainBlock_rightSideWrapper}>
                    <div className={s.cashboxMainBlock_rightSideHeader}>
                        <div className={s.cashbox_header_chooseBtn}>
                            <Button text={'Выбрать товары'} onClick={() => {
                            }}/>
                        </div>
                        <div className={s.cashbox_header_searchInput}>
                            <Input placeholder={'Поиск...'}/>
                        </div>
                    </div>
                    <div className={s.cashboxMainBlock_rightSideMiddle}>
                        Info
                    </div>
                    <div className={s.cashboxMainBlock_rightSideBottom}>
                        <div className={s.cashboxMainBlock_rightSideBottom_buttonsBlock}>
                            <div className={s.cashboxMainBlock_rightSideBottom_buttonsBlock_one}>
                                <div className={s.cashboxMainBlock_rightSideBottom_cancelBtn}>
                                    <Button text={'X'} onClick={() => {}}/>
                                </div>
                                <div className={s.cashboxMainBlock_rightSideBottom_noDiscount}>
                                    Без скидки
                                </div>
                                <div className={s.cashboxMainBlock_rightSideBottom_discount}>
                                    Скидка
                                </div>
                            </div>
                            <div className={s.cashboxMainBlock_rightSideBottom_buttonsBlock_two}>
                                Итоговая сумма
                            </div>
                        </div>
                        <div className={s.cashboxMainBlock_rightSideBottom_payBlock}>
                            <Button text={'К оплате'} onClick={() => {}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cashbox;