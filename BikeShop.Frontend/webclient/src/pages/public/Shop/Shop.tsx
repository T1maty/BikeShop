import React from 'react'
import s from './Shop.module.scss'
import headerPhoto from '../../../shared/assets/header_photo.png'
import socialLogo from '../../../shared/assets/logo_instagram.png'
import socialLogoWhite from '../../../shared/assets/logo_instagram-white.png'
import catalogBikes from '../../../shared/assets/catalog-bikes.png'
import catalogProtection from '../../../shared/assets/catalog-protection.png'
import catalogSpares from '../../../shared/assets/catalog-spares.png'
import catalogClothes from '../../../shared/assets/catalog-clothes.png'
import catalogChemistry from '../../../shared/assets/catalog-chemistry.png'
import catalogAccessories from '../../../shared/assets/catalog-accessories.png'
import catalogFood from '../../../shared/assets/catalog-food.png'
import map from '../../../shared/assets/map-01.png'

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
                        <div className={s.catalog_group1}>
                            <div className={s.catalog_item1}>
                                <img src={catalogBikes} alt="catalog-bikes"/>
                            </div>
                            <div className={s.catalog_item2}>
                                <img src={catalogProtection} alt="catalog-protection"/>
                            </div>
                            <div className={s.catalog_item3}>
                                <img src={catalogSpares} alt="catalog-spares"/>
                            </div>
                            <div className={s.catalog_item4}>
                                <img src={catalogClothes} alt="catalog-clothes"/>
                            </div>
                            <div className={s.catalog_item5}>
                                <img src={catalogChemistry} alt="catalog-chemistry"/>
                            </div>
                        </div>
                        <div className={s.catalog_group2}>
                            <div className={s.catalog_item}>
                                <img src={catalogAccessories} alt="catalog-accessories"/>
                            </div>
                            <div className={s.catalog_item}>
                                <img src={catalogFood} alt="catalog-food"/>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={s.map}>
                    <img src={map} alt="map"/>
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
                        <img src={socialLogoWhite} alt="footer-social-logo"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;