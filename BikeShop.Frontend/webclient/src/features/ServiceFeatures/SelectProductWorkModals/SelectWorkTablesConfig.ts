export interface Column {
    id: 'id' | 'name' | 'price' | 'description';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
}

export const masterColumns: Column[] = [
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
        label: 'Цена',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'description',
        label: 'Описание',
        minWidth: 70,
        align: 'left',
    },
]

export const slaveColumns: Column[] = [
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
        label: 'Цена',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'description',
        label: 'Описание',
        minWidth: 70,
        align: 'left',
    },
]