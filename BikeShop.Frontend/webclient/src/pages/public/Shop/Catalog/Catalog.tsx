import React, {useState, useEffect} from 'react'
import s from './Catalog.module.scss'
import SortThumbnails from '../../../../shared/assets/shop/icons/sort-thumbnails.png'
import SortList from '../../../../shared/assets/shop/icons/sort-list.png'
import cart from "../../../../shared/assets/shop/icons/cart.png"
import NoProductImage from '../../../../shared/assets/shop/icons/bicycle-02.svg'
import {BikeShopPaths} from "../../../../app/routes/paths"
import {useNavigate} from "react-router-dom"
import useCatalog from "./CatalogStore"
import {LoaderScreen} from "../../../../shared/ui"

type FilterProductsType = 'Popular' | 'Cheap' | 'Expensive' | 'New'

type ProductsType = {
    id: string
    image: string
    name: string
    price: number
    addToCart: string
}

export const Catalog = () => {

    const navigate = useNavigate()

    const isLoading = useCatalog(s => s.isLoading)
    const tags = useCatalog(s => s.tags)
    const getTags = useCatalog(s => s.getTags)
    const defaultProducts = useCatalog(s => s.defaultProducts)
    const getDefaultProducts = useCatalog(s => s.getDefaultProducts)

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

    // тестовые данные
    const [products, setProducts] = useState<ProductsType[]>([
        {
            id: '1',
            image: 'https://i.pinimg.com/originals/74/cf/2e/74cf2eb33969be3c522581d9b48e376e.jpg',
            name: 'Merida',
            price: 500,
            addToCart: cart,
        },
        {
            id: '2',
            image: '',
            name: 'Specialized',
            price: 100500,
            addToCart: cart,
        },
        {
            id: '3',
            image: 'https://i.pinimg.com/originals/74/cf/2e/74cf2eb33969be3c522581d9b48e376e.jpg',
            name: 'Merida',
            price: 500,
            addToCart: cart,
        },
        {
            id: '4',
            image: '',
            name: 'Specialized',
            price: 100500,
            addToCart: cart,
        },
        {
            id: '5',
            image: 'https://i.pinimg.com/originals/74/cf/2e/74cf2eb33969be3c522581d9b48e376e.jpg',
            name: 'Merida',
            price: 500,
            addToCart: cart,
        },
        {
            id: '6',
            image: '',
            name: 'Specialized',
            price: 100500,
            addToCart: cart,
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

    useEffect(() => {
        setActiveFilter1(true)
        getTags()
        getDefaultProducts()
    }, [])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <div className={s.catalog_mainBox}>
                <div className={s.catalog_left}>Категории</div>


                <div className={s.catalog_right}>
                    <div className={s.right_cloudCategory}>
                        <div className={s.cloudCategory_title}>Облако категорий</div>
                        <div className={s.cloudCategory_content}>Категории</div>
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
                            {viewType.map(item => (
                                <div className={s.viewType_item}
                                     key={item.id}
                                     onClick={item.func}
                                >
                                    <img src={item.icon} alt='view-type_icon'/>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={s.right_content}>
                        {
                            defaultProducts.map(prod => (
                                <div key={prod.product.id}
                                     className={s.content_item}
                                     onClick={() => {navigate(BikeShopPaths.SHOP.PRODUCT)}}
                                >
                                    <div className={s.item_image}>
                                        {
                                            // prod.image === null || prod.image === '' ?
                                            !prod.productImages ?
                                                <div className={s.item_noImage}>
                                                    <div className={s.item_noImage_title}>Sorry, no photo!</div>
                                                    <div className={s.item_noImage_icon}>
                                                        <img src={NoProductImage} alt='no-product-image'/>
                                                    </div>
                                                </div>
                                                : <img src={prod.productImages[0].url} alt='product-image'/>
                                        }

                                    </div>
                                    <div className={s.item_title}>{prod.product.name}</div>
                                    <div className={s.item_buy}>
                                        <div className={s.item_price}>{prod.product.retailPrice}</div>
                                        <div className={s.item_cart} onClick={() => {alert('added to cart')}}>
                                            <img src={cart} alt='cart-logo'/>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}