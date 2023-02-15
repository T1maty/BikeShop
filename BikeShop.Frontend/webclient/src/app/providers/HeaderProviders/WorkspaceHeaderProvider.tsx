import React from 'react';
import {Header} from "../../../widgets";

interface props {
    children: any
}

const WorkspaceHeaderProvider = (props: props) => {

    return (
        <>
            <Header/>
            <div className='content'>
                {props.children}
            </div>
        </>
    );
};

export default WorkspaceHeaderProvider;
