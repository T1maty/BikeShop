import React, {useEffect, useState} from 'react';
import {useWorkCatalog} from "./TableCatalogStore";
import cls from "../../../pages/workspace/WorkCatalog/ui/WorkCatalog.module.scss";
import {WorkCatalogTable} from "./WorkCatalogTable";
import {UniTreeView} from "../../../shared/ui";
import WorkCatalogTreeViewContext from "./WorkCatalogTreeViewContext";


export const WorkCatalogTreeView = () => {
    const {group, getWork, getGroup, selected, setSelected} = useWorkCatalog(state => state)

    const [XY, setXY] = useState({x: 0, y: 0})
    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
        getGroup()
    }, [])

    return <>
        <WorkCatalogTreeViewContext x={XY.x} y={XY.y} visibility={visibility} setVisibility={setVisibility}/>
        <div className={cls.categories}>
            <UniTreeView data={group} selected={selected} setSelected={setSelected} onNodeClick={(node) => {
                getWork(node.id)
            }} onNodeContext={(item, event) => {
                setVisibility(true)
                setXY({x: event.clientX, y: event.clientY})
                setSelected(item)
                getWork(item.id)
            }}></UniTreeView>
        </div>
        <div className={cls.tableBox}>
            <WorkCatalogTable/>
        </div>
    </>
};
