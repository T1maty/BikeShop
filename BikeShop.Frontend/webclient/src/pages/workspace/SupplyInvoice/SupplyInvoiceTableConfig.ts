export interface Column {
    id: 'id' | 'name' | 'quantity' | 'quantityUnitName' | 'incomePrice' | 'catalogKey';
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
        label: 'Количество',
        minWidth: 70,
        align: 'right',
    },
    {
        id: 'quantityUnitName',
        label: 'Ед.Изм.',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'incomePrice',
        label: 'Приходная цена',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'catalogKey',
        label: 'Каталожный номер',
        minWidth: 70,
        align: 'left',
    },
]