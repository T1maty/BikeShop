import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {IProductExtended} from "../../../entities";

interface selectProductStore {
    slaveTableRows: IProductExtended[]
    setSlaveTableRows: (rows: IProductExtended[]) => void
    addProduct: (product: IProductExtended) => void
}

const useSelectProduct = create<selectProductStore>()(persist(devtools(immer((set) => ({
    slaveTableRows: [],
    setSlaveTableRows: (rows) => {
        set({slaveTableRows: rows})
    },
    addProduct: (product) => {
        set(state => {
            state.slaveTableRows.push(product)
        })
    }
}))), {
    name: "selectProductStore",
    version: 1
}));

export default useSelectProduct