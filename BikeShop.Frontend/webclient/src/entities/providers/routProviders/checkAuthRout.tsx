import React from 'react';
import {useNavigate} from "react-router-dom";

interface props {
    children: any
}

const CheckAuthRout = (props: props) => {
    const navigate = useNavigate();
    
    React.useEffect(() => {
        if (localStorage.getItem('accessToken') == null) {
            navigate('/login', {replace: true})
        }
    }, [])

    return (
        <div>
            {props.children}
        </div>
    );
};

export default CheckAuthRout;