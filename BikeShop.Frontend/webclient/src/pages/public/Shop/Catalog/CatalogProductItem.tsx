import React, {useEffect, useState} from 'react'
import s from './CatalogProductItem.module.scss'
import parse from 'html-react-parser'
import {Button, ControlledReactSelect, LoaderScreenForShop} from '../../../../shared/ui'
import {SubmitHandler, useForm, Controller} from 'react-hook-form'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import NoProductImage from '../../../../shared/assets/shop/icons/bicycle-02.svg'
import SorryNoImage from '../../../../shared/assets/shop/images/sorryNoImage.jpg'
import Select from 'react-select'
import useCatalog from './CatalogStore'
import ShopLoaderScreen from '../../../../shared/assets/shop/icons/isLoadingBikeShop-03.gif'
import useShoppingCart from '../ShoppingCart/ShoppingCartStore'
import {useSnackbar} from 'notistack'
import Enumerable from 'linq'
import {ProductOptionVariantBind, ProductSpecificationBind} from '../../../../entities'

// type DescriptionViewType = 'Characteristic' | 'Details' | 'Delivery'

export const CatalogProductItem = () => {

    const {enqueueSnackbar} = useSnackbar()

    const isLoading = useCatalog(s => s.isLoading)
    const currentProduct = useCatalog(s => s.currentProduct)
    const cartProducts = useShoppingCart(s => s.cartProducts)
    const setProductToCart = useShoppingCart(s => s.setProductToCart)

    const amountOfProduct = 10 // есть ли на складе

    // вид отображения
    // const [descriptionView, setDescriptionView] = useState<DescriptionViewType>('Characteristic')

    // для стилей описания товара
    const [isCharacteristic, setIsCharacteristic] = useState<boolean>(true)
    const [isDetails, setIsDetails] = useState<boolean>(false)
    const [isDelivery, setIsDelivery] = useState<boolean>(false)

    const [selectedProductOption, setSelectedProductOption] = useState<ProductOptionVariantBind>()

    // тестовые изображения
    // const [myImages, setMyImages] = useState([
    //     {
    //         original: 'https://wallpapercave.com/wp/wp2118883.jpg',
    //         thumbnail: 'https://wallpapercave.com/wp/wp2118883.jpg',
    //     },
    //     {
    //         original: 'https://i.pinimg.com/736x/74/cf/2e/74cf2eb33969be3c522581d9b48e376e.jpg',
    //         thumbnail: 'https://i.pinimg.com/736x/74/cf/2e/74cf2eb33969be3c522581d9b48e376e.jpg',
    //     },
    //     {
    //         original: 'https://i.pinimg.com/736x/a1/73/82/a1738256e54b5aa431b646967257c1e9--red-bull-world-cup.jpg',
    //         thumbnail: 'https://i.pinimg.com/736x/a1/73/82/a1738256e54b5aa431b646967257c1e9--red-bull-world-cup.jpg',
    //     },
    //     {
    //         original: 'https://i.pinimg.com/736x/37/cb/da/37cbda77cb69ad92ada1c6fc58c5bca0--mtb-downhill-mountainbiking.jpg',
    //         thumbnail: 'https://i.pinimg.com/736x/37/cb/da/37cbda77cb69ad92ada1c6fc58c5bca0--mtb-downhill-mountainbiking.jpg',
    //     },
    //     {
    //         original: 'https://ep1.pinkbike.org/p4pb15005029/p4pb15005029.jpg',
    //         thumbnail: 'https://ep1.pinkbike.org/p4pb15005029/p4pb15005029.jpg',
    //     },
    //     {
    //         original: 'https://twentysix.ru/uploads/images/00/05/02/2016/10/12/c81810e528.jpg',
    //         thumbnail: 'https://twentysix.ru/uploads/images/00/05/02/2016/10/12/c81810e528.jpg',
    //     },
    // ])

    // преобразование галереи под нужный тип библиотеки
    const myImages = currentProduct && currentProduct.productImages.map(img => {
        return {original: img.url, thumbnail: img.url}
    })

    // если нет изображений, чтобы не ломалась вёрстка
    const noImages = [{original: SorryNoImage, thumbnail: SorryNoImage}]

    const formControl = useForm<any>({
        defaultValues: {
            selectedProductOptions: [],
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        // code here ?
    }

    // для выбора раздела описания товара
    const setDescriptionHandler = (/*descriptionTitle: DescriptionViewType,*/ isCharacteristic: boolean,
                                   isDetails: boolean, isDelivery: boolean) => {

        // setDescriptionView(descriptionTitle)
        setIsCharacteristic(isCharacteristic)
        setIsDetails(isDetails)
        setIsDelivery(isDelivery)
    }

    const addProductToCartHandler = () => {
        if (Enumerable.from(cartProducts).select(n => n.product.id).contains(currentProduct!.product.id)) {
            enqueueSnackbar('Этот товар уже есть в корзине',
                {
                    variant: 'info', autoHideDuration: 2000,
                    anchorOrigin: {vertical: 'top', horizontal: 'right'}
                })
        } else {
            setProductToCart(currentProduct!)
            enqueueSnackbar('Товар добавлен в корзину',
                {
                    variant: 'success', autoHideDuration: 2000,
                    anchorOrigin: {vertical: 'top', horizontal: 'right'}
                })
        }

        // if (cartProducts.length === 0) {
        //     enqueueSnackbar('Товар добавлен в корзину',
        //         {variant: 'success', autoHideDuration: 2000,
        //             anchorOrigin: {vertical: 'top', horizontal: 'right'}})
        //     setProductToCart(currentProduct!)
        // } else {
        //     cartProducts.forEach((prod) => {
        //         if (prod.product.id === currentProduct!.product.id) {
        //             enqueueSnackbar('Этот товар уже есть в корзине',
        //                 {variant: 'info', autoHideDuration: 2000,
        //                     anchorOrigin: {vertical: 'top', horizontal: 'right'}})
        //         } else {
        //             enqueueSnackbar('Товар добавлен в корзину',
        //                 {variant: 'success', autoHideDuration: 2000,
        //                     anchorOrigin: {vertical: 'top', horizontal: 'right'}})
        //             setProductToCart(currentProduct!)
        //         }
        //     })
        // }
    }

    useEffect(() => {
        // formControl.reset()
        // formControl.setValue('selectedProductOptions', currentProduct?.productOptions)
    }, [])

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
                    <div className={s.product_images}>
                        <ImageGallery items={myImages && myImages.length > 0 ? myImages : noImages}
                                      showPlayButton={false}
                                      // showFullscreenButton={false}
                                      showIndex={true}
                                      showNav={false}
                                      showBullets={true}
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
                        </div>

                        {/*<Controller*/}
                        {/*    name={'selectedProductOptions'}*/}
                        {/*    control={formControl.control}*/}
                        {/*    render={({field}: any) =>*/}

                                <div className={s.product_select}>
                                    {
                                        currentProduct.productOptions.map((po: ProductOptionVariantBind) => {
                                            return (
                                                <Select
                                                    key={po.id}
                                                    className={s.product_selectBox}
                                                    // options={getSpecificationsHandler(field)}
                                                    placeholder={'Характеристика'}
                                                    isSearchable={false}
                                                    // value={selectedSpecification ? selectedSpecification : null}
                                                    // onChange={(value) => {
                                                    //     setSelectedSpecification(value as ProductSpecificationBind)
                                                    // }}
                                                    // getOptionLabel={label => label!.name}
                                                    // getOptionValue={value => value!.name}
                                                    noOptionsMessage={() => 'Характеристика не найдена'}
                                                />
                                            )
                                        })
                                    }

                                    {/*<ControlledReactSelect control={formControl}*/}
                                    {/*                       name={'selectedProductOptions'}*/}
                                    {/*                       className={s.product_selectBox}*/}
                                    {/*                       placeholder={'Характеристика'}*/}
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
                                    {/*                       noOptionsMessage={() => 'Характеристика не найдена'}*/}
                                    {/*/>*/}
                                </div>

                            {/*}*/}
                        {/*/>*/}

                        <div className={s.product_buy}>
                            <div className={s.product_available}>
                                {
                                    amountOfProduct > 0 ?
                                        <div className={s.isAvailable}>Есть на складе</div>
                                        : <div className={s.notAvailable}>Товар закончился</div>
                                }

                            </div>
                            <div className={s.product_addToCart}>
                                <Button onClick={addProductToCartHandler}>
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
                                    {
                                        currentProduct.productSpecifications.map(spec => {
                                            return (
                                                <div key={spec.id}>
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