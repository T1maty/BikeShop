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

    state: boolean,
    setState: (state: boolean) => void
}

export const ControlledClientCard = (props: props) => {

    return (
        <div>
            <Controller
                name={props.name}
                control={props.control.control}
                render={({field}: any) =>
                    <div>
                        <ClientCard user={field.value} onDoubleClick={() => {
                            if (!props.disabled) props.setState(true)
                        }}/>
                        <ChooseClientModal extraCallback={(user: IUser) => {
                            field.onChange(user)
                            props.setState(false)
                        }}
                                           state={props.state}
                                           setState={props.setState}
                        />
                    </div>
                }
            />
        </div>
    );
};