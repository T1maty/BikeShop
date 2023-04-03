import React, {useState, useEffect} from 'react'
import s from './ProfileOrders.module.scss'
import {Button, ControlledCustomInput} from '../../../../shared/ui'
import {useForm} from 'react-hook-form'

type ProfileOrderStatusEng = 'WaitingPayment' | 'WaitingPackage' | 'Ready' | 'Canceled'
type ProfileOrderStatusRu = 'Ожидает оплаты' | 'Ожидает комплектации' | 'Готов к выдаче' | 'Отменён'

export const ProfileOrders = () => {

    // тестовые данные
    const img01 = 'https://wallpapercave.com/wp/wp2118883.jpg'
    const img02 = 'https://i.pinimg.com/originals/74/cf/2e/74cf2eb33969be3c522581d9b48e376e.jpg'
    const img03 = 'https://i.pinimg.com/originals/8c/ef/90/8cef90ae85a3276e873ba89b21ff34e1.jpg'
    const img04 = 'https://i.pinimg.com/originals/c8/43/33/c8433307705031e7514bfd3d46cb0629.jpg'

    // тестовые данные
    const [items, setItems] = useState([
        {
            id: '1', status: 'Ожидает комплектации', sum: 999, isPay: true, isCollapsed: false,
            products: [{id: '1', product: 'Merida', img: img01}]
        },
        {
            id: '2', status: 'Ожидает оплаты', sum: 1999, isPay: false, isCollapsed: false,
            products: [{id: '2', product: 'Specialized Pro', img: img02}]
        },
        {
            id: '3', status: 'Готов к выдаче', sum: 99, isPay: true, isCollapsed: false,
            products: [{id: '3', product: 'Sram', img: img03}]
        },
        {
            id: '4', status: 'Отменён', sum: 99999, isPay: false, isCollapsed: false,
            products: [{id: '4', product: 'Shimano', img: img04}, {id: '5', product: 'Author', img: img01}]
        },
    ])

    // сбор данных с формы //
    const formControl = useForm({
        defaultValues: {
            lastName: '',
            firstName: '',
            patronymic: '',
        }
    });

    // const onSubmit: SubmitHandler<any> = (data: any) => {

    // }

    const collapseItem = (currentItemId: string) => {
        setItems(items.map(el => el.id === currentItemId ? {...el, isCollapsed: !el.isCollapsed} : el))
    }

    return (
        <div className={s.profileOrders_mainBox}>
            <div className={s.profileOrders_title}>Мои заказы</div>
            <div className={s.profileOrders_content}>
                {
                    items.map((item: any) => {
                        return (
                            <div className={s.profileOrders_orderItem} key={item.id}>

                                <div className={s.orderItem_mainPart}>
                                    <div className={s.orderItem_status}>
                                        <div className={
                                            // s.status_color
                                            item.status === 'Ожидает оплаты' ? s.status_WaitingPayment :
                                                item.status === 'Ожидает комплектации' ? s.status_WaitingPackage :
                                                    item.status === 'Готов к выдаче' ? s.status_Ready :
                                                        item.status === 'Отменён' ? s.status_Canceled : ''
                                        }>
                                            i
                                        </div>
                                        <div className={s.status_data}>
                                            <div className={s.status_data_date}>№999 от 1 января 2023 года</div>
                                            <div className={s.status_data_text}>{item.status}</div>
                                        </div>
                                    </div>
                                    <div className={s.orderItem_sum}>
                                        <div className={s.sum_price}>Сумма: {item.sum}</div>
                                        <div className={s.sum_result}>
                                            Оплата: <span>{item.isPay ? 'Оплачено' : 'Не оплачено'}</span>
                                        </div>
                                    </div>
                                    <div className={s.orderItem_info}>
                                        <div className={s.info_image}>
                                            <img src={item.products[0].img} alt='order-photo'/>
                                        </div>
                                        <div className={s.info_isCollapsed}>
                                            <Button onClick={() => {collapseItem(item.id)}}>
                                                {item.isCollapsed ? 'Свернуть <' : 'Развернуть >'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                {
                                    item.isCollapsed ?
                                        <div className={s.orderItem_collapsedPart}>

                                            {
                                                item.status === 'Ожидает оплаты' ?
                                                    <div className={s.collapsedPart_statusRow}>
                                                        Ожидаем вашу оплату, заказ будет обработан после оплаты
                                                    </div>
                                                    : ''
                                            }

                                            <div className={s.collapsedPart_title}>Информация о заказе:</div>
                                            <div className={s.collapsedPart_deliveryType}>Способ получения: доставка</div>
                                            <div className={s.collapsedPart_deliveryDetails}>
                                                <div>
                                                    <ControlledCustomInput name={'delivery-company'}
                                                                           placeholder={'Грузовая'}
                                                                           control={formControl}
                                                                           color={'black'}
                                                                           // rules={{required: Errors[0].name}}
                                                    />
                                                </div>
                                                <div>
                                                    <ControlledCustomInput name={'post-type'}
                                                                           placeholder={'Почта'}
                                                                           control={formControl}
                                                                           color={'black'}
                                                                           // rules={{required: Errors[0].name}}
                                                    />
                                                </div>
                                                <div>
                                                    <ControlledCustomInput name={'post-type'}
                                                                           placeholder={'Почта'}
                                                                           control={formControl}
                                                                           color={'black'}
                                                                           // rules={{required: Errors[0].name}}
                                                    />
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className={s.collapsedPart_discount}>Скидка: не выбрана</div>
                                            <hr/>
                                            <div className={s.collapsedPart_products}>
                                                <div className={s.products_title}>Товары:</div>
                                                <div className={s.products_list}>
                                                    {
                                                        item.products.map((p: any) => {
                                                            return (
                                                                <div className={s.list_item} key={p.id}>
                                                                    {p.product}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className={s.collapsedPart_sum}>
                                                <div>Сумма: 999</div>
                                                <div>Скидка: 1%</div>
                                                <div>К оплате: 990</div>
                                            </div>
                                        </div>
                                        : ''
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}