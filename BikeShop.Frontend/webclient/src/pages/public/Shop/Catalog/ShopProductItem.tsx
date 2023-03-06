import React, {useState, useEffect} from 'react'
import s from './ShopProductItem.module.scss'
import {Button} from "../../../../shared/ui";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {UserResponse} from "../../../../entities";

// type DescriptionViewType = 'Characteristic' | 'Details' | 'Delivery'

export const ShopProductItem = () => {

    // const [descriptionView, setDescriptionView] = useState<DescriptionViewType>('Characteristic')
    const [isCharacteristic, setIsCharacteristic] = useState<boolean>(true)
    const [isDetails, setIsDetails] = useState<boolean>(false)
    const [isDelivery, setIsDelivery] = useState<boolean>(false)

    // тестовые данные
    const [products, setProducts] = useState(['Велосипед-1', 'Велосипед-2', 'Велосипед-3'])
    const amountOfProduct = 10

    const setDescriptionHandler = (/*descriptionTitle: DescriptionViewType,*/ isCharacteristic: boolean,
                                   isDetails: boolean, isDelivery: boolean) => {

        // setDescriptionView(descriptionTitle)
        setIsCharacteristic(isCharacteristic)
        setIsDetails(isDetails)
        setIsDelivery(isDelivery)
    }

    const onChangeMUISelectHandler = (event: SelectChangeEvent) => {
        // setCurrentMasterId(event.target.value as string)
        console.log('клик по селекту товара', event.target.value)
    }

    // useEffect(() => {
    //     // setIsCharacteristic(true)
    // }, [])

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
                   <div className={s.product_select}>
                       <FormControl fullWidth>
                           <InputLabel id="product-select-label" style={{color: 'black'}}>Модель</InputLabel>
                           <Select
                               labelId="product-select-label"
                               id="product-select"
                               name={'productSelect'}
                               value={'Велосипед-1'}
                               label="productSelect"
                               onChange={onChangeMUISelectHandler}

                               sx={{
                                   color: "black",
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
                                   }
                               }}
                           >
                               {
                                   products.map((p: any) => {
                                       return (
                                           <MenuItem key={p} value={p}>
                                               {p}
                                           </MenuItem>
                                       )
                                   })
                               }
                           </Select>
                       </FormControl>
                   </div>
                   <div className={s.product_buy}>
                       <div className={s.product_available}>
                           {
                               amountOfProduct > 0 ?
                                   <div className={s.isAvailable}>Есть на складе</div>
                                   : <div className={s.notAvailable}>Товар закончился</div>
                           }

                       </div>
                       <div className={s.product_addToCart}>
                           <Button onClick={() => {}}>
                               Добавить в корзину
                           </Button>
                       </div>
                   </div>

               </div>
           </div>
           <div className={s.description}>
               <div className={s.description_chapters}>
                   <div className={isCharacteristic ? s.description_active : s.chapters_characteristic}
                        onClick={() => {setDescriptionHandler(true, false, false)}}
                   >
                       Характеристики
                   </div>
                   <div className={isDetails ? s.description_active : s.chapters_details}
                        onClick={() => {setDescriptionHandler(false, true, false)}}
                   >
                       Описание
                   </div>
                   <div className={isDelivery ? s.description_active : s.chapters_delivery}
                        onClick={() => {setDescriptionHandler(false, false, true)}}
                   >
                       Доставка
                   </div>
               </div>
               <div className={s.description_content}>
                   {
                       isCharacteristic ?
                       <div>
                           Описание характеристики Давно выяснено, что при оценке дизайна и
                           композиции читаемый текст мешает сосредоточиться. Lorem Ipsum
                           используют потому, что тот обеспечивает более или менее стандартное
                           заполнение шаблона, а также реальное распределение букв и пробелов в
                           абзацах, которое не получается при простой дубликации.
                       </div>
                           : ''
                   }

                   {
                       isDetails ? <div>Описание</div> : ''
                   }

                   {
                       isDelivery ? <div>Доставка</div> : ''
                   }
               </div>
           </div>
       </div>
    );
};