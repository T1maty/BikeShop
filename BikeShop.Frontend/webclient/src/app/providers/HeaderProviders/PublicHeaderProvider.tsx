import React from 'react';
import {PublicHeader} from "../../../widgets";

interface props {
    children: any
}

const PublicHeaderProvider = (props: props) => {
    return (
        <>
            <PublicHeader/>
            {props.children}
        </>
    );
};

export default PublicHeaderProvider;

