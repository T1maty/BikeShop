import React, {useState} from 'react'
import {CreateWorkModal, UpdateWorkModal} from "../../../features"
import {ContextMenu} from "../ContextMenu/ContextMenu"
import {
    ChooseProductTagModal
} from "../../../features/ProductCatalogFeatures/ChooseProductTagModal/ChooseProductTagModal";
import {useWorkCatalog} from "./TableCatalogStore";

export const WorkCatalogTableContextMenu = (props: {
    x: number, y: number,
    visibility: boolean, setVisibility: (value: boolean) => void
}) => {

    const [v, sV] = useState(false)
    const [v1, sV1] = useState(false)
    const [v2, sV2] = useState(false)

    const selectedRow = useWorkCatalog(s => s.selectedRow)

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
            <ChooseProductTagModal open={v2} setOpen={sV2} onTagDoubleClick={(tag) => {
                //let data = selectedRow as unknown as UpdateWork
                //data.groupId =
            }}/>

            <ContextMenu
                isOpen={props.visibility}
                onClose={() => {
                    props.setVisibility(false)
                }}
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