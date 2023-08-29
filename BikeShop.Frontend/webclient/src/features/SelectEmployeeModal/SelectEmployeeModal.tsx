import React, {useState} from 'react';
import {CustomModal} from "../../shared/ui";
import Select from "react-select";
import s from './SelectEmployeeModal.module.scss'
import {User} from "../../entities";

interface p {
    open: boolean,
    setOpen: (n: boolean) => void

    Users: User[]
    OnSelect: (User: User) => void
}

const SelectEmployeeModal = (props: p) => {
    const [user, setUser] = useState<User | null>(null)
    return (
        <CustomModal
            open={props.open}
            onClose={() => {
                props.setOpen(false)
            }} className={s.wrapper}
        >
            <Select options={props.Users} className={s.select} onChange={(newValue) => {
                setUser(user)
                props.OnSelect(newValue as User)
                props.setOpen(false)
            }} placeholder={'Сотрудник'}
                    value={user}
                    noOptionsMessage={() => 'Сотрудники не загружены'}
                    getOptionLabel={label => label!.lastName}
                    getOptionValue={value => value!.lastName}
            />

        </CustomModal>
    );
};

export default SelectEmployeeModal;