import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {SupplyInvoiceProduct} from "../../entities/entities/Acts/SupplyInvoice/SupplyInvoiceProduct";
import {Product} from "entities";
import {CatalogAPI} from "../../entities";
import Enumerable from "linq";

interface type {
    open: boolean
    setOpen: (value: boolean) => void

    products: Product[]
    updateProduct: (p: Product) => void
    setProductsFromSupply: (v: SupplyInvoiceProduct[]) => void
}

export const usePriceManager = create<type>()(persist(devtools(immer((set, get) => ({
    open: false,
    setOpen: (v) => {
        set({open: v})
    },
    products: [],
    setProductsFromSupply: (v) => {
        CatalogAPI.getProductsByIds(Enumerable.from(v).select(n => n.productId).toArray()).then((r) => {
            set({products: r.data})
        })
    },
    updateProduct: (p) => {
        let data = get().products.map((n) => {
            if (n.id === p.id) return p
            return n
        })
        set({products: data})
    }
}))), {
    name: "priceManager",
    version: 1
}));