import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CatalogProductItemType, CatalogProductItemTypeForCart} from '../../../../entities'

interface ShoppingCartStore {
    cartProducts: CatalogProductItemTypeForCart[]
    setCartProducts: (products: CatalogProductItemTypeForCart[]) => void
    setProductToCart: (product: CatalogProductItemType) => void
    shoppingCartSum: number
    setShoppingCartSum: (sum: number) => void
}

const useShoppingCart = create<ShoppingCartStore>()(/*persist(*/devtools(immer((set) => ({
    cartProducts: [],
    setCartProducts: (products) => set(state => {
        state.cartProducts = products
    }),
    setProductToCart: (product) => set(state => {
        state.cartProducts.push({...product,
            productQuantity: 1,
            productTotalSum: product.product.retailPrice
        })
    }),
    shoppingCartSum: 0,
    setShoppingCartSum: (sum) => set(state => {
        state.shoppingCartSum = sum
    }),
})))/*, {
    name: "cartStore",
    version: 1
})*/);

export default useShoppingCart;