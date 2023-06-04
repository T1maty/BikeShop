import React, {useEffect, useState} from 'react'
import s from './Catalog.module.scss'
import SortThumbnails from '../../../../shared/assets/shop/icons/sort-thumbnails.png'
import SortList from '../../../../shared/assets/shop/icons/sort-list.png'
import Cart from '../../../../shared/assets/shop/icons/cart.png'
import CartFull from '../../../../shared/assets/shop/icons/cart-full.svg'
import NoProductImage from '../../../../shared/assets/shop/icons/bicycle-02.svg'
import {useNavigate} from 'react-router-dom'
import useCatalog from './CatalogStore'
import {DeleteButton, ShopLoader} from '../../../../shared/ui'
import {useSnackbar} from 'notistack'
import useShoppingCart from '../ShoppingCart/ShoppingCartStore'
import {ProductFullData, ProductTag, useCurrency} from '../../../../entities'
import Enumerable from "linq"
import {ShopCatalogTreeView} from "../ShopCatalogTreeView/ShopCatalogTreeView"

type FilterProductsType = 'Popular' | 'Cheap' | 'Expensive' | 'New'

export const Catalog = () => {

    const {enqueueSnackbar} = useSnackbar()

    const navigate = useNavigate()

    const isLoading = useCatalog(s => s.isLoading)
    const errorStatus = useCatalog(s => s.errorStatus)

    const getTags = useCatalog(s => s.getTags)
    const userCurrentTags = useCatalog(s => s.userCurrentTags)
    const setUserCurrentTagsArray = useCatalog(s => s.setUserCurrentTagsArray)
    const deleteUserCurrentTag = useCatalog(s => s.deleteUserCurrentTag)

    const defaultProducts = useCatalog(s => s.defaultProducts)
    const getDefaultProducts = useCatalog(s => s.getDefaultProducts)
    const getProductsByTags = useCatalog(s => s.getProductsByTags)
    const tagsWithChildrens = useCatalog(s => s.tagsWithChildrens)
    const selectedTags = useCatalog(s => s.selectedTags)
    // const setCurrentProduct = useCatalog(s => s.setCurrentProduct)

    const cartProducts = useShoppingCart(s => s.cartProducts)
    const setProductToCart = useShoppingCart(s => s.setProductToCart)

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)

    const [filterStatus, setFilterStatus] = useState<FilterProductsType>('Popular')
    const [activeFilter1, setActiveFilter1] = useState<boolean>(false)
    const [activeFilter2, setActiveFilter2] = useState<boolean>(false)
    const [activeFilter3, setActiveFilter3] = useState<boolean>(false)
    const [activeFilter4, setActiveFilter4] = useState<boolean>(false)

    const [viewType, setViewType] = useState([
        {
            id: '1',
            icon: SortThumbnails,
            func: () => {
                //
            }
        },
        {
            id: '2',
            icon: SortList,
            func: () => {
                //
            }
        },
    ])

    const filterUniversalHandler = (filterName: FilterProductsType,
                                    activeFilter1: boolean, activeFilter2: boolean,
                                    activeFilter3: boolean, activeFilter4: boolean) => {
        // setFilter(services.filter(serv => serv.status === filterName))
        setFilterStatus(filterName)
        setActiveFilter1(activeFilter1)
        setActiveFilter2(activeFilter2)
        setActiveFilter3(activeFilter3)
        setActiveFilter4(activeFilter4)
    }

    const addProductToCartHandler = (product: ProductFullData) => {
        if (Enumerable.from(cartProducts).select(n => n.product.id).contains(product.product.id)) {
            enqueueSnackbar('Этот товар уже есть в корзине',
                {
                    variant: 'info', autoHideDuration: 2000,
                    anchorOrigin: {vertical: 'top', horizontal: 'right'}
                })
        } else {
            setProductToCart(product, product.productOptions)
            enqueueSnackbar('Товар добавлен в корзину',
                {
                    variant: 'success', autoHideDuration: 2000,
                    anchorOrigin: {vertical: 'top', horizontal: 'right'}
                })
        }
    }

    const setCurrentProductToStore = (product: ProductFullData) => {
        // setCurrentProduct(product) // оставить или нет?!
        navigate(`/shop/catalog/${product.product.id}`)
    }
    const deleteUserCurrentTagHandler = (tag: ProductTag) => {
        deleteUserCurrentTag(userCurrentTags.filter(t => t.id !== tag.id))
    }
    const clearUserCurrentTagsArrayHandler = () => {
        setUserCurrentTagsArray([])
    }

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        getTags()
    }, [])

    useEffect(() => {
        setActiveFilter1(true)

        if (userCurrentTags.length === 0 && selectedTags.length === 0) {
            getDefaultProducts()
        } else {
            let ids = Enumerable.from(userCurrentTags).select(n => n.id).toArray()
            Enumerable.from(tagsWithChildrens.filter(n => ids.includes(n.tag.id))).select(n => n.childrenIds).forEach(n => {
                ids = ids.concat(n)
            })
            ids = ids.concat(selectedTags)
            console.log('Поиск по айдишникам', ids)
            getProductsByTags(ids)
        }
    }, [userCurrentTags, selectedTags])

    if (isLoading) {
        return <ShopLoader/>
    } else {

        return (
            <div className={s.catalog_mainBox}>

                <div className={s.container}>
                    <div className={s.catalog_left}>
                        <div className={s.tags_title}>
                            Категории:
                        </div>
                        <div className={s.tagsList}>
                            <ShopCatalogTreeView/>
                        </div>
                    </div>

                    <div className={s.catalog_right}>
                        <div className={s.right_cloudCategory}>
                            <div className={s.cloudCategory_title}>Облако категорий</div>
                            <div className={s.cloudCategory_content}>
                                <div className={s.cloudTag_title}>
                                    <div>Выбранные теги:</div>
                                    <DeleteButton size={25} onClick={clearUserCurrentTagsArrayHandler}/>
                                </div>
                                {
                                    userCurrentTags.length === 0 ? '' :
                                        userCurrentTags.map(tag => {
                                            return (
                                                <div className={s.cloudTag_item}>
                                                    {tag.name}
                                                    <DeleteButton size={20}
                                                                  onClick={() => {
                                                                      deleteUserCurrentTagHandler(tag)
                                                                  }}
                                                    />
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        </div>
                        <div className={s.right_filters}>
                            <div className={s.filter_buttons}>

                                <div>Сначала:</div>
                                <div className={activeFilter1 ? s.filter_itemActive : s.filter_item}
                                     onClick={() => {
                                         filterUniversalHandler('Popular',
                                             true, false, false, false)
                                     }}
                                >
                                    Популярные
                                </div>
                                <div className={activeFilter2 ? s.filter_itemActive : s.filter_item}
                                     onClick={() => {
                                         filterUniversalHandler('Cheap',
                                             false, true, false, false)
                                     }}
                                >
                                    Недорогие
                                </div>
                                <div className={activeFilter3 ? s.filter_itemActive : s.filter_item}
                                     onClick={() => {
                                         filterUniversalHandler('Expensive',
                                             false, false, true, false)
                                     }}
                                >
                                    Дорогие
                                </div>
                                <div className={activeFilter4 ? s.filter_itemActive : s.filter_item}
                                     onClick={() => {
                                         filterUniversalHandler('New',
                                             false, false, false, true)
                                     }}
                                >
                                    Новинки
                                </div>
                            </div>
                            <div className={s.filter_viewType}>
                                {
                                    viewType.map(item => (
                                        <div className={s.viewType_item}
                                             key={item.id}
                                             onClick={item.func}
                                        >
                                            <img src={item.icon} alt="view-type_icon"/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={s.right_content}>
                            {
                                defaultProducts.map(prod => (
                                    <div key={prod.product.id} className={s.content_item}>
                                        <div className={s.item_content}
                                             onClick={() => {
                                                 setCurrentProductToStore(prod)
                                             }}
                                        >
                                            <div className={s.item_image}>
                                                {
                                                    prod.productImages.length < 1 ?
                                                        <div className={s.item_noImage}>
                                                            <div className={s.item_noImage_title}>
                                                                Sorry, no photo!
                                                            </div>
                                                            <div className={s.item_noImage_icon}>
                                                                <img src={NoProductImage} alt="no-product-image"/>
                                                            </div>
                                                        </div>
                                                        : <img src={prod.productImages[0].url} alt="product-image"/>
                                                }
                                            </div>
                                            <div className={s.item_title}>{prod.product.name}</div>
                                        </div>
                                        <div className={s.item_buy}>
                                            <div
                                                className={s.item_price}>{r(fbts.c * prod.product.retailPrice) + ' ' + fbts.s}</div>
                                            <div className={s.item_cart}
                                                 onClick={() => {
                                                     addProductToCartHandler(prod)
                                                 }}
                                            >
                                                <img
                                                    src={Enumerable.from(cartProducts).select(n => n.product.id).contains(prod.product.id)
                                                        ? CartFull : Cart} alt="cart-logo"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}