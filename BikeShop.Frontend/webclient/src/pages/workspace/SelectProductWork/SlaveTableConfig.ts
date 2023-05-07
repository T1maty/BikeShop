import {UniTableColumn} from "../../../entities"

export const columns: UniTableColumn[] = [
    {
        id: 'productId',
        label: 'Артикул',
        width: 15,
        minWidth: 70,
        align: 'center',
        isEditable: false
    },
    {
        id: 'name',
        label: 'Название',
        width: 50,
        minWidth: 70,
        align: 'center',
    },
    {
        id: 'quantity',
        label: 'Количество',
        width: 15,
        minWidth: 70,
        align: 'center',
        isEditable: true,
        isNumber: true
    },
    {
        id: 'price',
        label: 'Цена',
        width: 20,
        minWidth: 70,
        align: 'center',
        isNumber: true,
        isCurrency: true
    },
]