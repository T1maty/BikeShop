import React, {useState} from 'react'
import {Menu} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import {Group} from '../../../entities'
import {useWorkCatalog} from './TableCatalogStore'
import {CreateWorkModal, CreateWorkGroupModal, UpdateWorkGroupModal} from '../../../features'

const WorkCatalogTreeViewContext = (props: { x: number, y: number, visibility: boolean, setVisibility: (value: boolean) => void }) => {

    const [v, sV] = useState(false)
    const [v1, sV1] = useState(false)
    const [v2, sV2] = useState(false)
    const [parent, setParent] = useState({} as Group)

    const selected = useWorkCatalog(s => s.selected)

    return (
        <>
            <CreateWorkModal visibility={v} setVisibility={sV}/>
            <CreateWorkGroupModal visibility={v1} setVisibility={sV1} parent={parent}/>
            <UpdateWorkGroupModal visibility={v2} setVisibility={sV2} target={selected}/>

            <Menu
                onContextMenu={(event) => {
                    event.preventDefault()
                    props.setVisibility(false)
                }}
                open={props.visibility}
                onClose={() => {
                    props.setVisibility(false)
                }}
                anchorReference="anchorPosition"
                anchorPosition={
                    {top: props.y, left: props.x}
                }
            >
                <MenuItem onClick={() => {
                    props.setVisibility(false)
                    sV(true)
                }}
                >
                    Создать услугу
                </MenuItem>

                <MenuItem onClick={() => {
                    props.setVisibility(false)
                    sV2(true)
                }}
                >
                    Редактировать группу
                </MenuItem>
                <MenuItem onClick={() => {
                    props.setVisibility(false)
                    sV1(true)
                    setParent({} as Group)
                }}
                >
                    Создать группу в корне
                </MenuItem>
                <MenuItem onClick={() => {
                    props.setVisibility(false)
                    sV1(true)
                    setParent(selected)
                }}
                >
                    Создать потомка
                </MenuItem>
            </Menu>
        </>
    )
}

export default WorkCatalogTreeViewContext;