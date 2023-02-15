import React, {FC, ReactElement} from 'react';

import {Header} from "../../../widgets/workspace/HeaderCustom";

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
