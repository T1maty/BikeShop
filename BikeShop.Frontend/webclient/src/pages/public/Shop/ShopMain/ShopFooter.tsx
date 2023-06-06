import React from 'react'
import s from "./ShopFooter.module.scss"
import {useNavigate} from "react-router-dom";
import {BikeShopPaths} from "../../../../app/routes/paths";
import visa from '../../../../shared/assets/shop/icons/visa.svg'
import mastercard from '../../../../shared/assets/shop/icons/mastercard.svg'

export const ShopFooter = () => {
    const navigate = useNavigate();
    return (
        <div className={s.shop_footer}>
            <div className={s.container}>

                <div className={s.footer_body}>
                    <div className={s.links_column}>
                        <div className={s.links_item}>
                            <div className={s.item_title}>
                                Информация
                            </div>
                            <div className={s.item_text}>
                                <div>Сеть магазинов</div>
                                <div onClick={() => {
                                    navigate(BikeShopPaths.SHOP.DELIVERY_INFO)
                                }}>Доставка, оплата та повернення
                                </div>
                                <div onClick={() => {
                                    navigate(BikeShopPaths.SHOP.ABOUT_US)
                                }}>О нас
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.links_column}>
                        <div className={s.links_item}>
                            <div className={s.item_title}>
                                Как приобрести
                            </div>
                            <div className={s.item_text}>
                                <div>Оплата и доставка</div>
                                <div>Гарантия и возврат</div>
                                <div onClick={() => {
                                    navigate(BikeShopPaths.SHOP.PUBLIC_OFFER)
                                }}>Договір публічної оферти
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.links_column}>
                        <div className={s.links_item}>
                            <div className={s.item_title}>
                                Аренда велосипедов
                            </div>
                            <div className={s.item_text}>
                                <div>Мероприятия</div>
                            </div>
                            <img className={s.visa} src={visa} alt={"Visa"}/>
                            <img className={s.mastercard} src={mastercard} alt={"Mastercard"}/>
                        </div>
                    </div>
                    <div className={s.links_column}>
                        <div className={s.links_item}>
                            <div className={s.item_title}>
                                Бизнес
                            </div>
                            <div className={s.item_text}>
                                <div>Сотрудничество</div>
                                <div>Стать партнёром</div>
                                <div>Кабинет партнёра</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}