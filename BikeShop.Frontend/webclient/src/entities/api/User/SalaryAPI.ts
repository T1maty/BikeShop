import {$api} from "../../../shared"
import {SalaryResponse} from '../../responses/SalaryResponse'
import {AxiosResponse} from 'axios'
import {UpdateSalaryParams} from "../../requests/UpdateSalaryParams"
import {CalculatedSalary} from "../../models/CalculatedSalary";
import {SalaryPaymentHistory} from "../../entities/SalaryPaymentHistory";

export const SalaryAPI = {
    getEmployeeSalaryById(userId: string): Promise<AxiosResponse<SalaryResponse>> {
        return (
            $api.get<SalaryResponse>(`/salary/byuser?UserId=${userId}`)
        )
    },
    updateEmployeeSalary(p: UpdateSalaryParams): Promise<AxiosResponse<SalaryResponse>> {
        return (
            $api.put<SalaryResponse>(`/salary/update?UserId=${p.userId}&Rate=${p.rate}&ShopPercent=${p.shopPercent}&WorkPercent=${p.workPercent}&WorkshopPercent=${p.workshopPercent}`)
        )
    },
    calculateSalary(userId: string, start: string | null, finish: string | null): Promise<AxiosResponse<CalculatedSalary>> {
        return (
            $api.get<CalculatedSalary>(`/salary/calculate?UserId=${userId}&Start=${start}&Finish=${finish}`)
        )
    },
    history(userId: string): Promise<AxiosResponse<SalaryPaymentHistory[]>> {
        return (
            $api.get<SalaryPaymentHistory[]>(`/payoutact/salaryhistory?user=${userId}`)
        )
    },
}