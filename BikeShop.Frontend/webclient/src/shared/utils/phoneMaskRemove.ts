export const phoneMaskRemove = (value: string) => {
    return value.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll(' ', '')
}