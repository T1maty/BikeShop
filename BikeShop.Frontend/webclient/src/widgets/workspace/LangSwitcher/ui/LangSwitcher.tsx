import React, {type FC} from 'react'
import {useTranslation} from 'react-i18next'
import {MenuItem} from "@mui/material"
import Menu from "@mui/material/Menu"
import {Button} from "../../../../shared/ui"

interface LangSwitcherProps {
    className?: string
}

export const LangSwitcher: FC<LangSwitcherProps> = ({className = ''}) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        console.log('test')
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const {t, i18n} = useTranslation()

    const toggleLanguage = (language: string): void => {
        void i18n.changeLanguage(language) // добавить переключение языка UA
    }

    return (
        <>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {t('Language')}
            </Button>

            <Menu
                id="demo-customized-menu"
                className={className}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => toggleLanguage('en')}>
                    EN
                </MenuItem>
                <MenuItem onClick={() => toggleLanguage('ru')}>
                    RU
                </MenuItem>
                <MenuItem onClick={() => toggleLanguage('ua')}>
                    UA
                </MenuItem>
            </Menu>
        </>
    )
}