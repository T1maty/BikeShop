import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {$api} from "shared";
import {IProductExtended, IUpdateProduct} from "../../../entities";

interface productCatalogTableStore {
    contextMenuXY: { X: number, Y: number }
    selectedRows: IProductExtended[]
    rowsPerPage: number
    open: boolean
    page: number
    rows: IProductExtended[]

    setOpen: (value: boolean, X: number, Y: number) => void
    addNewProduct: (product: IProductExtended) => void
    updateRow: (rowData: IUpdateProduct) => void
    setSelectedRows: (ids: number[]) => void
    setRowsPerPage: (value: number) => void
    isRowSelected: (id: number) => boolean
    setPage: (value: number) => void
    setRows: (data: IProductExtended[]) => void
    getProducts: (tags: string[]) => Promise<AxiosResponse<IProductExtended[]>>
}

const useProductCatalogTableStore = create<productCatalogTableStore>()(persist(devtools(immer((set, get) => ({
    contextMenuXY: {X: 0, Y: 0},
    selectedRows: [],
    rowsPerPage: 50,
    rows: [],
    open: false,
    page: 0,

    setRows: (data) => {
        set({rows: data})
        if (data.length < 1) {
            set({selectedRows: []})
        }
    },
    setOpen: (value, x, y) => set({
        contextMenuXY: {X: x, Y: y},
        open: value
    }),
    setSelectedRows: (ids) => set({
        selectedRows: get().rows.filter(n => {
            if (ids.includes(n.product.id)) return n
        })
    }),
    isRowSelected: (id) => {
        let inf = get().selectedRows.filter((n) => {
            if (n.product.id == id) return n
        })
        if (inf.length > 0) return true
        else return false
    },
    setPage: (value) => {
        set({page: value})
    },
    setRowsPerPage: (value) => {
        set({rowsPerPage: value})
    },
    getProducts: (tags) => {
        let value = ""
        tags.forEach((n) => {
            value = value.concat(n + '-')
        })
        value = value.slice(0, -1)
        return $api.get<IProductExtended[]>('/product/getbytags/' + value + ',1')
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
    addNewProduct: (product) => {
        set(state => {
            state.rows.push(product)
            state.selectedRows = [product]
        })
    }
}))), {
    name: "creatProductModalStore",
    version: 1
}));

export default useProductCatalogTableStore;