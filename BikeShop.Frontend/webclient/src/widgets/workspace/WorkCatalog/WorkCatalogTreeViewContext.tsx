import React, {useState} from 'react';
import {Menu} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {CreateWorkModal} from "../../../features/WorkCatalogFeatures/CreateWorkModal/CreateWorkModal";

const WorkCatalogTreeViewContext = (props: { x: number, y: number, visibility: boolean, setVisibility: (value: boolean) => void }) => {

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
                    sV(true)
                }}>
                    Создать услугу
                </MenuItem>

                <MenuItem onClick={() => {
                    props.setVisibility(false)
                }}>
                    Редактировать группу
                </MenuItem>
                <MenuItem onClick={() => {
                    props.setVisibility(false)
                }}>
                    Создать группу в корне
                </MenuItem>
                <MenuItem onClick={() => {
                    props.setVisibility(false)
                }}>
                    Создать потомка
                </MenuItem>
            </Menu>
        </>
    );
};

export default WorkCatalogTreeViewContext;