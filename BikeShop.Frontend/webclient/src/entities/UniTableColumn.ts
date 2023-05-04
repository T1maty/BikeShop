export interface UniTableColumn {
    id: string;
    label: string;
    minWidth?: number;
    maxWidth?: number;
    align?: "center" | "right" | "left";
    isEditable?: boolean
    isNumber?: boolean
    isCurrency?: boolean
}