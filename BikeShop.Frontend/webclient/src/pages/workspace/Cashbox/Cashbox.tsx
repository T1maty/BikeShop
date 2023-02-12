import React from 'react';
import s from './Cashbox.module.scss'
import useChooseClientModal from '../../../features/ChooseClientModal/ChooseClientModalStore';
import {ChooseClientModal, ClientCard} from '../../../features';
import {Button, InputUI} from '../../../shared/ui';

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
                        <ClientCard/>
                        <ChooseClientModal/>
                        <div className={s.leftSide_client_buttons}>
                            <div className={s.client_buttons_choose}>
                                <Button text={'Выбрать клиента'}
                                        onClick={() => setChooseClientModal(true)}
                                />
                            </div>
                            <div className={s.client_buttons_cancel}>
                                <Button text={'X'} onClick={() => {}}/>
                            </div>
                        </div>
                    </div>

                    <div className={s.leftSide_discount}>
                        <div className={s.discount_background}>
                            <div className={s.discount_info}>
                                <div className={s.info_title}>
                                    Скидка
                                </div>
                                <div className={s.info_name}>
                                    Название скидки
                                </div>
                                <div className={s.info_types}>
                                    <div className={s.info_type}>Тип</div>
                                    <div className={s.info_value}>Размер</div>
                                </div>
                            </div>
                        </div>
                        <div className={s.discount_buttons}>
                            <div className={s.buttons_choose}>
                                <Button text={'Выбрать скидку для клиента'}
                                        onClick={() => setChooseClientModal(true)}
                                />
                            </div>
                            <div className={s.buttons_cancel}>
                                <Button text={'X'} onClick={() => {}}/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={s.cashboxMainBlock_rightSideWrapper}>
                    <div className={s.cashboxMainBlock_rightSideHeader}>
                        <div className={s.header_chooseBtn}>
                            <Button text={'Выбрать товары'} onClick={() => {
                            }}/>
                        </div>
                        <div className={s.header_searchInput}>
                            <InputUI placeholder={'Поиск...'}/>
                        </div>
                    </div>

                    <div className={s.cashboxMainBlock_rightSideMiddle}>
                        Info
                    </div>

                    <div className={s.cashboxMainBlock_rightSideBottom}>
                        <div className={s.rightSideBottom_buttonsBlock}>
                            <div className={s.buttonsBlock_one}>
                                <div className={s.one_cancelBtn}>
                                    <Button text={'X'} onClick={() => {}}/>
                                </div>
                                <div className={s.one_noDiscount}>
                                    Без скидки
                                </div>
                                <div className={s.one_discount}>
                                    Скидка
                                </div>
                            </div>
                            <div className={s.buttonsBlock_two}>
                                Итоговая сумма
                            </div>
                        </div>

                        <div className={s.rightSideBottom_payBlock}>
                            <Button text={'К оплате'} onClick={() => {}}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cashbox;