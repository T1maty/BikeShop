import React, {useEffect} from 'react'
import { BikeShopPaths } from 'app/routes/paths'
import {useNavigate} from 'react-router-dom'

interface OnlyWithoutAuthRouteProps {
    children: any
}

export const OnlyWithoutAuthRoute: React.FC<OnlyWithoutAuthRouteProps> = ({children}) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('accessToken') != null) {
            navigate(BikeShopPaths.SHOP.HOME)
        }
    }, [])

    return (
        <div>
            {children}
        </div>
    );
};