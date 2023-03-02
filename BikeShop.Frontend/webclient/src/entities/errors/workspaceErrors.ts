interface error {
    id: string
    name: string
    description: string
}

export const Errors: error[] = [
    {
        id: '1',
        name: 'Поле обязательно для заполнения',
        description: 'Валидация формы на обязательное заполнение'
    },
    {
        id: '2',
        name: 'Текст ошибки',
        description: 'Валидация формы'
    },
]