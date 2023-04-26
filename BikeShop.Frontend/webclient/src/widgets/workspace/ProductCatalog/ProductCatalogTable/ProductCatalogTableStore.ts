import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {CatalogAPI, ProductExtended, UpdateProduct} from "../../../../entities"

interface productCatalogTableStore {
    isLoading: boolean
    open: boolean
    setOpen: (value: boolean, X: number, Y: number) => void
    contextMenuXY: { X: number, Y: number }

    page: number
    setPage: (value: number) => void

    rows: ProductExtended[]
    setRows: (data: ProductExtended[]) => void
    rowsPerPage: number
    setRowsPerPage: (value: number) => void
    isRowSelected: (id: number) => boolean
    selectedRows: ProductExtended[]
    setSelectedRows: (value: ProductExtended[]) => void

    getProducts: (tags: string[]) => void
    addNewProduct: (product: ProductExtended) => void
    updateRow: (rowData: UpdateProduct) => void

    setNotSortedToTable: () => void
}

const useProductCatalogTableStore = create<productCatalogTableStore>()(persist(devtools(immer((set, get) => ({
    isLoading: false,
    open: false,
    setOpen: (value, x, y) => set({
        contextMenuXY: {X: x, Y: y},
        open: value
    }),
    contextMenuXY: {X: 0, Y: 0},

    page: 0,
    setPage: (value) => {
        set({page: value})
    },

    rows: [],
    setRows: (data) => {
        set({rows: data})
        if (data.length < 1) {
            set({selectedRows: []})
        }
    },
    rowsPerPage: 50,
    setRowsPerPage: (value) => {
        set({rowsPerPage: value})
    },
    isRowSelected: (id) => {
        let inf = get().selectedRows.filter((n) => {
            if (n.product.id == id) return n
        })
        if (inf.length > 0) return true
        else return false
    },

    selectedRows: [],
    setSelectedRows: (value) => set({selectedRows: value}
    ),

    getProducts: (tags) => {
        let value = ''
        tags.forEach((n) => {value = value.concat(n + '-')})
        value = value.slice(0, -1)

        set({isLoading: true})

        CatalogAPI.getProductByTag(value).then((r) => {
            set({rows: r.data})
            set({isLoading: false})
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
                if (n.product.id == rowData.id) return n
            })[0]
            row.product.name = rowData.name
            row.product.manufacturerBarcode = rowData.manufacturerBarcode
            row.product.b2BVisibility = rowData.b2BVisibility
            row.product.retailVisibility = rowData.retailVisibility
        })
    },

    setNotSortedToTable: () => {
        set({isLoading: true})
        CatalogAPI.getUnsorted(1).then((r) => {
            console.log(r.data)
            set({rows: r.data})
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