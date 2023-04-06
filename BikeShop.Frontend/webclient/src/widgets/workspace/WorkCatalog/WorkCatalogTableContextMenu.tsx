import React, {useState} from 'react'
import {CreateWorkModal, UpdateWorkModal} from "../../../features"
import {ContextMenu} from "../ContextMenu/ContextMenu"

export const WorkCatalogTableContextMenu = (props: { x: number, y: number,
    visibility: boolean, setVisibility: (value: boolean) => void }) => {

    const [v, sV] = useState(false)
    const [v1, sV1] = useState(false)

    const settings = [
        {
            name: 'Редактировать',
            click: () => {
                props.setVisibility(false)
                sV1(true)
            }
        },
        {
            name: 'Создать',
            click: () => {
                props.setVisibility(false)
                sV(true)
            }
        },
    ]

    return (
        <>
            <CreateWorkModal visibility={v} setVisibility={sV}/>
            <UpdateWorkModal visibility={v1} setVisibility={sV1}/>

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
//         sV1(true)
//     }}>
//         Редактировать
//     </MenuItem>
//
//     <MenuItem onClick={() => {
//         props.setVisibility(false)
//         sV(true)
//     }}>
//         Создать
//     </MenuItem>
// </Menu>