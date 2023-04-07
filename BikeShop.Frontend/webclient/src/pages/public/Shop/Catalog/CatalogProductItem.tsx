import React, {useState, useEffect} from 'react'
import s from './CatalogProductItem.module.scss'
import parse from 'html-react-parser'
import {useNavigate, useParams, useSearchParams} from 'react-router-dom'
import {Button, ControlledReactSelect, LoaderScreenForShop} from '../../../../shared/ui'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import NoProductImage from "../../../../shared/assets/shop/icons/bicycle-02.svg"
import SorryNoImage from "../../../../shared/assets/shop/images/sorryNoImage.jpg"
import {useForm} from "react-hook-form"
import Select from "react-select"
import useCatalog from './CatalogStore'
import ShopLoaderScreen from '../../../../shared/assets/shop/icons/isLoadingBikeShop-03.gif'
import {useSnackbar} from 'notistack'

// type DescriptionViewType = 'Characteristic' | 'Details' | 'Delivery'

export const CatalogProductItem = () => {

    // const params = useParams()

    const isLoading = useCatalog(s => s.isLoading)
    const currentProduct = useCatalog(s => s.currentProduct)

    // вид отображения
    // const [descriptionView, setDescriptionView] = useState<DescriptionViewType>('Characteristic')

    // для стилей описания
    const [isCharacteristic, setIsCharacteristic] = useState<boolean>(true)
    const [isDetails, setIsDetails] = useState<boolean>(false)
    const [isDelivery, setIsDelivery] = useState<boolean>(false)

    // тестовые данные
    const amountOfProduct = 10 // есть ли на складе

    const [selectedProduct, setSelectedProduct] = useState<any>()
    const [products, setProducts] = useState(['Велосипед-1', 'Велосипед-2', 'Велосипед-3'])

    const [images, setImages] = useState([
        {
            original: 'https://wallpapercave.com/wp/wp2118883.jpg',
            thumbnail: 'https://wallpapercave.com/wp/wp2118883.jpg',
            // thumbnail: 'https://i.pinimg.com/736x/ea/37/bb/ea37bb261a973425d867b2bcb156861d--bike-wallpaper-super-bikes.jpg',
        },
        {
            original: 'https://i.pinimg.com/736x/74/cf/2e/74cf2eb33969be3c522581d9b48e376e.jpg',
            thumbnail: 'https://i.pinimg.com/736x/74/cf/2e/74cf2eb33969be3c522581d9b48e376e.jpg',
        },
        {
            original: 'https://i.pinimg.com/736x/a1/73/82/a1738256e54b5aa431b646967257c1e9--red-bull-world-cup.jpg',
            thumbnail: 'https://i.pinimg.com/736x/a1/73/82/a1738256e54b5aa431b646967257c1e9--red-bull-world-cup.jpg',
        },
        {
            original: 'https://i.pinimg.com/736x/37/cb/da/37cbda77cb69ad92ada1c6fc58c5bca0--mtb-downhill-mountainbiking.jpg',
            thumbnail: 'https://i.pinimg.com/736x/37/cb/da/37cbda77cb69ad92ada1c6fc58c5bca0--mtb-downhill-mountainbiking.jpg',
        },
        {
            original: 'https://ep1.pinkbike.org/p4pb15005029/p4pb15005029.jpg',
            thumbnail: 'https://ep1.pinkbike.org/p4pb15005029/p4pb15005029.jpg',
        },
        {
            original: 'https://twentysix.ru/uploads/images/00/05/02/2016/10/12/c81810e528.jpg',
            thumbnail: 'https://twentysix.ru/uploads/images/00/05/02/2016/10/12/c81810e528.jpg',
        },
    ])

    // если нет изображений, чтобы не ломалась вёрстка
    const [noImages, setNoImages] = useState([
        {
            original: SorryNoImage,
            thumbnail: SorryNoImage,
        },
    ])

    // const formControl = useForm<any>({
    //     defaultValues: {
    //         currentProduct: {} as CatalogProductItemType,
    //     }
    // })

    // для выбора раздела описания
    const setDescriptionHandler = (/*descriptionTitle: DescriptionViewType,*/ isCharacteristic: boolean,
                                   isDetails: boolean, isDelivery: boolean) => {

        // setDescriptionView(descriptionTitle)
        setIsCharacteristic(isCharacteristic)
        setIsDetails(isDetails)
        setIsDelivery(isDelivery)
    }

    // const onChangeMUISelectHandler = (event: SelectChangeEvent) => {
    //     // setCurrentMasterId(event.target.value as string)
    //     console.log('клик по селекту товара', event.target.value)
    // }

    if (isLoading) {
        return <LoaderScreenForShop image={ShopLoaderScreen}/>
    } else {

        return (currentProduct &&
            <div className={s.shop_productItem_mainBox}>
                <div className={s.cloudCategory}>
                    {
                        currentProduct.productTags.map(tag => {
                            return (
                                <div key={tag.id} className={s.cloudCategory_item}>
                                    {tag.name}
                                </div>
                            )
                        })
                    }
                </div>
                <div className={s.product}>
                    {/*<div className={s.product_images}>*/}
                    {/*    <img src='https://i.pinimg.com/originals/74/cf/2e/74cf2eb33969be3c522581d9b48e376e.jpg'*/}
                    {/*         alt='product-image'*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className={s.product_images}>
                        <ImageGallery items={images.length > 0 ? images : noImages}
                                      // items={currentProduct.productImages}
                                      showPlayButton={false}
                            // showFullscreenButton={false}
                                      showIndex={true}
                                      showNav={false}
                                      thumbnailPosition={'left'}
                                      onErrorImageURL={SorryNoImage}
                            // additionalClass={s.imageGallery}
                        />
                    </div>
                    <div className={s.product_info}>
                        <div className={s.product_title}>{currentProduct.product.name}</div>
                        <div className={s.product_price}>{currentProduct.product.retailPrice}</div>
                        <div className={s.product_description}>
                            {currentProduct.productCard.descriptionShort}

                            {/*Описание товара с ограничением в 7 строк.*/}
                            {/*Эта карточка показывает реакцию при наведении курсора на товар.*/}
                            {/*Карточка расширяется с анимашкой и перекрывает карточки ниже,*/}
                            {/*появляется более полное название и частичное описание товара.*/}
                            {/*А так же доступные...*/}
                        </div>
                        <div className={s.product_select}>
                            {
                                currentProduct.productOptions.map(option => {
                                    return (
                                        <Select
                                            key={option.id}
                                            className={s.product_select_box}
                                            options={products}
                                            placeholder={option.name}
                                            isSearchable={false}
                                            value={selectedProduct ? selectedProduct : null}
                                            onChange={(value) => {
                                                setSelectedProduct(value)
                                            }}
                                            getOptionLabel={label => label!.name}
                                            getOptionValue={value => value!.name}
                                            // noOptionsMessage={() => 'Товар не найден'}
                                        />
                                    )
                                })
                            }

                            {/*<ControlledReactSelect control={formControl}*/}
                            {/*                       name={'productSelect'}*/}
                            {/*                       className={s.product_select_box}*/}
                            {/*                       placeholder={'Товар'}*/}
                            {/*                       isSearchable={false}*/}
                            {/*                       // disabled={currentService === null && !isCreating}*/}
                            {/*                       value={formControl.getFieldState('productSelect')}*/}
                            {/*                       onChangeSelect={(value: any) => {formControl.setValue('productSelect', value)}}*/}
                            {/*                       data={products.map((el: any) => {*/}
                            {/*                           return {*/}
                            {/*                               value: el.value,*/}
                            {/*                               label: el.label,*/}
                            {/*                           }*/}
                            {/*                       })}*/}
                            {/*                       noOptionsMessage={() => 'Товар не найден'}*/}
                            {/*/>*/}

                            {/*<FormControl fullWidth>*/}
                            {/*    <InputLabel id="product-select-label" style={{color: 'black'}}>Модель</InputLabel>*/}
                            {/*    <Select*/}
                            {/*        labelId="product-select-label"*/}
                            {/*        id="product-select"*/}
                            {/*        name={'productSelect'}*/}
                            {/*        value={'Велосипед-1'}*/}
                            {/*        label="productSelect"*/}
                            {/*        onChange={onChangeMUISelectHandler}*/}
                            {/*        sx={{*/}
                            {/*            color: "black",*/}
                            {/*            '.MuiOutlinedInput-notchedOutline': {*/}
                            {/*                borderColor: 'black',*/}
                            {/*            },*/}
                            {/*            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {*/}
                            {/*                borderColor: 'black',*/}
                            {/*            },*/}
                            {/*            '&:hover .MuiOutlinedInput-notchedOutline': {*/}
                            {/*                borderColor: 'black',*/}
                            {/*            },*/}
                            {/*            '.MuiSvgIcon-root ': {*/}
                            {/*                fill: 'black',*/}
                            {/*            }*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        {*/}
                            {/*            products.map((p: any) => {*/}
                            {/*                return (*/}
                            {/*                    <MenuItem key={p} value={p}>*/}
                            {/*                        {p}*/}
                            {/*                    </MenuItem>*/}
                            {/*                )*/}
                            {/*            })*/}
                            {/*        }*/}
                            {/*    </Select>*/}
                            {/*</FormControl>*/}

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
                             onClick={() => {
                                 setDescriptionHandler(true, false, false)
                             }}
                        >
                            Характеристики
                        </div>
                        <div className={isDetails ? s.description_active : s.chapters_details}
                             onClick={() => {
                                 setDescriptionHandler(false, true, false)
                             }}
                        >
                            Описание
                        </div>
                        <div className={isDelivery ? s.description_active : s.chapters_delivery}
                             onClick={() => {
                                 setDescriptionHandler(false, false, true)
                             }}
                        >
                            Доставка
                        </div>
                    </div>
                    <div className={s.description_content}>
                        {
                            isCharacteristic && currentProduct.productSpecifications ?
                                <div>
                                    {/*Описание характеристики. Давно выяснено, что при оценке дизайна и*/}
                                    {/*композиции читаемый текст мешает сосредоточиться. Lorem Ipsum*/}
                                    {/*используют потому, что тот обеспечивает более или менее стандартное*/}
                                    {/*заполнение шаблона, а также реальное распределение букв и пробелов в*/}
                                    {/*абзацах, которое не получается при простой дубликации.*/}

                                    {
                                        currentProduct.productSpecifications.map(spec => {
                                            return (
                                                <div>
                                                    <div style={{fontWeight: 'bold'}}>{spec.name}:</div>
                                                    <div>{spec.description}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                : ''
                        }

                        {
                            isDetails && currentProduct.productCard.description.length !== 0
                                ? <div>{parse(currentProduct.productCard.description)}</div> : ''
                                // ? <div dangerouslySetInnerHTML={{ __html: currentProduct.productCard.description }}/> : ''
                        }

                        {
                            isDelivery ? <div>Доставка</div> : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}