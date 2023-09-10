export interface ProductFilter {
    id: number;
    createdAt: string;
    updatedAt: string;
    enabled: boolean;
    name: string;
    groupName: string;
    isCollapsed: boolean;
    isRetailVisible: boolean;
    isB2BVisible: boolean;
    sortOrder: number;
    groupSortOrder: number;
}