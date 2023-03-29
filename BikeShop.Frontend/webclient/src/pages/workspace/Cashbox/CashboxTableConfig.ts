export interface Column {
    id: 'productId' | 'name' | 'retailPrice' | 'quantityUnitName' | 'discount' | 'total' | 'quantity';
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
        label: 'Количество',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'quantityUnitName',
        label: 'Единица изменения',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'retailPrice',
        label: 'Цена',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'discount',
        label: 'Скидка',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'total',
        label: 'Всего',
        minWidth: 70,
        align: 'left',
    },
]