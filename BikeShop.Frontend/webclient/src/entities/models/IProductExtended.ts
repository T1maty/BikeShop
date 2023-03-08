import {IProduct} from "./Product";
import {IQuantityUnit} from "./IQuantityUnit";

export interface IProductExtended {
    product: IProduct

    quantityUnit: IQuantityUnit
    quantity: number
}