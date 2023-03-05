import React, {useState} from 'react'
import s from './ShopHeader.module.scss'
import burgerMenu from "../../../../shared/assets/shop/icons/menu.png"
import searchIcon from "../../../../shared/assets/shop/icons/search.png"
import cart from "../../../../shared/assets/shop/icons/cart.png"
import language from "../../../../shared/assets/shop/icons/lang.png"
import profile from "../../../../shared/assets/shop/icons/profile.png"
import {TextField} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

export const ShopHeader = () => {

    const [search, setSearch] = useState<boolean>(false)

    return (
        <div className={s.shop_header}>
            <div className={s.shop_header_left}>
                <img src={burgerMenu} alt="burger-menu"/>
            </div>
            <div className={s.shop_header_right}>
                {
                    search ?
                        <div>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                style={{ height: '38px', width: '400px' }}
                                // placeholder={placeholder}
                                // value={search || ''}
                                // onChange={searchHandler}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end" style={{ cursor: 'pointer' }}>
                                            <ClearIcon onClick={() => {}} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        : ''
                }
                <div onClick={() => {setSearch(!search)}}>
                    <img src={searchIcon} alt="search-logo"/>
                </div>
                <div><img src={cart} alt="cart-logo"/></div>
                <div><img src={language} alt="language-logo"/></div>
                <div><img src={profile} alt="profile-logo"/></div>
            </div>
        </div>
    );
};