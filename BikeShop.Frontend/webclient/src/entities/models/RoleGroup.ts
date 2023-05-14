import {RoleGroupResponse} from "../responses/RoleGroupResponse"

export interface RoleGroup {
    group: RoleGroupResponse,
    roles: [
        {
            id: number
            role: string
            description: string
            groupName: string
            roleGroupId: number
            createdAt: string
            updatedAt: string
            enabled: boolean
        }
    ]
}