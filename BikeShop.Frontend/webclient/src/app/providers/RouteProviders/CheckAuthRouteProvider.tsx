import React, {ReactElement, useEffect} from 'react'
import {BikeShopPaths} from 'app/routes/paths'
import {useNavigate} from "react-router-dom"

interface CheckAuthRouteProps {
    children: ReactElement
}

export const CheckAuthRouteProvider: React.FC<CheckAuthRouteProps> = ({children}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('accessToken') === null) {
            navigate(BikeShopPaths.WORKSPACE.LOGIN, {replace: true})
        }
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