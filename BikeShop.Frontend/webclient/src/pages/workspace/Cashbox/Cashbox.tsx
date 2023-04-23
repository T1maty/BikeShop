import React, {useEffect, useState} from 'react'
import s from './Cashbox.module.scss'
import {ChooseClientModal, ChooseDiscountModal, ChooseProductModal, PayModal} from '../../../features'
import {Button, CustomSearchInput, UniTable} from '../../../shared/ui'
import useChooseClientModal from '../../../features/ChooseClientModal/ChooseClientModalStore'
import useCashboxStore from './CashboxStore'
import {ClientCard} from '../../../widgets'
import {FinancialInteractionAPI, PaymentData, useAuth, User} from '../../../entities'
import {columns} from "./CashboxTableConfig";

export const Cashbox = () => {

    const isActiveTable = true

    const setOpenClientModal = useChooseClientModal(s => s.setOpenClientModal)

    const logUser = useAuth(s => s.user)
    const user = useCashboxStore(s => s.user)
    const setUser = useCashboxStore(s => s.setUser)
    const bill = useCashboxStore(s => s.bill)
    const addProduct = useCashboxStore(s => s.addProduct)
    const setData = useCashboxStore(s => s.setProducts)

    const [open, setOpen] = useState(false)
    const [openPay, setOpenPay] = useState(false)
    const [sum, setSum] = useState(0)


    useEffect(() => {
        let sum = 0;
        bill.products?.forEach(n => {
            console.log('qunt', n.quantity)
            console.log('price', n.price)
            console.log('disc', n.discount)
            sum += (n.quantity * n.price - n.discount)
        })
        setSum(sum)
    }, [bill])

    useEffect(() => {
        setData([])
    }, [])

    const paymentResultHandler = (value: PaymentData) => {
        let res = {...bill, ...value}
        res.userId = logUser != undefined ? logUser.id : ""
        res.description = 'desc'
        res.shopId = 1
        res.currencyId = 1
        console.log(res)
        FinancialInteractionAPI.NewBill.create(res).then((r) => {
            console.log(r)
        })
    }

    const chooseClientHandler = (user: User) => {
        setUser(user)
        setOpenClientModal(false)
    }

    return (
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
                    <ClientCard user={user}/>
                    <ChooseClientModal extraCallback={(user: User) => {chooseClientHandler(user)}}/>
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
                                onClick={() => {}}
                        >
                            Выбрать скидку для клиента
                        </Button>
                        <Button buttonDivWrapper={s.buttons_cancel}
                                onClick={() => {}}
                        >
                            X
                        </Button>
                    </div>
                </div>
            </div>

            <div className={s.cashboxMainBlock_rightSideWrapper}>
                <div className={s.cashboxMainBlock_rightSideHeader}>
                    <ChooseProductModal open={open}
                                        setOpen={setOpen}
                                        setData={setData}
                                        data={bill.products}
                                        slaveColumns={columns}
                    />
                    <Button buttonDivWrapper={s.header_chooseBtn}
                            onClick={() => {setOpen(true)}}
                    >
                        Выбрать товары
                    </Button>
                    <CustomSearchInput placeholder={'Поиск...'} clearInputValue={() => {}}/>
                    {/*<div className={s.header_searchInput}>*/}
                    {/*    <InputUI placeholder={'Поиск...'} clearInputValue={() => {}}/>*/}
                    {/*</div>*/}
                </div>

                <div className={s.cashboxMainBlock_rightSideMiddle}>
                    <UniTable rows={bill.products} columns={columns} setRows={setData}/>
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
                            {sum}
                        </div>
                    </div>
                    <div className={s.rightSideBottom_payBlock}>
                        <PayModal open={openPay}
                                  setOpen={setOpenPay}
                                  summ={sum}
                                  result={paymentResultHandler}
                        />
                        <Button onClick={() => {setOpenPay(true)}}>
                            К оплате
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}