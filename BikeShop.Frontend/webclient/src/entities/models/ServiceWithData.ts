import {Service} from "../entities/Service/Service";
import {ServiceProduct} from "../entities/Service/ServiceProduct";
import {ServiceWork} from "../entities/Service/ServiceWork";

export interface ServiceWithData {
    service: Service
    products: ServiceProduct[]
    works: ServiceWork[]
}