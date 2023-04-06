import React, {type FC} from 'react'
import {useTranslation} from 'react-i18next'
import {Button} from "../../../../shared/ui"

interface LangSwitcherProps {
    className?: string
}

export const LangSwitcher: FC<LangSwitcherProps> = ({className = ''}) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
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

            <div className={className}
                 // open={open}
                 // onClose={handleClose}
            >
                <div onClick={() => toggleLanguage('en')}>
                    EN
                </div>
                <div onClick={() => toggleLanguage('ru')}>
                    RU
                </div>
                <div onClick={() => toggleLanguage('ua')}>
                    UA
                </div>
            </div>
        </>
    )
}