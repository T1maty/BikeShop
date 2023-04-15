import React, {useEffect, useState} from 'react'
import s from './CatalogProductItem.module.scss'
import parse from 'html-react-parser'
import {useParams} from 'react-router-dom'
import {Button, LoaderScreenForShop} from '../../../../shared/ui'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import SorryNoImage from '../../../../shared/assets/shop/images/sorryNoImage.jpg'
import Select, {SingleValue} from 'react-select'
import useCatalog from './CatalogStore'
import ShopLoaderScreen from '../../../../shared/assets/shop/icons/isLoadingBikeShop-03.gif'
import useShoppingCart from '../ShoppingCart/ShoppingCartStore'
import {useSnackbar} from 'notistack'
import Enumerable from 'linq'
import {ProductOptionVariantBind} from '../../../../entities'

type SelectedOptionVariantType = {
    id: number
    value: ProductOptionVariantBind
}

// type DescriptionViewType = 'Characteristic' | 'Details' | 'Delivery'

export const CatalogProductItem = () => {

    const {enqueueSnackbar} = useSnackbar()

    const isLoading = useCatalog(s => s.isLoading)
    const getCurrentProduct = useCatalog(s => s.getCurrentProduct)
    const currentProduct = useCatalog(s => s.currentProduct)

    const cartProducts = useShoppingCart(s => s.cartProducts)
    const setProductToCart = useShoppingCart(s => s.setProductToCart)

    const amountOfProduct = 10 // есть ли на складе

    const params = useParams<'productId'>()

    // вид отображения
    // const [descriptionView, setDescriptionView] = useState<DescriptionViewType>('Characteristic')

    const [selectedOptionVariant, setSelectedOptionVariant] = useState<SelectedOptionVariantType[]>([])

    // для стилей описания товара
    const [isCharacteristic, setIsCharacteristic] = useState<boolean>(true)
    const [isDetails, setIsDetails] = useState<boolean>(false)
    const [isDelivery, setIsDelivery] = useState<boolean>(false)

    // преобразование галереи под нужный тип библиотеки
    const myImages = currentProduct?.productImages && currentProduct.productImages.map(img => {
        return {original: img.url, thumbnail: img.url}
    })

    // если нет изображений, чтобы не ломалась вёрстка
    const noImages = [{original: SorryNoImage, thumbnail: SorryNoImage}]

    // const formControl = useForm<any>({
    //     defaultValues: {
    //         selectedProductOptions: [],
    //     }
    // })
    //
    // const onSubmit: SubmitHandler<any> = (data: any) => {
    //     // code here ?
    // }

    // для выбора раздела описания товара
    const setDescriptionHandler = (/*descriptionTitle: DescriptionViewType,*/ isCharacteristic: boolean,
                                   isDetails: boolean, isDelivery: boolean) => {
        // setDescriptionView(descriptionTitle)
        setIsCharacteristic(isCharacteristic)
        setIsDetails(isDetails)
        setIsDelivery(isDelivery)
    }

    const onChangeOptionsVariantHandler = (value: SingleValue<SelectedOptionVariantType>) => {
        if (value != undefined) {
            let buf = selectedOptionVariant.filter(n => n.id !== value.value.optionId)
            // console.log('Сетаем вариант', value)
            buf.push(value)
            setSelectedOptionVariant(buf)
            // console.log('стейт селекта', selectedOptionVariant)
        }
    }

    const addProductToCartHandler = () => {
        if (Enumerable.from(cartProducts).select(n => n.product.id).contains(currentProduct!.product.id)) {
            enqueueSnackbar('Этот товар уже есть в корзине',
                {
                    variant: 'info', autoHideDuration: 2000,
                    anchorOrigin: {vertical: 'top', horizontal: 'right'}
                })
        } else {
            setProductToCart(currentProduct!, Enumerable.from(selectedOptionVariant).select(n => n.value).toArray())
            enqueueSnackbar('Товар добавлен в корзину',
                {
                    variant: 'success', autoHideDuration: 2000,
                    anchorOrigin: {vertical: 'top', horizontal: 'right'}
                })
        }
    }

    useEffect(() => {
        // formControl.reset()
        // formControl.setValue('selectedProductOptions', currentProduct?.productOptions)
    }, [])

    useEffect(() => {
        getCurrentProduct(+params.productId!)
    }, [params])

    // так как нужно преобразовать массив изображений,
    // то необходимо сделать дополнительную проверку для myImages
    if (isLoading || !myImages) {
        return <LoaderScreenForShop image={ShopLoaderScreen}/>
    } else {

        return (currentProduct &&
            <div className={s.shop_productItem_mainBox}>
                <div className={s.cloudCategory}>
                    {
                        currentProduct.productTags.map(tag => {
                            return (
                                <div key={tag.productTag.id} className={s.cloudCategory_item}>
                                    {tag.productTag.name}
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

                        <div className={s.product_select}>
                            {
                                Enumerable.from(currentProduct.productOptions)
                                    .distinct(n => n.optionId)
                                    .toArray()
                                    .map((po: ProductOptionVariantBind) => {
                                        return (
                                            <Select
                                                key={po.id}
                                                className={s.product_selectBox}
                                                placeholder={po.optionName}
                                                isSearchable={false}
                                                options={Enumerable.from(currentProduct.productOptions)
                                                    .where(n => n.optionId === po.optionId)
                                                    .select(n => {
                                                        return {id: n.optionId, value: n} as SelectedOptionVariantType
                                                    }).toArray()}
                                                value={selectedOptionVariant.find(n => n.id === po.optionId)
                                                    ? selectedOptionVariant.find(n => n.id === po.optionId) : null}
                                                onChange={(value) => {
                                                    onChangeOptionsVariantHandler(value)
                                                }}
                                                getOptionLabel={label => label!.value.name}
                                                getOptionValue={value => value!.value.name}
                                                noOptionsMessage={() => 'Характеристика не найдена'}
                                            />

                                        )
                                    })
                            }
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