import React, {ReactElement, useEffect} from 'react'
import {BikeShopPaths} from 'app/routes/paths'
import {useNavigate} from "react-router-dom"
import {useAuth} from "../../../entities";

interface CheckAuthRouteProps {
    children: ReactElement
}

export const CheckAuthRouteProvider: React.FC<CheckAuthRouteProps> = ({children}) => {
    const navigate = useNavigate();
    const user = useAuth(s => s.user)
    const updateUserData = useAuth(s => s.updateUserData)


    useEffect(() => {
        if (localStorage.getItem('accessToken') === null) {
            navigate(BikeShopPaths.COMMON.LOGIN, {replace: true})
        }
    }, [user])
    useEffect(() => {
        updateUserData();
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