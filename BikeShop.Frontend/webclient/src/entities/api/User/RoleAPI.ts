import {$api} from "../../../shared"
import {Role} from "../../models/Role"
import {AxiosResponse} from "axios"
import {RoleGroup} from "../../models/RoleGroup"
import {CreateRole} from "../../requests/CreateRole"
import {SetRoleToGroupRequestParams} from "../../requests/SetRoleToGroupRequestParams"
import {CreateRoleGroup} from "../../requests/CreateRoleGroup"
import {RoleGroupResponse} from "../../responses/RoleGroupResponse";
import {UserWithRoles} from "../../models/Auth/UserWithRoles";

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
    createRoleGroup(params: CreateRoleGroup): Promise<AxiosResponse<RoleGroupResponse>> {
        return (
            $api.post<RoleGroupResponse>(`/role/creategroup?name=${params.name}&description=${params.description}`)
        )
    },
    createRole(name: string): Promise<AxiosResponse<CreateRole>> {
        return (
            $api.post<CreateRole>(`/role/create?Name=${name}`)
        )
    },
    setRoleToGroup(data: SetRoleToGroupRequestParams): Promise<AxiosResponse<RoleGroup>> {
        return (
            $api.put<RoleGroup>(`/role/setroletogroup?Role=${data.role}&GroupId=${data.groupId}&Description=${data.description}`)
        )
    },
    removeRoleFromGroup(groupId: number, role: string): Promise<AxiosResponse<RoleGroup>> {
        return (
            $api.delete<RoleGroup>(`/role/removerolefromgroup?GroupId=${groupId}&Role=${role}`)
        )
    },
    removeRoleFromUser(userId: string, role: string): Promise<AxiosResponse<UserWithRoles>> {
        return (
            $api.delete<UserWithRoles>(`/role/removerolefromuser?UserId=${userId}&Role=${role}`)
        )
    },
    setGroupToUser(groupId: number, userId: string): Promise<AxiosResponse<UserWithRoles>> {
        return (
            $api.put<UserWithRoles>(`/role/setgrouptouser?GroupId=${groupId}&UserId=${userId}`)
        )
    },
    setRoleToUser(role: string, userId: string): Promise<AxiosResponse<UserWithRoles>> {
        return (
            $api.put<UserWithRoles>(`/role/setroletouser?Role=${role}&UserId=${userId}`)
        )
    },
}

