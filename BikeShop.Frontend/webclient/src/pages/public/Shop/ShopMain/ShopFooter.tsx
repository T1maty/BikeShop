import React from 'react'
import s from "./ShopFooter.module.scss"
import socialLogoWhite from "../../../../shared/assets/shop/icons/logo_instagram-white.png"

export const ShopFooter = () => {
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
                                <div>Условия сайта</div>
                                <div>О нас</div>
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
                                <div>Оплатить частями</div>
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