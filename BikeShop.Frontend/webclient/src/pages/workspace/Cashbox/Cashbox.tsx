import React, {useEffect, useState} from 'react'
import s from './Cashbox.module.scss'
import {ChooseClientModal, ChooseDiscountModal, ChooseProductModal, PayModal, PrintModal} from '../../../features'
import {Button, UniTable} from '../../../shared/ui'
import useChooseClientModal from '../../../features/ChooseClientModal/ChooseClientModalStore'
import useCashboxStore from './CashboxStore'
import {CheckForShop, ClientCard} from '../../../widgets'
import {
    BillWithProducts,
    CatalogAPI,
    FinancialInteractionAPI,
    PaymentData,
    Product,
    useAuth,
    useCurrency,
    User
} from '../../../entities'
import {columns} from "./CashboxTableConfig"
import {BillProductDTO} from "./models/BillProductDTO"
import Enumerable from "linq"
import AsyncSelect from "react-select/async"
import {useSnackbar} from "notistack"

export const Cashbox = () => {

    const isActiveTable = true
    const {enqueueSnackbar} = useSnackbar()

    const setOpenClientModal = useChooseClientModal(s => s.setOpenClientModal)

    const logUser = useAuth(s => s.user)
    const user = useCashboxStore(s => s.user)
    const setUser = useCashboxStore(s => s.setUser)
    const bill = useCashboxStore(s => s.bill)
    const addProduct = useCashboxStore(s => s.addProduct)
    const setData = useCashboxStore(s => s.setProducts)

    const [open, setOpen] = useState(false)
    const [openPrint, setOpenPrint] = useState(false)
    const [openPay, setOpenPay] = useState(false)
    const [sum, setSum] = useState(0)
    const [res, setRes] = useState<BillWithProducts>()

    const baseToS = useCurrency(s => s.fromBaseToSelected)

    const chooseClientHandler = (user: User) => {
        setUser(user)
        setOpenClientModal(false)
    }

    const loadOptions = (inputValue: string, callback: (value: Product[]) => void) => {
        CatalogAPI.searchProductByName(inputValue).then((resp) => {
            const asyncOptions = resp.data.map((n: Product) => {
                return ({label: n.name, value: n.id})
            })
            console.log(asyncOptions)
            callback(resp.data)
        }).catch((r) => {
            console.log('searchError', r)
        })
    }

    const paymentResultHandler = (value: PaymentData) => {
        let res = {...bill, ...value}
        res.userId = logUser != undefined ? logUser.id : ""
        res.description = 'desc'
        res.shopId = 1
        res.currencyId = 1
        console.log(res)

        FinancialInteractionAPI.NewBill.create(res).then((r) => {
            enqueueSnackbar('Товар продан!', {variant: 'success', autoHideDuration: 3000})
            setRes(r.data)
            console.log(r)
            setOpenPrint(true)
            setData([])
        })
    }

    const addProductHandler = (n: Product) => {
        let exProd = Enumerable.from(bill.products)
            .where(m => m.productId === n.id)
            .firstOrDefault()

        if (exProd !== undefined) {
            setData(bill.products.map((m) => {
                if (m.productId === n.id) {
                    return {...m, quantity: m.quantity + 1}
                } else {
                    return m
                }
            }))
        } else {
            let newProd: BillProductDTO = {
                productId: n.id,
                name: n.name,
                catalogKey: n.catalogKey,
                serialNumber: '',
                description: '',
                quantity: 1,
                quantityUnitName: "123",
                currencySymbol: "123",
                price: n.retailPrice,
                discount: 0,
                total: n.retailPrice
            }
            console.log('selectedProd', n)
            setData([...bill.products, newProd])
        }
    }

    useEffect(() => {
        let sum = 0

        bill.products?.forEach(n => {
            console.log('qty', n.quantity)
            console.log('price', n.price)
            console.log('discount', n.discount)
            sum += (n.quantity * n.price - n.discount)
        })
        setSum(sum)
    }, [bill])

    useEffect(() => {
        setData([])
    }, [])

    return (
        <div className={s.cashboxMainBlock}>

            <PrintModal open={openPrint} setOpen={setOpenPrint}><CheckForShop children={res!}/></PrintModal>

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
                    <ChooseClientModal extraCallback={(user: User) => {
                        chooseClientHandler(user)
                    }}/>

                    <ClientCard user={user}/>
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
                                onClick={() => {
                                }}
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
                    <ChooseProductModal open={open}
                                        setOpen={setOpen}
                                        addData={addProductHandler}
                                        data={bill.products}
                                        slaveColumns={columns}
                    />

                    <Button buttonDivWrapper={s.header_chooseBtn}
                            onClick={() => {
                                setOpen(true)
                            }}
                    >
                        Выбрать товары
                    </Button>
                    <div className={s.header_searchSelect}>
                        <AsyncSelect
                            cacheOptions
                            defaultOptions
                            isClearable
                            value={null}
                            loadOptions={loadOptions}
                            onChange={(r) => {
                                addProductHandler(r as Product)
                                console.log('selected', r)
                            }}
                            getOptionLabel={label => label!.id + ' | ' + label!.name + ' | ' + label!.catalogKey}
                            getOptionValue={value => value!.name}
                            placeholder={'Поиск'}
                            noOptionsMessage={() => 'Товар не найден'}
                        />
                    </div>
                </div>

                <div className={s.cashboxMainBlock_rightSideMiddle}>
                    <UniTable rows={bill.products} columns={columns} setRows={setData}/>
                </div>

                <div className={s.cashboxMainBlock_rightSideBottom}>
                    <div className={s.rightSideBottom_buttonsBlock}>
                        <div className={s.buttonsBlock_one}>
                            <div className={s.one_cancelBtn}>
                                <Button onClick={() => {
                                    setData([])
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
                            {baseToS(sum).res + baseToS(sum).s}
                        </div>
                    </div>
                    <div className={s.rightSideBottom_payBlock}>
                        <PayModal open={openPay}
                                  setOpen={setOpenPay}
                                  summ={sum}
                                  result={paymentResultHandler}
                        />
                        <Button onClick={() => {
                            setOpenPay(true)
                        }}>
                            К оплате
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}