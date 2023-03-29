import React from 'react'
import s from './Cashbox.module.scss'
import {ChooseClientModal, ChooseDiscountModal, ChooseProductModal, PayModal} from '../../../features'
import {Button, CustomSearchInput, UniTable} from '../../../shared/ui'
import useChooseClientModal from '../../../features/ChooseClientModal/ChooseClientModalStore'
import useChooseDiscountModal from '../../../features/ChooseDiscountModal/ChooseDiscountModalStore'
import usePayModal from '../../../features/PayModal/PayModalStore'
import useChooseProductModal from '../../../features/ChooseProductModal/ChooseProductModalStore'
import useCashboxStore from './CashboxStore'
import {ClientCard} from '../../../widgets'
import {User} from '../../../entities'
import {columns} from "./CashboxTableConfig";

export const Cashbox = () => {

    const isActiveTable = true

    const setOpenClientModal = useChooseClientModal(s => s.setOpenClientModal)
    const setOpenDiscountModal = useChooseDiscountModal(s => s.setOpenDiscountModal)
    const setOpenProductModal = useChooseProductModal(s => s.setOpenProductModal)
    const setOpenPayModal = usePayModal(s => s.setOpenPayModal)

    const user = useCashboxStore(s => s.user)
    const setUser = useCashboxStore(s => s.setUser)

    const chooseClientHandler = (user: User) => {
        setUser(user)
        setOpenClientModal(false)
        console.log('Cashbox click user', user)
    }

    return (
        // <div className={s.cashboxWrapper}>
        <div className={s.cashboxMainBlock}>
            <div className={s.cashboxMainBlock_leftSideWrapper}>
                <div className={s.leftSide_tables}>
                    <Button onClick={() => {
                    }} disabled={!isActiveTable}>
                        Касса 1
                    </Button>
                    <Button onClick={() => {
                    }} disabled={isActiveTable}>
                        Касса 2
                    </Button>
                    <Button onClick={() => {
                    }} disabled={isActiveTable}>
                        Касса 3
                    </Button>
                    <Button onClick={() => {
                    }} disabled={isActiveTable}>
                        Касса 4
                    </Button>
                </div>

                <div className={s.leftSide_client}>
                    <ClientCard user={user}/>
                    <ChooseClientModal extraCallback={(user: User) => {
                        chooseClientHandler(user)
                    }}/>
                    <div className={s.leftSide_client_buttons}>
                        <Button buttonDivWrapper={s.client_buttons_choose}
                                onClick={() => setOpenClientModal(true)}
                        >
                            Выбрать клиента
                        </Button>
                        <Button buttonDivWrapper={s.client_buttons_cancel}
                                onClick={() => {
                                }}
                        >
                            X
                        </Button>
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
                        <Button buttonDivWrapper={s.buttons_choose}
                                onClick={() => setOpenDiscountModal(true)}
                        >
                            Выбрать скидку для клиента
                        </Button>
                        <Button buttonDivWrapper={s.buttons_cancel}
                                onClick={() => {
                                }}
                        >
                            X
                        </Button>
                    </div>
                </div>
            </div>

            <div className={s.cashboxMainBlock_rightSideWrapper}>
                <div className={s.cashboxMainBlock_rightSideHeader}>
                    <ChooseProductModal/>
                    <Button buttonDivWrapper={s.header_chooseBtn}
                            onClick={() => {
                                setOpenProductModal(true)
                            }}
                    >
                        Выбрать товары
                    </Button>
                    <CustomSearchInput placeholder={'Поиск...'} clearInputValue={() => {
                    }}/>
                    {/*<div className={s.header_searchInput}>*/}
                    {/*    <InputUI placeholder={'Поиск...'} clearInputValue={() => {}}/>*/}
                    {/*</div>*/}
                </div>

                <div className={s.cashboxMainBlock_rightSideMiddle}>
                    <UniTable rows={[]} columns={columns}/>
                </div>

                <div className={s.cashboxMainBlock_rightSideBottom}>
                    <div className={s.rightSideBottom_buttonsBlock}>
                        <div className={s.buttonsBlock_one}>
                            <div className={s.one_cancelBtn}>
                                <Button onClick={() => {
                                }}>
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
                        <Button onClick={() => {
                            setOpenPayModal(true)
                        }}>
                            К оплате
                        </Button>
                    </div>
                </div>
            </div>

        </div>
        // </div>
    )
}