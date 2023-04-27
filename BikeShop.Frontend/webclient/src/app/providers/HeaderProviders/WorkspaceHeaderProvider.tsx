import React, {ReactElement, useEffect} from 'react'
import {Header} from '../../../widgets/workspace/Header'
import {useCurrency} from "../../../entities";

interface WorkspaceHeaderProviderProps {
    children: ReactElement
}

export const WorkspaceHeaderProvider: React.FC<WorkspaceHeaderProviderProps> = ({children}) => {

    const l = useCurrency(s => s.loadAllCurrencies)

    useEffect(() => {
        l();
    }, [])
    return (
        <>
            <Header/>
            <div className='content'>
                {children}
            </div>
        </>
    );
};
