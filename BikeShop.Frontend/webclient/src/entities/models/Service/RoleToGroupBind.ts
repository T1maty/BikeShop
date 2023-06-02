export interface RoleToGroupBind {
    id: number;
    createdAt: string;
    updatedAt: string;
    enabled: boolean;
    role: string;
    description: string;
    groupName: string;
    roleGroupId: number;
}