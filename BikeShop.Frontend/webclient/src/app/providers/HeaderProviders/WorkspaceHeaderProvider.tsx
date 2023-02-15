import React, {FC, ReactElement} from 'react';

import {Header} from "../../../widgets/workspace/Header";

interface WorkspaceHeaderProviderType {
    children: ReactElement
}

export const WorkspaceHeaderProvider: FC<WorkspaceHeaderProviderType> = (props) => {

    return (
        <>
            <Header/>
            <div className='content'>
                {props.children}
            </div>
        </>
    );
};
