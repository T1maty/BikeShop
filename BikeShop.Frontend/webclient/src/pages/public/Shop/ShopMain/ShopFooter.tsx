import React from 'react'
import s from "./ShopFooter.module.scss";
import socialLogoWhite from "../../../../shared/assets/shop/icons/logo_instagram-white.png";

export const ShopFooter = () => {
    return (
       <div className={s.shop_footer}>
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
    );
};