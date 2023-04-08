import React from 'react'
import s from './ShoppingCart.module.scss'
import cart from "../../../../shared/assets/shop/icons/cart.png"
import {Button} from "../../../../shared/ui"
import useShoppingCart from "./ShoppingCartStore"
import RemoveIcon from "../../../../shared/assets/workspace/remove-icon.svg"
import {useComponentVisible} from "../../../../shared/hooks/useComponentVisible"
import {CatalogProductItemTypeForCart} from "../../../../entities"

export const ShoppingCart = () => {

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

    const cartProducts = useShoppingCart(s => s.cartProducts)
    const setProducts = useShoppingCart(s => s.setProducts)

    const cartSum = cartProducts.reduce((acc, obj) => acc + obj.productTotalSum, 0) // сумма корзины

    const deleteProductFromCartHandler = (productId: number) => {
        setProducts(cartProducts.filter(pr => pr.product.id !== productId))
    }

    const productCartQuantityHandler = (product: CatalogProductItemTypeForCart, action: number) => {
        setProducts(cartProducts.map(el => el.product.id === product.product.id ?
            {...el, productQuantity: el.productQuantity + action,
                productTotalSum: el.productQuantity * el.product.retailPrice
            } : el)
        )
    }

    return (
        <div className={s.cart_mainBox}>
            <div onClick={() => {setIsComponentVisible(!isComponentVisible)}}>
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
                                                        <img src={cartProd.productImages[0].url} alt="product"/>
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
                                                                    onClick={() => {productCartQuantityHandler(cartProd,-1)}}
                                                            >
                                                                -
                                                            </Button>

                                                            <div className={s.cartListItem_quantity}>
                                                                {cartProd.productQuantity}
                                                            </div>

                                                            <Button // buttonDivWrapper={s.cartListItem_increaseBtn}
                                                                    onClick={() => {productCartQuantityHandler(cartProd, 1)}}
                                                            >
                                                                +
                                                            </Button>

                                                            <div>шт. =</div>
                                                            <div>{cartProd.productTotalSum}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={s.cartListItem_deleteIcon}>
                                                    <img src={RemoveIcon} alt="remove-icon"
                                                         className={s.imageList_deleteItem}
                                                         onClick={() => {deleteProductFromCartHandler(cartProd.product.id)}}
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
                                        <div className={s.result_text}>{cartSum}</div>
                                    </fieldset>
                                    <Button buttonDivWrapper={s.result_orderButton}
                                            onClick={() => {}}
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
}