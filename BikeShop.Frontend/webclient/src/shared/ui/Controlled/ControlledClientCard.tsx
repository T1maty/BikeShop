import React from 'react';
import {ClientCard} from "../../../widgets";
import {ChooseClientModal} from "../../../features";
import {IUser} from "../../../entities";
import {Controller, UseFormReturn} from "react-hook-form";

interface props {
    control: UseFormReturn<any>
    name: string
    className?: any
    disabled?: boolean
}

export const ControlledClientCard = (props: props) => {

    return (
        <div>
            <Controller
                name={props.name}
                control={props.control.control}
                render={({field}: any) =>
                    <div>
                        <ClientCard user={{} as IUser}/>
                        <ChooseClientModal extraCallback={(user: IUser) => {
                            field.onChange(user.id)
                        }}/>
                    </div>
                }
            />
        </div>
    );
};