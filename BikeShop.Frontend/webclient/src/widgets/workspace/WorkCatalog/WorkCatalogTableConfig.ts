export interface Column {
    id: 'id' | 'name' | 'price' | 'description';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
}

export const columns: Column[] = [
    {
        id: 'id',
        label: 'Артикул',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'name',
        label: 'Название',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'price',
        label: 'На складе',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'description',
        label: 'Ед.Изм',
        minWidth: 70,
        align: 'left',
    },
]