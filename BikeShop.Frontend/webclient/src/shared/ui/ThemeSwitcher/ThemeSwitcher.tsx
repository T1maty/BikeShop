import React, {type FC} from 'react'
import {Theme, useTheme} from 'app/providers/ThemeProvider'
import {Button} from "../index"

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({className = ''}) => {

    const {theme, toggleTheme} = useTheme()

    return (
        <Button
            onClick={toggleTheme}>
            {theme === Theme.DARK ? <>Темная</> : <>Светлая</>}
        </Button>
    )
}
