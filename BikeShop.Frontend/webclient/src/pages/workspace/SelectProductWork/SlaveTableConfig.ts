export interface Column {
    id: 'id' | 'name' | 'quantity' | 'price' | 'description';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
    isEditable?: boolean
    isNumber?: boolean
}

export const columns: Column[] = [
    {
        id: 'id',
        label: 'Артикул',
        minWidth: 70,
        align: 'right',
        isEditable: false
    },
    {
        id: 'name',
        label: 'Название',
        minWidth: 70,
        align: 'right',
        isEditable: true
    },
    {
        id: 'quantity',
        label: 'Кличество',
        minWidth: 70,
        align: 'right',
        isEditable: true,
        isNumber: true
    },
    {
        id: 'price',
        label: 'Цена',
        minWidth: 70,
        align: 'left',
        isEditable: false,
        isNumber: true
    },
    {
        id: 'description',
        label: 'Описание',
        minWidth: 70,
        align: 'right',
        isEditable: true
    },

]