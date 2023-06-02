import React, {useState} from 'react'
import {WorkCatalogTableContextMenu} from './WorkCatalogTableContextMenu'
import {columns} from './WorkCatalogTableConfig'
import {UniTable} from '../../../shared/ui'
import {useWorkCatalog} from './TableCatalogStore'

export const WorkCatalogTable = (props: { onRowDoubleClick?: (row: any) => void }) => {

    const isLoading = useWorkCatalog(s => s.isLoading)
    const works = useWorkCatalog(s => s.works)
    const selectedRow = useWorkCatalog(s => s.selectedRow)
    const setSelectedRow = useWorkCatalog(s => s.setSelectedRow)

    const [XY, setXY] = useState({x: 0, y: 0})
    const [visibility, setVisibility] = useState(false)

    return (
        <>
            <WorkCatalogTableContextMenu x={XY.x + 5}
                                         y={XY.y + 5}
                                         visibility={visibility}
                                         setVisibility={setVisibility}
            />
            <UniTable rows={works}
                      columns={columns}
                      isLoading={isLoading}
                      selected={[selectedRow]}
                      setSelected={(n) => {
                          setSelectedRow(n[0])
                      }}
                      rowOnContext={(row, event) => {
                          event.preventDefault()
                          setVisibility(true)
                          setXY({x: event.clientX, y: event.clientY})
                      }}
                      rowOnDoubleClick={props.onRowDoubleClick}
            />
        </>
    )
}