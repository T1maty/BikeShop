import React from 'react';
import {Header} from "../../../widgets";

interface props {
    children: any
}

export const WorkspaceHeaderProvider = (props: props) => {

    return (
        <div>
            <Header/>
            {props.children}
        </div>
    );
};