import React from 'react';
import {Header} from "../../../widgets";

interface props {
    children: any
}

const WorkspaceHeaderProvider = (props: props) => {

    return (
        <div>
            <Header/>
            <div className='App'>
                {props.children}
            </div>
        </div>
    );
};

export default WorkspaceHeaderProvider;