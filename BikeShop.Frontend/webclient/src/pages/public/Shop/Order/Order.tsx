import React, {useState, useEffect} from 'react'
import s from './Order.module.scss'
import {Button, ControlledCustomInput} from '../../../../shared/ui'
import {Errors} from '../../../../entities/errors/workspaceErrors'
import {SubmitHandler, useForm} from 'react-hook-form'
import useShoppingCart from '../ShoppingCart/ShoppingCartStore'
import { useNavigate } from 'react-router-dom'
import { useComponentVisible } from 'shared/hooks/useComponentVisible'
import ClientSearchModal from 'features/ClientSearchModal/ClientSearchModal'

export const Order = () => {

    const navigate = useNavigate()
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)


    const cartProducts = useShoppingCart(s => s.cartProducts)
    const shoppingCartSum = useShoppingCart(s => s.shoppingCartSum)

    // тестовые данные
    const [order, setOrder] = useState([
        {id: '1', name: 'Merida'},
        {id: '2', name: 'Kona'},
        {id: '3', name: 'Specialized'},
    ])

    const formControl = useForm({
        defaultValues: {
            lastName: '',
            firstName: '',
            patronymic: '',
            phone: '',
            email: '',
        }
    });

    const onSubmit: SubmitHandler<any> = (data: any) => {
        //
    }

    const handleSuccessChoise = (phone: string) => {
        console.log('You have choose the user with number ' + `${phone}`)
    }

    return (
        <div className={s.order_mainBox}>
            <div className={s.container}>

                <div className={s.order_title}>Оформление заказа</div>
                <div className={s.order_content}>
                    <div className={s.content_form}>
                        <div className={s.form_contacts}>
                            <div className={s.formItem_title}>Контактная информация</div>
                            <div className={s.contacts_items}>
                                <div className={s.contacts_lastName}>
                                    <ControlledCustomInput name={'lastName'}
                                                           placeholder={'Фамилия'}
                                                           color={'black'}
                                                           control={formControl}
                                                           rules={{required: Errors[0].name}}
                                    />
                                </div>
                                <div className={s.contacts_firstName}>
                                    <ControlledCustomInput name={'firstName'}
                                                           placeholder={'Имя'}
                                                           color={'black'}
                                                           control={formControl}
                                                           rules={{required: Errors[0].name}}
                                    />
                                </div>
                                <div className={s.contacts_patronymic}>
                                    <ControlledCustomInput name={'patronymic'}
                                                           placeholder={'Отчество'}
                                                           color={'black'}
                                                           control={formControl}
                                                           rules={{required: Errors[0].name}}
                                    />
                                </div>
                                <div className={s.contacts_phone}>
                                    <ControlledCustomInput name={'phone'}
                                                           placeholder={'Телефон'}
                                                           color={'black'}
                                                           control={formControl}
                                                           rules={{required: Errors[0].name}}
                                    />
                                </div>
                                <div className={s.contacts_email}>
                                    <ControlledCustomInput name={'email'}
                                                           placeholder={'Почта'}
                                                           color={'black'}
                                                           control={formControl}
                                                           rules={{required: Errors[0].name}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={s.form_order}>
                            <div className={s.formItem_title}>Заказ</div>
                            <div className={s.orderList}>
                                {
                                    order.map(item => (
                                        <div className={s.order_item} key={item.id}>
                                            {item.name}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={s.form_delivery}>
                            <div className={s.formItem_title}>Доставка</div>
                            <div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className={s.content_info}>
                        <div className={s.info_discount}>
                            <div className={s.discount_title}>Скидка</div>
                            <div className={s.discount_button}>Выбрать</div>
                        </div>
                        <div className={s.info_account}>
                            <div className={s.account_title}>Аккаунт</div>
                            <div className={s.account_name}>Петров Василий Иванович</div>
                            <div className={s.account_balance}>Баланс: 0</div>
                            <div className={s.account_limit}>Кредитный лимит: 0</div>
                        </div>
                        <div className={s.info_result}>
                            <div className={s.result_title}>Итого</div>
                            <div className={s.result_price}>
                                <div className={s.price_item}>
                                    <div>{cartProducts.length} товаров на сумму:</div>
                                    <div>{shoppingCartSum}</div>
                                </div>
                                <div className={s.price_item}>
                                    <div>Доставка:</div>
                                    <div>99</div>
                                </div>
                                <hr/>
                                <div className={s.price_item}>
                                    <div>К оплате:</div>
                                    <div className={s.price_item_total}>{shoppingCartSum + 0}</div>
                                </div>
                                <hr/>
                                {isComponentVisible ?
                                    <ClientSearchModal setIsComponentVisible={setIsComponentVisible} onSuccess={handleSuccessChoise}/> : 
                                    <div className={s.price_confirmButton}>
                                        <Button onClick={() => {
                                            setIsComponentVisible(true)
                                        }}>
                                            Подтвердить заказ
                                        </Button>
                                    </div>    
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}