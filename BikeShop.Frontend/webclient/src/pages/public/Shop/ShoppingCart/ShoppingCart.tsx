import React, {useEffect} from 'react'
import s from './ShoppingCart.module.scss'
import cart from "../../../../shared/assets/shop/icons/cart.png"
import {Button} from '../../../../shared/ui'
import useShoppingCart from "./ShoppingCartStore"
import RemoveIcon from "../../../../shared/assets/workspace/remove-icon.svg"
import NoProductImage from '../../../../shared/assets/shop/icons/bicycle-02.svg'
import {useComponentVisible} from "../../../../shared/hooks/useComponentVisible"
import {ShoppingCartProductType} from "../../../../entities"
import {useNavigate} from 'react-router-dom'
import {BikeShopPaths} from '../../../../app/routes/paths'

export const ShoppingCart = React.memo(() => {

    const navigate = useNavigate()
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

    const cartProducts = useShoppingCart(s => s.cartProducts)
    const setCartProducts = useShoppingCart(s => s.setCartProducts)
    const shoppingCartSum = useShoppingCart(s => s.shoppingCartSum)
    const setShoppingCartSum = useShoppingCart(s => s.setShoppingCartSum)

    const deleteProductFromCartHandler = (productId: number) => {
        setCartProducts(cartProducts.filter(pr => pr.product.id !== productId))
    }

    const productCartQuantityHandler = (product: ShoppingCartProductType, action: number) => {
        setCartProducts(cartProducts.map(el => el.product.id === product.product.id ?
            {
                ...el, productQuantity: el.productQuantity + action,
                productTotalSum: ((el.productQuantity + action) * el.product.retailPrice)
            } : el)
        )
    }

    useEffect(() => {
        setShoppingCartSum(cartProducts.reduce((acc, obj) => acc + obj.productTotalSum, 0))
    }, [cartProducts])

    return (
        <div className={s.cart_mainBox}>
            <div onClick={() => {
                setIsComponentVisible(!isComponentVisible)
            }}>
                <img src={cart} alt="cart-logo"/>
            </div>

            {
                cartProducts.length !== 0 ?
                    <div className={s.cart_count}>{cartProducts.length}</div>
                    : ''
            }

            {
                isComponentVisible ?
                    <div className={s.cart_content} ref={ref}>
                        <div className={s.cart_cartList}>
                            {
                                cartProducts.length !== 0 ?
                                    cartProducts.map(cartProd => {
                                        return (
                                            <div key={cartProd.product.id}
                                                 className={s.cartListItem}
                                            >
                                                <div className={s.cartListItem_content}>
                                                    <div className={s.cartListItem_image}>
                                                        <img src={cartProd.productImages.length > 0
                                                            ? cartProd.productImages[0].url
                                                            : NoProductImage}
                                                             alt="product"
                                                        />
                                                    </div>
                                                    <div className={s.cartListItem_info}>
                                                        <div className={s.cartListItem_name}>
                                                            {cartProd.product.name}
                                                        </div>
                                                        <div className={s.cartListItem_price}>
                                                            <div>{cartProd.product.retailPrice}</div>
                                                            <div>x</div>

                                                            <Button // buttonDivWrapper={s.cartListItem_decreaseBtn}
                                                                disabled={cartProd.productQuantity === 1}
                                                                onClick={() => {
                                                                    productCartQuantityHandler(cartProd, -1)
                                                                }}
                                                            >
                                                                -
                                                            </Button>

                                                            <div className={s.cartListItem_quantity}>
                                                                {cartProd.productQuantity}
                                                            </div>

                                                            <Button // buttonDivWrapper={s.cartListItem_increaseBtn}
                                                                onClick={() => {
                                                                    productCartQuantityHandler(cartProd, 1)
                                                                }}
                                                            >
                                                                +
                                                            </Button>

                                                            <div className={s.cartListItem_quantityUnit}>шт. =</div>
                                                            <div
                                                                className={s.cartListItem_productTotalSum}>{cartProd.productTotalSum}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={s.cartListItem_deleteIcon}>
                                                    {/*<DeleteButton size={30} onClick={() => {deleteProductFromCartHandler(cartProd.product.id)}}/>*/}
                                                    <img src={RemoveIcon} alt="remove-icon"
                                                         className={s.imageList_deleteItem}
                                                         onClick={() => {
                                                             deleteProductFromCartHandler(cartProd.product.id)
                                                         }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                    : <div className={s.emptyCart}>В корзине нет товаров</div>
                            }
                        </div>

                        {
                            cartProducts.length !== 0 ?
                                <div className={s.cart_result}>
                                    <fieldset className={s.result_fieldset}>
                                        <legend>Итого</legend>
                                        <div className={s.result_text}>{shoppingCartSum}</div>
                                    </fieldset>
                                    <Button buttonDivWrapper={s.result_orderButton}
                                            onClick={() => {
                                                setIsComponentVisible(false)
                                                navigate(BikeShopPaths.SHOP.ORDER)
                                            }
                                            }
                                            // disabled={true}
                                    >
                                        Создать заказ
                                    </Button>
                                </div>
                                : ''
                        }

                    </div>
                    : ''
            }
        </div>
    )
})