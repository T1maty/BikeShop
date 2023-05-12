import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {ServiceProduct} from "../../../entities";

interface selectProductStore {
    convert: (product: any, master: string) => ServiceProduct
}

const useSelectProduct = create<selectProductStore>()(persist(devtools(immer((set) => ({
    slaveTableRows: [],

    convert: (product, master) => {
        let newProduct: ServiceProduct = {
            id: 0,
            productId: product.id,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            enabled: product.enabled,
            name: product.name,
            quantity: product.quantity,

            price: product.retailPrice,
            discount: 0,
            total: 0,
            userId: master,
            serviceId: 0,

            catalogKey: product.catalogKey,
            serialNumber: '',
            quantityUnitId: 1,
            quantityUnitName: 'шт'
        }
        return newProduct
    }
}))), {
    name: "selectProductStore",
    version: 1
}));

export default useSelectProduct