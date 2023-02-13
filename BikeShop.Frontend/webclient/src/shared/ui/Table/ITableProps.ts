export interface ITableProps {
    rows: any[],
    columns: ITableColumn[],
    selectedRowsIds: string[]

    rowOnContext?: () => void,
    rowOnClick?: () => void,
    rowOnDoubleClick?: () => void,
}

export interface ITableColumn {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
}