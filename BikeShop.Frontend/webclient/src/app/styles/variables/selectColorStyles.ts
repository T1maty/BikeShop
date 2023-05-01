export const selectColorStyles = {
    // @ts-ignore
    option: (styles, {isFocused, isSelected}) => ({
        ...styles,
        background: isFocused
            ? '#1876D1'
            : isSelected
                ? '#fff'
                : undefined,
        zIndex: 1,
        color: 'black'
    }),
    // menuList: (styles: any) => ({
    //     ...styles,
    //     background: 'papayawhip'
    // }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: 'white',
        color: 'black'
    })
}