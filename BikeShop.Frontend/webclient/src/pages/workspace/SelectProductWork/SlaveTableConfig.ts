export interface Column {
    id: 'productId' | 'name' | 'quantity' | 'quantityUnitName' | 'price' | 'catalogKey';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
}

export const columns: Column[] = [
    {
        id: 'productId',
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
        id: 'quantityUnitName',
        label: 'Ед.Изм',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'price',
        label: 'Цена',
        minWidth: 70,
        align: 'right',
    },

    {
        id: 'catalogKey',
        label: 'Каталожный номер',
        minWidth: 70,
        align: 'right',
    },
]