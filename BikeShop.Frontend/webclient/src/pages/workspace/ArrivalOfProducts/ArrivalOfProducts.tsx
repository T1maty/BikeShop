import React from 'react'
import s from './ArrivalOfProducts.module.scss'
import {Button, InputUI} from '../../../shared/ui'

export const ArrivalOfProducts = () => {

    return (
        <div className={s.arrivalOfProducts_mainBlock}>
            <div className={s.arrivalOfProducts_leftSide}>
               <div className={s.leftSide_title}>Новый акт прихода товара</div>
               <div className={s.leftSide_uploadFile}>
                   <input type="file"/>
               </div>
               <div className={s.leftSide_info}>Дополнительная информация</div>
               <Button buttonDivWrapper={s.button_chooseItem} onClick={() => {}}>
                   Выбрать товар
               </Button>
               <div className={s.leftSide_delivery}>
                   <div>Доставка</div>
                   <div>Расходы</div>
               </div>
               <div className={s.leftSide_metrika}>
                   <div className={s.metrika_title}>Метрика:</div>
                   <div>Позиций: 999</div>
                   <div>Товаров: 999</div>
                   <div>Приходная сумма: 99999</div>
                   <div>Расходы: 99</div>
                   <div>Итого: 99999999</div>
               </div>
               <div className={s.leftSide_footerButtons}>
                   <Button buttonDivWrapper={s.button_save} onClick={() => {}}>
                       Сохранить акт
                   </Button>
                   <Button buttonDivWrapper={s.button_cancel} onClick={() => {}}>
                       Отмена
                   </Button>
               </div>
            </div>
            <div className={s.arrivalOfProducts_rightSide}>
                2
            </div>
        </div>
    );
};