import React from 'react'
import s from './ShopProductItem.module.scss'
import {Button} from "../../../shared/ui";

export const ShopProductItem = () => {
    return (
       <div className={s.shop_productItem_mainBox}>
           <div className={s.cloudCategory}>
               <div className={s.cloudCategory_item}>
                   Категория
               </div>
               <div className={s.cloudCategory_item}>
                   Категория
               </div>
               <div className={s.cloudCategory_item}>
                   Категория
               </div>
               <div className={s.cloudCategory_item}>
                   Категория
               </div>
               <div className={s.cloudCategory_item}>
                   Категория
               </div>
           </div>
           <div className={s.product}>
               <div className={s.product_images}>
                   <img src='https://i.pinimg.com/originals/74/cf/2e/74cf2eb33969be3c522581d9b48e376e.jpg'
                        alt='product-image'
                   />
               </div>
               <div className={s.product_info}>
                   <div className={s.product_title}>Merida</div>
                   <div className={s.product_price}>$ 1350</div>
                   <div className={s.product_description}>
                       Описание товара с ограничением в 7 строк,
                       эта карточка показывает реакцию при наведении курсора на товар.
                       Карточка расширяется с анимашкой и перекрывает карточки ниже,
                       появляется более полное название и частичное описание товара.
                       А так же доступные...
                   </div>
                   <div className={s.product_something}>Тут что-то будет</div>
                   <div className={s.product_something}>Тут что-то будет</div>
                   <div className={s.product_available}>Есть на складе</div>
                   <div className={s.product_addToCart}>
                       <Button onClick={() => {}}>
                           Добавить в корзину
                       </Button>
                   </div>
               </div>
           </div>
           <div className={s.description}>
               <div className={s.description_chapters}>
                   <div>Характеристики</div>
                   <div>Описание</div>
                   <div>Доставка</div>
               </div>
               <div className={s.description_content}>
                   <div>
                       Описание характеристики Давно выяснено, что при оценке дизайна и
                       композиции читаемый текст мешает сосредоточиться. Lorem Ipsum
                       используют потому, что тот обеспечивает более или менее стандартное
                       заполнение шаблона, а также реальное распределение букв и пробелов в
                       абзацах, которое не получается при простой дубликации.
                   </div>
                   {/*<div></div>*/}
                   {/*<div></div>*/}
               </div>
           </div>
       </div>
    );
};