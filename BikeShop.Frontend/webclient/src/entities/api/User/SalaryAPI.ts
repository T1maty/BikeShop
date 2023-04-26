import {$api} from "../../../shared"
import {SalaryResponse} from '../../responses/SalaryResponse'
import {AxiosResponse} from 'axios'

export const SalaryAPI = {
    getEmployeeSalaryById(userId: number): Promise<AxiosResponse<SalaryResponse>> {
        return (
            $api.get<SalaryResponse>(`/salary/byuser?UserId=${userId}`)
        )
    },
    updateEmployeeSalary(params: SalaryParams): Promise<AxiosResponse<SalaryResponse>> {
        return (
            $api.put<SalaryResponse>(`/shift/openshift`, null, {params})
        )
    },
}

export interface SalaryParams {
    userId: string
    rate: number
    shopPercent: number
    workPercent: number
    workShopPercent: number
}