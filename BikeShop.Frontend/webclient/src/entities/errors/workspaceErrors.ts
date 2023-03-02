interface error {
    id: string
    name: string
    description: string
}

export const Errors: error[] = [
    {
        id: '1',
        name: 'Поле обязательно для заполнения 111',
        description: 'Валидация формы создания клиента'
    },
    {
        id: '2',
        name: 'Поле обязательно для заполнения 222',
        description: 'Валидация формы создания сервиса'
    },
]