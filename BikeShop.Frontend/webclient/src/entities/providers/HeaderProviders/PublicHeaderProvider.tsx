import React from 'react';
import {PublicHeader} from "../../../widgets";

interface props {
    children: any
}

export const PublicHeaderProvider = (props: props) => {
    return (
        <div>
            <PublicHeader/>
            {props.children}
        </div>
    );
};

