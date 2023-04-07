import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CatalogProductItemType} from "../../../../entities"

interface CartStore {
    cartProducts: CatalogProductItemType[]
    setProducts: (products: CatalogProductItemType[]) => void
    setProductToCart: (product: CatalogProductItemType) => void
}

const useCart = create<CartStore>()(/*persist(*/devtools(immer((set) => ({
    cartProducts: [],
    setProducts: (products) => set(state => {
        state.cartProducts = products
    }),
    setProductToCart: (product) => set(state => {
        state.cartProducts.push(product)
    }),
})))/*, {
    name: "cartStore",
    version: 1
})*/);

export default useCart;