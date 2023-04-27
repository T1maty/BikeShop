import {ServiceProduct} from "../entities/Service/ServiceProduct";
import {ServiceWork} from "../entities/Service/ServiceWork";

export interface ServiceFormModel {
    id: number,
    name: string,
    clientDescription: string,
    userMasterDescription: string,
    userCreatedDescription: string,
    userId: string,
    userMasterId: string,
    workDiscountId: number,
    productDiscountId: number,
    shopId: number,
    clientId: string,
    serviceProducts: ServiceProduct[],
    serviceWorks: ServiceWork[]
}