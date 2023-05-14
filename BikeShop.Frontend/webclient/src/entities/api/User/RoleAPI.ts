import {$api} from "../../../shared"
import {Role} from "../../models/Role"
import {AxiosResponse} from "axios"
import {RoleGroup} from "../../models/RoleGroup"
import {RoleGroupResponse} from "../../responses/RoleGroupResponse"
import {CreateRole} from "../../requests/CreateRole"
import {SetRoleToGroupRequestParams} from "../../requests/SetRoleToGroupRequestParams"
import {CreateRoleGroup} from "../../requests/CreateRoleGroup"
import {SetRoleGroupToUserRequestParams} from "../../requests/SetRoleGroupToUserRequestParams"
import {SetRoleGroupToUserResponse} from "../../responses/SetRoleGroupToUserResponse"
import {SetRoleToUserRequestParams} from "../../requests/SetRoleToUserRequestParams"

export const RoleAPI = {
    getAllRoles(): Promise<AxiosResponse<Role[]>> {
        return (
            $api.get<Role[]>('/role/getall')
        )
    },
    getAllRoleGroups(): Promise<AxiosResponse<RoleGroup[]>> {
        return (
            $api.get<RoleGroup[]>('/role/getallgroups')
        )
    },
    createRoleGroup(params: CreateRoleGroup): Promise<AxiosResponse<any>> {
        return (
            $api.post<any>(`/role/creategroup?name=${params.name}&description=${params.description}`)
            // $api.post<any>(`/role/creategroup`, {}, {
            //     params: {
            //         name: params.name,
            //         description: params.description,
            //     }
            // })
        )
    },
    createRole(name: string): Promise<AxiosResponse<CreateRole>> {
        return (
            $api.post<CreateRole>(`/role/creategroup?name=${name}`)
        )
    },
    setRoleToGroup(data: SetRoleToGroupRequestParams): Promise<AxiosResponse<RoleGroup>> {
        return (
            $api.put<RoleGroup>('/role/setroletogroup', data)
        )
    },
    setGroupToUser(data: SetRoleGroupToUserRequestParams): Promise<AxiosResponse<SetRoleGroupToUserResponse>> {
        return (
            $api.put<SetRoleGroupToUserResponse>('/role/setgrouptouser', data)
        )
    },
    setRoleToUser(data: SetRoleToUserRequestParams): Promise<AxiosResponse<SetRoleGroupToUserResponse>> {
        return (
            $api.put<SetRoleGroupToUserResponse>('/role/setroletouser', data)
        )
    },
}

