import React, {useState} from 'react';
import MenuItem from "@mui/material/MenuItem";
import {Menu} from "@mui/material";
import {CreateWorkModal} from "../../../features/WorkCatalogFeatures/CreateWorkModal/CreateWorkModal";

const WorkCatalogTableContextMenu = (props: { x: number, y: number, visibility: boolean, setVisibility: (value: boolean) => void }) => {

    const [v, sV] = useState(false)

    return (
        <>
            <CreateWorkModal visibility={v} setVisibility={sV}/>
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