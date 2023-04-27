import {$api} from "../../../shared"
import {SalaryResponse} from '../../responses/SalaryResponse'
import {AxiosResponse} from 'axios'

export const SalaryAPI = {
    getEmployeeSalaryById(userId: string): Promise<AxiosResponse<SalaryResponse>> {
        return (
            $api.get<SalaryResponse>(`/salary/byuser?UserId=${userId}`)
        )
    },
    updateEmployeeSalary(params: SalaryParams): Promise<AxiosResponse<SalaryResponse>> {
        return (
            $api.put<SalaryResponse>(`/salary/update`, null, {params})
        )
    },
}

export interface SalaryParams {
    userId: string
    rate: number
    shopPercent: number
    workPercent: number
    workshopPercent: number
}