import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {IProductExtended} from "../../../entities";
import {ServiceItemProduct} from "../../../entities/models/ServiceItem";

interface selectProductStore {
    convert: (product: IProductExtended) => ServiceItemProduct
}

const useSelectProduct = create<selectProductStore>()(persist(devtools(immer((set) => ({
    slaveTableRows: [],

    convert: (product) => {


        let newProduct: ServiceItemProduct = {
            id: 0,
            productId: product.product.id,
            createdAt: product.product.createdAt,
            updatedAt: product.product.updatedAt,
            enabled: product.product.enabled,
            name: product.product.name,
            quantity: product.quantity,

            price: product.product.retailPrice,
            discount: 0,
            total: 0,
            userId: 'f8bc35af-27c0-4d2b-895a-db36c52e7b2b',
            serviceId: 0,

            catalogKey: product.product.catalogKey,
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