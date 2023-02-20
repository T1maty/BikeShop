import React from 'react';
import s from './Cashbox.module.scss'
import {ChooseClientModal, ChooseDiscountModal, ChooseProductModal, PayModal} from '../../../features';
import {Button, InputUI} from '../../../shared/ui';
import useChooseClientModal from '../../../features/ChooseClientModal/ChooseClientModalStore';
import useChooseDiscountModal from '../../../features/ChooseDiscountModal/ChooseDiscountModalStore';
import usePayModal from '../../../features/PayModal/PayModalStore';
import useChooseProductModal from '../../../features/ChooseProductModal/ChooseProductModalStore';
import {ClientCard} from "../../../widgets";

const Cashbox = () => {

    const isActiveTable = true

    const setChooseClientModal = useChooseClientModal(s => s.setChooseClientModal)
    const setChooseDiscountModal = useChooseDiscountModal(s => s.setChooseDiscountModal)
    const setChooseProductModal = useChooseProductModal(s => s.setChooseProductModal)
    const setPayModal = usePayModal(s => s.setPayModal)

    const chooseClient = () => {
        // setUserId(clientCard.userId)
        // setCardLastName(clientCard.lastName)
        // setCardFirstName(clientCard.firstName)
        // setCardPatronymic(clientCard.patronymic)
        // setCardPhoneNumber(clientCard.phoneNumber)
        //
        // setOpen(false)

        alert('ok')
    }

    return (
        // <div className={s.cashboxWrapper}>
            <div className={s.cashboxMainBlock}>

                <div className={s.cashboxMainBlock_leftSideWrapper}>
                    <div className={s.leftSide_tables}>
                        <Button onClick={() => {}} disabled={!isActiveTable}>
                            Касса 1
                        </Button>
                        <Button onClick={() => {}} disabled={isActiveTable}>
                            Касса 2
                        </Button>
                        <Button onClick={() => {}} disabled={isActiveTable}>
                            Касса 3
                        </Button>
                        <Button onClick={() => {}} disabled={isActiveTable}>
                            Касса 4
                        </Button>
                    </div>

                    <div className={s.leftSide_client}>
                        <ClientCard/>
                        <ChooseClientModal extraCallback={chooseClient}/>
                        <div className={s.leftSide_client_buttons}>
                            <div className={s.client_buttons_choose}>
                                <Button
                                        onClick={() => setChooseClientModal(true)}>
                                    Выбрать клиента
                                </Button>
                            </div>
                            <div className={s.client_buttons_cancel}>
                                <Button onClick={() => {}}>
                                    X
                                </Button>
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
                            <ChooseDiscountModal/>
                            <div className={s.buttons_choose}>
                                <Button onClick={() => setChooseDiscountModal(true)}>
                                    Выбрать скидку для клиента
                                </Button>
                            </div>
                            <div className={s.buttons_cancel}>
                                <Button onClick={() => {}}>
                                    X
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={s.cashboxMainBlock_rightSideWrapper}>
                    <div className={s.cashboxMainBlock_rightSideHeader}>
                        <ChooseProductModal/>
                        <div className={s.header_chooseBtn}>
                            <Button onClick={() => {setChooseProductModal(true)}}>
                                Выбрать товары
                            </Button>
                        </div>
                        <div className={s.header_searchInput}>
                            <InputUI placeholder={'Поиск...'} clearInputValue={() => {}}/>
                        </div>
                    </div>

                    <div className={s.cashboxMainBlock_rightSideMiddle}>
                        Info
                    </div>

                    <div className={s.cashboxMainBlock_rightSideBottom}>
                        <div className={s.rightSideBottom_buttonsBlock}>
                            <div className={s.buttonsBlock_one}>
                                <div className={s.one_cancelBtn}>
                                    <Button onClick={() => {}}>
                                        X
                                    </Button>
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
                            <PayModal/>
                            <Button onClick={() => {setPayModal(true)}}>
                                К оплате
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        // </div>
    );
};

export default Cashbox;
