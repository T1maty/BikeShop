import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CatalogProductItemType, CatalogProductItemTypeForCart, ProductOptionVariantBind} from '../../../../entities'

interface ShoppingCartStore {
    cartProducts: CatalogProductItemTypeForCart[]
    setCartProducts: (products: CatalogProductItemTypeForCart[]) => void
    setProductToCart: (product: CatalogProductItemType, optionVariants: ProductOptionVariantBind[]) => void
    shoppingCartSum: number
    setShoppingCartSum: (sum: number) => void
}

const useShoppingCart = create<ShoppingCartStore>()(/*persist(*/devtools(immer((set) => ({
    cartProducts: [],
    setCartProducts: (products) => set(state => {
        state.cartProducts = products
    }),
    setProductToCart: (product, optionVariants) => set(state => {
        console.log('добавленный товар', product)
        state.cartProducts.push({
            ...product,
            productQuantity: 1,
            productTotalSum: product.product.retailPrice,
            selectedProductOptions: optionVariants
        })
    }),
    shoppingCartSum: 0,
    setShoppingCartSum: (sum) => set(state => {
        state.shoppingCartSum = sum
    }),
})))/*, {
    name: "shoppingCartStore",
    version: 1
})*/);

export default useShoppingCart;