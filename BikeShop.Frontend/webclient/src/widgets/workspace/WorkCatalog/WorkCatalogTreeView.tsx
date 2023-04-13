import React, {useEffect, useState} from 'react'
import {useWorkCatalog} from './TableCatalogStore'
import {UniTreeView} from '../../../shared/ui'
import {WorkCatalogTreeViewContext} from './WorkCatalogTreeViewContext'

export const WorkCatalogTreeView = () => {

    const getWork = useWorkCatalog(s => s.getWork)
    const group = useWorkCatalog(s => s.group)
    const getGroup = useWorkCatalog(s => s.getGroup)
    const selected = useWorkCatalog(s => s.selected)
    const setSelected = useWorkCatalog(s => s.setSelected)

    const [XY, setXY] = useState({x: 0, y: 0})
    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
        getGroup()
    }, [])

    return (
        <>
            <WorkCatalogTreeViewContext x={XY.x} y={XY.y}
                                        visibility={visibility}
                                        setVisibility={setVisibility}
            />
            <UniTreeView data={group}
                         selected={selected}
                         setSelected={setSelected}
                         onNodeClick={(node) => {getWork(node.id)}}
                         onNodeContext={(item, event) => {
                             setVisibility(true)
                             setXY({x: event.clientX, y: event.clientY})
                             setSelected(item)
                             getWork(item.id)
                         }}
            ></UniTreeView>
        </>
    )
}