export interface UniTableColumn {
    id: string;
    label: string;
    minWidth?: number;
    maxWidth?: number;
    align?: 'right' | 'left' | 'center';
    isEditable?: boolean
    isNumber?: boolean
}