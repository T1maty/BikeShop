import React, {ReactElement} from 'react'
import {Header} from '../../../widgets/workspace/Header'

interface WorkspaceHeaderProviderProps {
    children: ReactElement
}

export const WorkspaceHeaderProvider: React.FC<WorkspaceHeaderProviderProps> = ({children}) => {

    return (
        <>
            <Header/>
            <div className='content'>
                {children}
            </div>
        </>
    );
};
