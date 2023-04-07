import React, {useState} from 'react'
import s from './ShoppingCart.module.scss'
import cart from "../../../../shared/assets/shop/icons/cart.png"
import {Button} from "../../../../shared/ui"
import useShoppingCart from "./ShoppingCartStore"
import RemoveIcon from "../../../../shared/assets/workspace/remove-icon.svg"

export const ShoppingCart = () => {

    const cartProducts = useShoppingCart(s => s.cartProducts)
    const setProducts = useShoppingCart(s => s.setProducts)

    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

    const cartSum = cartProducts.reduce((acc, obj) => acc + obj.product.retailPrice, 0) // сумма корзины

    const deleteProductFromCartHandler = (productId: number) => {
        setProducts(cartProducts.filter(pr => pr.product.id !== productId))
    }

    return (
        <div className={s.cart_mainBox}
             onClick={() => {setIsCartOpen(!isCartOpen)}}
        >
            <div>
                <img src={cart} alt="cart-logo"/>
            </div>

            {
                cartProducts.length !== 0 ?
                    <div className={s.cart_count}>{cartProducts.length}</div>
                    : ''
            }

            {
                isCartOpen ?
                    <div className={s.cart_content}>
                        <div className={s.cart_cartList}>
                            {
                                cartProducts.length !== 0 ?
                                    cartProducts.map(cartProd => {
                                        return (
                                            <div key={cartProd.product.id}
                                                 className={s.cart_cartListItem}
                                            >
                                                <div className={s.cart_cartListItem_content}>
                                                    <div className={s.cart_cartListItem_image}>
                                                        <img src={cartProd.productImages[0].url} alt="product"/>
                                                    </div>
                                                    <div className={s.cart_cartListItem_info}>
                                                        <div>
                                                            {cartProd.product.name}
                                                        </div>
                                                        <div>
                                                            {cartProd.product.retailPrice} x 1шт. = {cartProd.product.retailPrice*1}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={s.cart_cartListItem_deleteIcon}>
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