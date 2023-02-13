import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {$api} from "shared";
import {IProduct, IProductResponse, IUpdateProduct} from "../../../entities";

interface productCatalogTableStore {
    contextMenuXY: { X: number, Y: number }
    selectedRows: IProduct[]
    rowsPerPage: number
    open: boolean
    page: number
    rows: IProduct[]

    setOpen: (value: boolean, X: number, Y: number) => void
    addNewProduct: (product: IProduct) => void
    updateRow: (rowData: IUpdateProduct) => void
    setSelectedRows: (ids: number[]) => void
    setRowsPerPage: (value: number) => void
    isRowSelected: (id: number) => boolean
    setPage: (value: number) => void
    setRows: (data: IProduct[]) => void
    getProducts: () => Promise<AxiosResponse<IProductResponse>>
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
    },
    setOpen: (value, x, y) => set({
        contextMenuXY: {X: x, Y: y},
        open: value
    }),
    setSelectedRows: (ids) => set({
        selectedRows: get().rows.filter(n => {
            if (ids.includes(n.id)) return n
        })
    }),
    isRowSelected: (id) => {
        let inf = get().selectedRows.filter((n) => {
            if (n.id == id) return n
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
    getProducts: () => {
        return $api.get<IProductResponse>('/product/getbytags/1')
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