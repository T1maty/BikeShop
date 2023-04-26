import React, {useEffect} from 'react'
import {BikeShopPaths} from 'app/routes/paths'
import {useNavigate} from 'react-router-dom'
import {useAuth} from "../../../entities";

interface OnlyWithoutAuthRouteProps {
    children: any
}

export const OnlyWithoutAuthRoute: React.FC<OnlyWithoutAuthRouteProps> = ({children}) => {

    const navigate = useNavigate()
    const user = useAuth(s => s.user)

    useEffect(() => {
        if (localStorage.getItem('accessToken') != null && user != undefined) {
            navigate(BikeShopPaths.SHOP.HOME)
        }
    }, [user])

    return (
        <div>
            {children}
        </div>
    );
};