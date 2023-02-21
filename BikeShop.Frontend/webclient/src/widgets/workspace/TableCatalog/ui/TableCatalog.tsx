import React from 'react';
import {CustomTable} from "../../../../shared/ui/CustomTable/CustomTable";
import {testTableData} from "../hooks/testTableData";


export const TableCatalog = ({onContext}: any) => {

    const {theadData, tbodyData} = testTableData()

    return <CustomTable tbodyData={tbodyData}
                     theadData={theadData}
                     onContext={onContext}/>
};
