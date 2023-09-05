import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CatalogAPI, Product, ProductCardAPI, UpdateProduct} from "../../../../entities"
import Enumerable from "linq";
import {ProductFilterVariantDTO} from "../../../../entities/responses/ProductFilterVariantDTO";

interface productCatalogTableStore {
    isLoading: boolean
    open: boolean
    setOpen: (value: boolean, X: number, Y: number) => void
    contextMenuXY: { X: number, Y: number }

    rows: Product[]

    displayedRows: Product[]
    reloadDisplayedRows: (filters: ProductFilterVariantDTO[]) => void
    setRows: (data: Product[]) => void
    isRowSelected: (id: number) => boolean
    selectedRows: Product[]
    setSelectedRows: (value: Product[]) => void

    getProducts: (CategoryId: number) => void
    addNewProduct: (product: Product) => void
    updateRow: (rowData: UpdateProduct) => void

    setNotSortedToTable: () => void

    sortMode: string
    setSortMode: (v: string) => void
    sort: () => void

    moveProduct: (productId: number, categoryId: number, s: (r: Product) => void, f: () => void) => void
    removeProducts: (productIds: number[]) => void

    getCells: () => string[]

    columnsProps: string[]
    setColumnWight: (index: number, wight: string) => void
}

const useProductCatalogTableStore = create<productCatalogTableStore>()(persist(devtools(immer((set, get) => ({
    columnsProps: ["140px", "150px", "100px", "100px", "100px", "100px", "100px", "100px"],
    setColumnWight: (index, wight) => {
        let data = get().columnsProps.map((n, indexMap) => {
            if (indexMap === index) return wight
            return n
        })
        set({columnsProps: data})
    },
    getCells: () => {
        return ['Арт', 'Назва', 'Доступно', 'Резерв', 'Закуп', 'Опт', 'Роздріб', 'Каталожний номер']
    },
    displayedRows: [],
    reloadDisplayedRows: (filters) => {
        if (filters.length === 0) {
            set({displayedRows: get().rows})
            return
        }
        let idWhitelist: number[] = []
        filters.forEach(n => {
            console.log(n)
            idWhitelist = idWhitelist.concat(n.productIds)
        })

        set({displayedRows: get().rows.filter(n => idWhitelist.includes(n.id))})
    },
    removeProducts: (productIds) => {
        let data = get().rows.filter(n => !productIds.includes(n.id))
        get().setRows(data)
    },
    moveProduct: (productId, categoryId, s, f) => {
        set({isLoading: true})
        ProductCardAPI.changeCategory(productId, categoryId).then((r) => {
            get().removeProducts([r.data.id])
            s(r.data)
        }).catch(() => {
            f()
        }).finally(() => set({isLoading: false})
        )
    },
    sort: () => {
        if (get().sortMode == 'Сначала дешевые') {
            let sortedRows = Enumerable.from(get().rows).orderBy(n => n.retailPrice).toArray()
            set({rows: sortedRows})
        } else if (get().sortMode == 'Сначала дорогие') {
            let sortedRows = Enumerable.from(get().rows).orderByDescending(n => n.retailPrice).toArray()
            set({rows: sortedRows})
        }
    },
    sortMode: 'По кличеству товара на складе',
    setSortMode: (v) => {
        set({sortMode: v})
    },
    isLoading: false,
    open: false,
    setOpen: (value, x, y) => set({
        contextMenuXY: {X: x, Y: y},
        open: value
    }),
    contextMenuXY: {X: 0, Y: 0},

    rows: [],
    setRows: (data) => {
        set({rows: data})
        if (data.length < 1) {
            set({selectedRows: []})
        }
    },
    isRowSelected: (id) => {
        let inf = get().selectedRows.filter((n) => {
            if (n.id == id) return n
        })
        if (inf.length > 0) return true
        else return false
    },

    selectedRows: [],
    setSelectedRows: (value) => set({selectedRows: value}
    ),

    getProducts: (CategoryId) => {
        set({isLoading: true})

        CatalogAPI.getProductByCategory(CategoryId, 1000).then((r) => {
            set({rows: r.data})
            set({isLoading: false})
            get().sort()
        })
    },
    addNewProduct: (product) => {
        set(state => {
            state.rows.push(product)
            state.selectedRows = [product]
        })
    },
    updateRow: (rowData) => {
        set(state => {
            let row = state.rows.filter((n) => {
                if (n.id == rowData.id) return n
            })[0]
            row.name = rowData.name
            row.manufacturerBarcode = rowData.manufacturerBarcode
            row.b2BVisibility = rowData.b2BVisibility
            row.retailVisibility = rowData.retailVisibility
        })
    },

    setNotSortedToTable: () => {
        set({isLoading: true})
        CatalogAPI.getUnsorted(1).then((r) => {
            console.log(r.data)
            set({
                rows: r.data.map((r) => {
                    return (r.product)
                })
            })
            get().sort()
            set({isLoading: false})
        }).catch((r) => {
            console.log(r)
            set({isLoading: false})
        })
    }
}))), {
    name: "creatProductModalStore",
    version: 1
}));

export default useProductCatalogTableStore;