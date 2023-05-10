import React, {ReactElement, useEffect} from 'react'
import {BikeShopPaths} from 'app/routes/paths'
import {useNavigate} from "react-router-dom"
import {useAuth} from "../../../entities";

interface CheckAuthRouteProps {
    children: ReactElement
}

export const CheckAuthEmployee: React.FC<CheckAuthRouteProps> = ({children}) => {
    const navigate = useNavigate();
    const user = useAuth(s => s.user)
    const shop = useAuth(s => s.shop)
    const loginToShop = useAuth(s => s.loginToShop)


    useEffect(() => {
        if (localStorage.getItem('accessToken') === null || user === undefined) {
            navigate(BikeShopPaths.COMMON.LOGIN)
        }
        if (user != undefined && user.shopId > 0) {
            if (shop === undefined) {
                loginToShop(user?.shopId!);
            }
        } else {
            navigate(BikeShopPaths.SHOP.HOME)
        }
    }, [user])

    useEffect(() => {
        if (shop != undefined) loginToShop(shop.id)
    }, [])

    return (
        <div>
            {children}
        </div>
    );
};

// пример
// import { Navigate, Outlet } from 'react-router-dom'
//
// import { selectIsLoggedIn } from '../../../features/Login/loginSelectors'
// import { useAppSelector } from '../../hooks/useAppSelector'
// import { PATH } from '../../path/path'
//
// export const PrivateRoutes = () => {
//     const isLoggedIn = useAppSelector(selectIsLoggedIn)
//
//     return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN.LOGIN} />
// }