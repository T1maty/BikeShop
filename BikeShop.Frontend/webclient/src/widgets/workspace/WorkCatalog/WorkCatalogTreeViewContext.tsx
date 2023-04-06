import React, {useState} from 'react'
import {Group} from '../../../entities'
import {useWorkCatalog} from './TableCatalogStore'
import {CreateWorkModal, CreateWorkGroupModal, UpdateWorkGroupModal} from '../../../features'
import {ContextMenu} from "../ContextMenu/ContextMenu"

export const WorkCatalogTreeViewContext = (props: { x: number, y: number,
    visibility: boolean, setVisibility: (value: boolean) => void }) => {

    const [v, sV] = useState(false)
    const [v1, sV1] = useState(false)
    const [v2, sV2] = useState(false)
    const [parent, setParent] = useState({} as Group)

    const selected = useWorkCatalog(s => s.selected)

    const settings = [
        {
            name: 'Создать услугу',
            click: () => {
                props.setVisibility(false)
                sV(true)
            }
        },
        {
            name: 'Редактировать группу',
            click: () => {
                props.setVisibility(false)
                sV2(true)
            }
        },
        {
            name: 'Создать группу в корне',
            click: () => {
                props.setVisibility(false)
                sV1(true)
                setParent({} as Group)
            }
        },
        {
            name: 'Создать потомка',
            click: () => {
                props.setVisibility(false)
                sV1(true)
                setParent(selected)
            }
        },
    ]

    return (
        <>
            <CreateWorkModal visibility={v} setVisibility={sV}/>
            <CreateWorkGroupModal visibility={v1} setVisibility={sV1} parent={parent}/>
            <UpdateWorkGroupModal visibility={v2} setVisibility={sV2} target={selected}/>

            <ContextMenu
                isOpen={props.visibility}
                onClose={() => {props.setVisibility(false)}}
                settings={settings}
                top={props.y}
                left={props.x}
            />
        </>
    )
}

// <Menu
//     onContextMenu={(event) => {
//         event.preventDefault()
//         props.setVisibility(false)
//     }}
//     open={props.visibility}
//     onClose={() => {
//         props.setVisibility(false)
//     }}
//     anchorReference="anchorPosition"
//     anchorPosition={
//         {top: props.y, left: props.x}
//     }
// >
//     <MenuItem onClick={() => {
//         props.setVisibility(false)
//         sV(true)
//     }}
//     >
//         Создать услугу
//     </MenuItem>
//
//     <MenuItem onClick={() => {
//         props.setVisibility(false)
//         sV2(true)
//     }}
//     >
//         Редактировать группу
//     </MenuItem>
//     <MenuItem onClick={() => {
//         props.setVisibility(false)
//         sV1(true)
//         setParent({} as Group)
//     }}
//     >
//         Создать группу в корне
//     </MenuItem>
//     <MenuItem onClick={() => {
//         props.setVisibility(false)
//         sV1(true)
//         setParent(selected)
//     }}
//     >
//         Создать потомка
//     </MenuItem>
// </Menu>