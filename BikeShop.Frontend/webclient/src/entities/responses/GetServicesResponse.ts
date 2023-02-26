import {CreateServiceResponse} from "./CreateServiceResponse";

export interface GetServicesResponse extends Omit <CreateServiceResponse, 'shopId'> {
    productDiscount: DiscountType
    workDiscount: DiscountType
}

interface DiscountType {
    id: number
    name: string
    description: string
}