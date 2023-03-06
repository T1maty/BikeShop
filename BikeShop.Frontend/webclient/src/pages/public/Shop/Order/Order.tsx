import React, {useState, useEffect} from 'react'
import s from './Order.module.scss'
import {Button, ControlledInput} from '../../../../shared/ui';
import {Errors} from '../../../../entities/errors/workspaceErrors';
import {SubmitHandler, useForm} from 'react-hook-form';

export const Order = () => {

    const InputStyles = {
        color: 'black',
        '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
        },
        '.MuiSvgIcon-root ': {
            fill: 'black',
        },
    }
    const InputLabelProps = {style: { color: 'black'}}

    // тестовые данные
    const [order, setOrder] = useState([
        {id: '1', name: 'Merida'},
        {id: '2', name: 'Kona'},
        {id: '3', name: 'Specialized'},
    ])

    // сбор данных с формы //
    const formControl = useForm({
        defaultValues: {
            lastName: '',
            firstName: '',
            patronymic: '',
            phone: '',
            email: '',
        }
    });

    // const onSubmit: SubmitHandler<any> = (data: any) => {
    //     addNewService(data).then((res: any) => {
    //         clearSubmitInfo() // очистка полей
    //         enqueueSnackbar('Ремонт добавлен', {variant: 'success', autoHideDuration: 3000})
    //     }).catch((error: any) => {
    //         let message = error(error.response.data.errorDescription).toString()
    //         formControl.setError('name', {type: 'serverError', message: message})
    //         enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
    //         console.error(error.response.data)
    //     })
    // }

    return (
        <div className={s.order_mainBox}>
            <div className={s.order_title}>Оформление заказа</div>
            <div className={s.order_content}>
                <div className={s.content_form}>
                    <div className={s.form_contacts}>
                        <div className={s.formItem_title}>Контактная информация</div>
                        <div className={s.contacts_items}>
                            <div className={s.contacts_lastName}>
                                <ControlledInput name={'lastName'}
                                                 label={'Фамилия'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                                 sx={InputStyles}
                                                 InputLabelProps={InputLabelProps}
                                />
                            </div>
                            <div className={s.contacts_firstName}>
                                <ControlledInput name={'firstName'}
                                                 label={'Имя'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                                 sx={InputStyles}
                                                 InputLabelProps={InputLabelProps}
                                />
                            </div>
                            <div className={s.contacts_patronymic}>
                                <ControlledInput name={'patronymic'}
                                                 label={'Отчество'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                                 sx={InputStyles}
                                                 InputLabelProps={InputLabelProps}
                                />
                            </div>
                            <div className={s.contacts_phone}>
                                <ControlledInput name={'phone'}
                                                 label={'Телефон'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                                 sx={InputStyles}
                                                 InputLabelProps={InputLabelProps}
                                />
                            </div>
                            <div className={s.contacts_email}>
                                <ControlledInput name={'email'}
                                                 label={'Почта'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                                 sx={InputStyles}
                                                 InputLabelProps={InputLabelProps}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={s.form_order}>
                        <div className={s.formItem_title}>Заказ</div>
                        <div className={s.orderList}>
                            {order.map(item => (
                                <div className={s.order_item} key={item.id}>
                                    {item.name}
                                </div>
                            ))}
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
                                <div>99 товаров на сумму:</div>
                                <div>999</div>
                            </div>
                            <div className={s.price_item}>
                                <div>Доставка:</div>
                                <div>99</div>
                            </div>
                            <hr/>
                            <div className={s.price_item}>
                                <div>К оплате:</div>
                                <div className={s.price_item_total}>9999</div>
                            </div>
                            <hr/>
                            <div className={s.price_confirmButton}>
                                <Button onClick={() => {
                                }}>
                                    Подтвердить заказ
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}