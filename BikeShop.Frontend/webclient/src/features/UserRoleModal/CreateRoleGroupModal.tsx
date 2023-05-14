import React, {useState} from 'react'
import s from "./CreateRoleGroupModal.module.scss"
import {Button, CustomInput, CustomModal} from "../../shared/ui"
import useUserRoleModal from "./UserRoleModalStore"

interface CreateRoleGroupModalProps {
    open: boolean
    setOpen: (value: boolean) => void
}

export const CreateRoleGroupModal: React.FC<CreateRoleGroupModalProps> = ({open, setOpen}) => {

    const createGroup = useUserRoleModal(s => s.createGroup)

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const createButtonHandler = () => {
        createGroup({name, description})
        setOpen(false)
    }

    return (
        <CustomModal
            open={open}
            onClose={() => {setOpen(false)}}
        >
            <div className={s.roleGroupModal_mainBox}>
                <CustomInput divClassName={s.roleGroupModal_groupNameInput}
                             value={name}
                             onChange={(e) => {setName(e.currentTarget.value)}}
                             placeholder={'Название группы'}
                />
                <CustomInput divClassName={s.roleGroupModal_groupDescriptionInput}
                             value={description}
                             onChange={(e) => {setDescription(e.currentTarget.value)}}
                             placeholder={'Описание группы'}
                />
                <div className={s.roleGroupModal_buttons}>
                    <Button buttonDivWrapper={s.cancelButton}
                            onClick={() => {setOpen(false)}}
                    >
                        Отмена
                    </Button>
                    <Button buttonDivWrapper={s.createButton}
                            onClick={createButtonHandler}
                    >
                        Создать
                    </Button>
                </div>
            </div>
        </CustomModal>
    )
}