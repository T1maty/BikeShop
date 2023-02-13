import React, {type FC} from 'react'
import {useTranslation} from 'react-i18next'
import Button from "@mui/material/Button";
import {MenuItem} from "@mui/material";
import Menu from "@mui/material/Menu";


interface LangSwitcherProps {
    className?: string
}

export const LangSwitcher: FC<LangSwitcherProps> = ({className = ''}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const {t, i18n} = useTranslation()

    const toggleLanguage = (language: string): void => {
        void i18n.changeLanguage(language) // добавить переключение языка UA
    }

    return (
        <>
            <Button
                sx={{backgroundColor: '#7c7c7c'}}
                variant="contained"
                id="basic-button"
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
