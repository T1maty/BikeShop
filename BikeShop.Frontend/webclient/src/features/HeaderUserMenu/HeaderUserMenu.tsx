import React, {useState} from 'react'
import s from './HeaderUserMenu.module.scss'
import {BikeShopPaths} from "../../app/routes/paths"
import {useTranslation} from "react-i18next"
import {useNavigate} from "react-router-dom"
import useAuthUser from '../../pages/auth/useAuthUser'

interface HeaderUserMenuProps {
    firstName?: string
    lastName?: string
}

export const HeaderUserMenu = (props: HeaderUserMenuProps) => {

    const {t} = useTranslation()
    const navigate = useNavigate()

    const logout = useAuthUser(s => s.logout)
    const setUser = useAuthUser(s => s.setUser)

    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [profileMenuItems, setProfileMenuItems] = useState([
        {
            title: 'Профиль',
            func: () => {
                navigate(BikeShopPaths.WORKSPACE.SERVICE)
                setIsProfileOpen(false)
            }
        },
        {
            title: 'Выйти',
            func: () => {
                navigate(BikeShopPaths.COMMON.LOGIN)
                setIsProfileOpen(false)
            }
        },
    ])

    // const anchorRef = React.useRef<HTMLButtonElement>(null)
    //
    // const handleToggle = () => {
    //     setOpen((prevOpen) => !prevOpen)
    // };
    //
    // const handleClose = (event: Event | React.SyntheticEvent) => {
    //     if (
    //         anchorRef.current &&
    //         anchorRef.current.contains(event.target as HTMLElement))
    //     {
    //         return;
    //     }
    //
    //     setOpen(false)
    // }

    // function handleListKeyDown(event: React.KeyboardEvent) {
    //     if (event.key === 'Tab') {
    //         event.preventDefault()
    //         setOpen(false)
    //     } else if (event.key === 'Escape') {
    //         setOpen(false)
    //     }
    // }

    // function handleLogOut(event: Event | React.SyntheticEvent) {
    //     handleClose(event)
    //     logout()
    //     navigate(BikeShopPaths.COMMON.LOGIN)
    // }
    //
    // // return focus to the button when we transitioned from !open -> open
    // const prevOpen = React.useRef(open)
    //
    // useEffect(() => {
    //     if (prevOpen.current === true && open === false) {
    //         anchorRef.current!.focus();
    //     }
    //     prevOpen.current = open;
    // }, [open])

    return (
        <div className={s.leftSide_burgerMenu}
             onClick={() => {setIsProfileOpen(!isProfileOpen)}}
        >
            <div className={s.burgerMenu_iconButton}>UserName</div>
            {
                isProfileOpen ?
                    <div className={s.burgerMenu_menuList}>
                        {profileMenuItems.map(item => (
                            <div className={s.menuList_item}
                                 key={item.title}
                                 onClick={item.func}
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>

                    : ''
            }

            {/*<Button*/}
            {/*    ref={anchorRef}*/}
            {/*    id="composition-button"*/}
            {/*    aria-controls={open ? 'composition-menu' : undefined}*/}
            {/*    aria-expanded={open ? 'true' : undefined}*/}
            {/*    aria-haspopup="true"*/}
            {/*    onClick={handleToggle}*/}
            {/*>*/}
            {/*    {props.firstName == undefined && props.lastName == undefined ? "NoName" : `${props.firstName} ${props.lastName}`}*/}
            {/*</Button>*/}
            {/*<Popper*/}
            {/*    open={open}*/}
            {/*    anchorEl={anchorRef.current}*/}
            {/*    role={undefined}*/}
            {/*    placement="bottom-start"*/}
            {/*    transition*/}
            {/*    disablePortal*/}
            {/*>*/}
            {/*    {({TransitionProps, placement}) => (*/}
            {/*        <Grow*/}
            {/*            {...TransitionProps}*/}
            {/*            style={{*/}
            {/*                transformOrigin:*/}
            {/*                    placement === 'bottom-start' ? 'left top' : 'left bottom',*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <Paper>*/}
            {/*                <ClickAwayListener onClickAway={handleClose}>*/}
            {/*                    <MenuList*/}
            {/*                        autoFocusItem={open}*/}
            {/*                        id="composition-menu"*/}
            {/*                        aria-labelledby="composition-button"*/}
            {/*                        onKeyDown={handleListKeyDown}*/}
            {/*                    >*/}
            {/*                        <MenuItem onClick={handleClose}>Profile</MenuItem>*/}
            {/*                        <MenuItem onClick={handleClose}>My account</MenuItem>*/}
            {/*                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>*/}
            {/*                    </MenuList>*/}
            {/*                </ClickAwayListener>*/}
            {/*            </Paper>*/}
            {/*        </Grow>*/}
            {/*    )}*/}
            {/*</Popper>*/}
        </div>
    )
}