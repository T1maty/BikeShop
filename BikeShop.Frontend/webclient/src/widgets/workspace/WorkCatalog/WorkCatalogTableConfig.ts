import {UniTableColumn} from "../../../entities"

export const columns: UniTableColumn[] = [
    {
        id: 'id',
        label: 'Артикул',
        width: 10,
        minWidth: 70,
        align: 'center',
    },
    {
        id: 'name',
        label: 'Название',
        width: 50,
        minWidth: 70,
        align: 'center',
    },
    {
        id: 'price',
        label: 'Цена',
        width: 10,
        minWidth: 70,
        align: 'center',
        isCurrency: true
    },
    {
        id: 'description',
        label: 'Описание',
        width: 20,
        minWidth: 70,
        align: 'left',
        limit: 80
    },
]