interface error {
    id: string,
    name: string,
    description: string
}

export const Errors: error[] = [
    {
        id: '1',
        name: 'Поле обязательно для заполнения',
        description: 'валидация формы'
    },
]