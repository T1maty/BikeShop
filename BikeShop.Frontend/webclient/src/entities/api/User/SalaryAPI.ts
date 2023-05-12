import {$api} from "../../../shared"
import {SalaryResponse} from '../../responses/SalaryResponse'
import {AxiosResponse} from 'axios'
import {UpdateSalaryParams} from "../../requests/UpdateSalaryParams"
import {CalculatedSalary} from "../../models/CalculatedSalary";

export const SalaryAPI = {
    getEmployeeSalaryById(userId: string): Promise<AxiosResponse<SalaryResponse>> {
        return (
            $api.get<SalaryResponse>(`/salary/byuser?UserId=${userId}`)
        )
    },
    updateEmployeeSalary(params: UpdateSalaryParams): Promise<AxiosResponse<SalaryResponse>> {
        return (
            $api.put<SalaryResponse>(`/salary/update`)
        )
    },
    calculateSalary(userId: string, start: string, finish: string): Promise<AxiosResponse<CalculatedSalary>> {
        return (
            $api.get<CalculatedSalary>(`/salary/calculate?UserId=${userId}&Start=${start}&Finish=${finish}`)
        )
    },
}