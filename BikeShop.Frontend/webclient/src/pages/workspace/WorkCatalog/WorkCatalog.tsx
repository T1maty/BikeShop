import React from 'react'
import cls from './WorkCatalog.module.scss'
import {WorkCatalogTreeView} from "../../../widgets/workspace/WorkCatalog/WorkCatalogTreeView"
import {WorkCatalogTable} from "../../../widgets"

export const WorkCatalog = () => {
    return (
        <div className={cls.container}
             onContextMenu={(event) => {event.preventDefault()}}
        >
            <div className={cls.categories}>
                <WorkCatalogTreeView/>
            </div>
            <div className={cls.tableBox}>
                <WorkCatalogTable/>
            </div>
        </div>
    )
}

