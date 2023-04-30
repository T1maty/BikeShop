import React from 'react'
import s from './Header.module.scss'
import {HeaderShopMenu, HeaderUserMenu} from "../../../../features"
import {useNavigate} from "react-router-dom"
import {useTranslation} from "react-i18next"
import {Clock} from "../../../../shared/ui/Clock/Clock"
import {NotificationIcon} from "../../../../shared/ui/IconButtons/NotificationIcon"
import {Badge} from "../../../../shared/ui/Badge/Badge"
import {BikeShopPaths} from "../../../../app/routes/paths"
import {useAuth, useCurrency} from "../../../../entities"
import Select from "react-select"

export const Header = () => {

    const {t} = useTranslation()
    const navigate = useNavigate()

    const user = useAuth(s => s.user)
    const shop = useAuth(s => s.shop)

    const selectedCurrency = useCurrency(n => n.selectedCurrency)
    const setSelectedCurrency = useCurrency(n => n.setSelectedCurrency)
    const allCurrencies = useCurrency(n => n.allCurrencies)

    const colourStyles = {
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

    return (
        <div className={s.appBar}>
            <div className={s.content}>
                <div className={s.leftSide}>
                    <HeaderShopMenu/>
                    <div className={s.leftSide_shopTitle}
                         onClick={() => {navigate(BikeShopPaths.WORKSPACE.MAIN_PAGE)}}
                    >
                        {shop ? shop.name : 'Магазин не выбран'}
                    </div>
                </div>

                <div className={s.center}>
                    <div className={s.clock}>
                        <Clock/>
                    </div>
                    <div className={s.currency}>
                        <Select options={allCurrencies}
                                value={selectedCurrency}
                                onChange={(v) => {setSelectedCurrency(v!.id)}}
                                getOptionLabel={label => label.name}
                                styles={colourStyles}
                        />
                    </div>
                </div>

                <div className={s.rightSide}>
                    <HeaderUserMenu user={user!}/>
                    <Badge badgeContent={3}>
                        <NotificationIcon/>
                    </Badge>
                </div>
            </div>
        </div>
    )
}
