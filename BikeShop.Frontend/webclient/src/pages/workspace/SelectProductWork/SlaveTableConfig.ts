export interface Column {
    id: 'id' | 'name' | 'quantity' | 'price' | 'description';
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
        id: 'quantity',
        label: 'Кличество',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'price',
        label: 'Цена',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'description',
        label: 'Описание',
        minWidth: 70,
        align: 'right',
    },

]