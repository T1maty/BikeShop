import React, {useState} from 'react';
import {Menu} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {CreateWorkModal} from "../../../features/WorkCatalogFeatures/CreateWorkModal/CreateWorkModal";
import CreateWorkModalGroup from "../../../features/WorkCatalogFeatures/CreateWorkGroupModal/CreateWorkModalGroup";
import {WorkGroup} from "../../../entities";
import {useWorkCatalog} from "./TableCatalogStore";

const WorkCatalogTreeViewContext = (props: { x: number, y: number, visibility: boolean, setVisibility: (value: boolean) => void }) => {

    const [v, sV] = useState(false)
    const [v1, sV1] = useState(false)
    const [parent, setParent] = useState({} as WorkGroup)
    const selected = useWorkCatalog(s => s.selected)

    console.log(parent)
    return (
        <>
            <CreateWorkModal visibility={v} setVisibility={sV}/>
            <CreateWorkModalGroup visibility={v1} setVisibility={sV1} parent={parent}/>

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
                    sV1(true)
                    setParent({} as WorkGroup)
                }}>
                    Создать группу в корне
                </MenuItem>
                <MenuItem onClick={() => {
                    props.setVisibility(false)
                    sV1(true)
                    setParent(selected)
                }}>
                    Создать потомка
                </MenuItem>
            </Menu>
        </>
    );
};

export default WorkCatalogTreeViewContext;