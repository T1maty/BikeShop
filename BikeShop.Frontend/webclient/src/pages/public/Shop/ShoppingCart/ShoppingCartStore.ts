import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CatalogProductItemType, CatalogProductItemTypeForCart} from '../../../../entities'

interface ShoppingCartStore {
    cartProducts: CatalogProductItemTypeForCart[]
    setProducts: (products: CatalogProductItemTypeForCart[]) => void
    setProductToCart: (product: any) => void
}

const useShoppingCart = create<ShoppingCartStore>()(/*persist(*/devtools(immer((set) => ({
    cartProducts: [],
    setProducts: (products) => set(state => {
        state.cartProducts = products
    }),
    setProductToCart: (product) => set(state => {
        state.cartProducts.push({...product,
            productCount: 1,
            // totalSum: product.productCount * product.product.retailPrice
            totalSum: product.product.retailPrice * product.productCount
        })
    }),
})))/*, {
    name: "cartStore",
    version: 1
})*/);

export default useShoppingCart;