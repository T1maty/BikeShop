import React, {useState} from 'react'
import MenuItem from "@mui/material/MenuItem"
import {Menu} from "@mui/material"
import {CreateWorkModal, UpdateWorkModal} from "../../../features"

const WorkCatalogTableContextMenu = (props: { x: number, y: number, visibility: boolean, setVisibility: (value: boolean) => void }) => {

    const [v, sV] = useState(false)
    const [v1, sV1] = useState(false)

    return (
        <>
            <CreateWorkModal visibility={v} setVisibility={sV}/>
            <UpdateWorkModal visibility={v1} setVisibility={sV1}/>

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
                    sV1(true)
                }}>
                    Редактировать
                </MenuItem>

                <MenuItem onClick={() => {
                    props.setVisibility(false)
                    sV(true)
                }}>
                    Создать
                </MenuItem>
            </Menu>
        </>
    );
};

export default WorkCatalogTableContextMenu;