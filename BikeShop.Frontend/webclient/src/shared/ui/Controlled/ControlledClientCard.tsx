import React from 'react';
import {ClientCard} from "../../../widgets";
import {ChooseClientModal} from "../../../features";
import {IUser} from "../../../entities";
import {Controller, UseFormReturn} from "react-hook-form";
import useChooseClientModal from "../../../features/ChooseClientModal/ChooseClientModalStore";

interface props {
    control: UseFormReturn<any>
    name: string
    className?: any
    disabled?: boolean
}

export const ControlledClientCard = (props: props) => {

    const setOpen = useChooseClientModal(s => s.setChooseClientModal)

    return (
        <div>
            <Controller
                name={props.name}
                control={props.control.control}
                render={({field}: any) =>
                    <div>
                        <ClientCard user={field.value} onDoubleClick={() => {
                            setOpen(true)
                        }}/>
                        <ChooseClientModal extraCallback={(user: IUser) => {
                            field.onChange(user)
                            setOpen(false)
                        }}/>
                    </div>
                }
            />
        </div>
    );
};