import {BillWithProducts} from "./BillWithProducts";
import {ServiceWork} from "../entities/Service/ServiceWork";
import {ServiceProduct} from "../entities/Service/ServiceProduct";

export interface CalculatedSalary {
    userId: string,
    periodStart: string,
    periodFinish: string,
    rate: number,
    hours: string,
    billsTotal: number,
    productsTotal: number,
    totalHours: number,
    workTotal: number,
    bills: BillWithProducts[],
    serviceWorks: ServiceWork[],
    seviceProducts: ServiceProduct[]
}