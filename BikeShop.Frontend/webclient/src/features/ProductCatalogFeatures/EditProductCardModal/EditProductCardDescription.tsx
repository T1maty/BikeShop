import React from 'react'
import s from "./EditProductCardModal.module.scss"
import {UseFormReturn} from "react-hook-form"
import {EditProductCardDescriptionShort} from "./EditProductCardDescriptionShort"
import {EditProductCardDescriptionFull} from "./EditProductCardDescriptionFull"

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
}

export const EditProductCardDescription = (props: ControlledProps) => {

    return (
        <div className={s.leftSide_descriptionEditor}>
            <EditProductCardDescriptionShort control={props.control} name={'productCard'}/>
            <EditProductCardDescriptionFull control={props.control} name={'productCard'}/>
        </div>
    )
}