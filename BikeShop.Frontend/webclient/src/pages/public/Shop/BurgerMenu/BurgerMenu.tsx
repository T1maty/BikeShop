import React from 'react'
import s from './BurgerMenu.module.scss'

interface BurgerMenuProps {
    // title: string
    // items: any[]
    menuActive: any
    setMenuActive: (value: boolean) => void
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({menuActive, setMenuActive}) => {

    return ( menuActive &&
        <div className={menuActive ? s.burgerMenu_box_active : s.burgerMenu_box}
             onClick={() => {setMenuActive(false)}}
        >
            <div className={s.burgerMenu_blur}/>
            <div className={s.burgerMenu_content} onClick={(e) => {e.stopPropagation()}}>
                <div className={s.burgerMenu_title}>
                    BikeShop
                </div>
                <div className={s.burgerMenu_items}>
                    <div>Главная</div>
                    <div>Каталог</div>
                    <div>Контакты</div>
                </div>

                {/*<ul>*/}
                {/*    {items.map(el => {*/}
                {/*        return (*/}
                {/*            <li>*/}
                {/*                <a href={el.href}>{el.value}</a>*/}
                {/*            </li>*/}
                {/*        )*/}
                {/*    })}*/}
                {/*</ul>*/}
            </div>
        </div>
    )
}