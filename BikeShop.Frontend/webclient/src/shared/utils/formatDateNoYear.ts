export const formatDateNoYear = (text: string) => {
    return (text.substring(5,10) + ', ' + text.substring(11,16))
}