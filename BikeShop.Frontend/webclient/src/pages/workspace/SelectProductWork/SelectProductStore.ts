import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {ServiceItemProduct} from "../../../entities/models/ServiceItem";

interface selectProductStore {
    convert: (product: any) => ServiceItemProduct
}

const useSelectProduct = create<selectProductStore>()(persist(devtools(immer((set) => ({
    slaveTableRows: [],

    convert: (product) => {


        let newProduct: ServiceItemProduct = {
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
            userId: 'c04b07d5-441b-4630-87b0-97b889855556',
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