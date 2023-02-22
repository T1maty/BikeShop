import React from 'react';
import s from './Shop.module.scss'
import headerPhoto from '../../../shared/assets/header_photo.png'
import socialLogo from '../../../shared/assets/logo_instagram.png'

const Shop = () => {
    return (
        <div className={s.shop_wrapper}>
            <div className={s.shop_mainBox}>
                <div className={s.header}>
                    <img src={headerPhoto} alt="header-photo"/>
                </div>
                <div className={s.content}>
                    <div className={s.menu}>
                        <div className={s.menu_items}>
                            <div>Каталог</div>
                            <div>Мастерская</div>
                            <div>Фото</div>
                            <div>Контакты</div>
                        </div>
                        <div className={s.menu_social}>
                            <img src={socialLogo} alt="social-logo"/>
                        </div>
                    </div>
                    <div className={s.catalog}>
                        catalog
                    </div>
                </div>
                <div className={s.map}>
                    map
                </div>
                <div className={s.footer}>
                    <div className={s.footer_links}>
                        <div className={s.links_column}>
                            <div className={s.column_title}>
                                Информация
                            </div>
                            <div className={s.column_text}>
                                <div>О нас</div>
                                <div>Сеть магазинов</div>
                                <div>Условия сайта</div>
                            </div>
                        </div>
                        <div className={s.links_column}>
                            <div className={s.column_title}>
                                Как приобрести
                            </div>
                            <div className={s.column_text}>
                                <div>Оплата и доставка</div>
                                <div>Гарантия и возврат</div>
                                <div>Оплатить частями</div>
                            </div>
                        </div>
                        <div className={s.links_column}>
                            <div className={s.column_title}>
                                Аренда велосипедов
                            </div>
                            <div className={s.column_text}>
                                <div>Мероприятия</div>
                            </div>
                        </div>
                        <div className={s.links_column}>
                            <div className={s.column_title}>
                                Бизнес
                            </div>
                            <div className={s.column_text}>
                                <div>Сотрудничество</div>
                                <div>Стать партнёром</div>
                                <div>Кабинет партнёра</div>
                            </div>
                        </div>
                    </div>
                    <div className={s.footer_social}>
                        <img src={socialLogo} alt="footer-social-logo"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;