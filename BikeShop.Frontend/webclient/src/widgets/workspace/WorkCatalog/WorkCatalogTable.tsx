import React, {useState} from 'react';
import WorkCatalogTableContextMenu from "./WorkCatalogTableContextMenu";
import {columns} from "./WorkCatalogTableConfig";
import {UniTable} from "../../../shared/ui";
import {useWorkCatalog} from "./TableCatalogStore";

export const WorkCatalogTable = () => {

    const {works, isLoading} = useWorkCatalog(state => state)

    const [XY, setXY] = useState({x: 0, y: 0})
    const [visibility, setVisibility] = useState(false)

    return (
        <div>
            <WorkCatalogTableContextMenu x={XY.x} y={XY.y} visibility={visibility} setVisibility={setVisibility}/>
            <UniTable rows={works} columns={columns} isLoading={isLoading} rowOnContext={(row, event) => {
                event.preventDefault()
                setVisibility(true)
                setXY({x: event.clientX, y: event.clientY})
            }
            }/>
        </div>
    );
};