import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {TableRow} from "./TableRow";

interface InventoryOfProductsArchiveModalStore {
    open: boolean,
    setOpen: (v: boolean) => void
    products: TableRow[]
    setProducts: (n: TableRow[]) => void
}

const useProductStickerManager = create<InventoryOfProductsArchiveModalStore>()(/*persist*/(devtools(immer((set, get) => ({
    setProducts: (v) => {
        set({products: v})
    },
    products: [],
    open: false,
    setOpen: (v) => {
        set({open: v})
    }
})))/*, {
    name: "productStickerManagerStore",
    version: 1
}*/));

export default useProductStickerManager;