import {UniTableColumn} from "../../entities";

export const Columns: UniTableColumn[] = [
    {
        id: 'id',
        label: 'Id',
        minWidth: 30,
        align: 'left',
    },
    {
        id: 'lastName',
        label: 'Фамилия',
        minWidth: 120,
        align: 'center',
    },
    {
        id: 'firstName',
        label: 'Имя',
        minWidth: 70,
        align: 'center',
    },
    {
        id: 'patronymic',
        label: 'Отчество',
        minWidth: 70,
        align: 'center',
    },
    {
        id: 'balance',
        label: 'Баланс',
        minWidth: 70,
        align: 'center',
        isCurrency: true
    },
    {
        id: 'creditLimit',
        label: 'Кредитный лимит',
        minWidth: 70,
        align: 'center',
        isCurrency: true
    },
    {
        id: 'phoneNumber',
        label: 'Телефон',
        minWidth: 70,
        align: 'center',
    },
]