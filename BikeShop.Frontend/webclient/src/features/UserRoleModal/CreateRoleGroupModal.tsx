import React, {useEffect, useState} from 'react'
import s from "./CreateRoleGroupModal.module.scss"
import {Button, CustomInput, CustomModal, LoaderScreen} from '../../shared/ui'
import useUserRoleModal from "./UserRoleModalStore"
import {CreateRoleGroup} from '../../entities'
import {useSnackbar} from 'notistack'

interface CreateRoleGroupModalProps {
    open: boolean
    setOpen: (value: boolean) => void
}

export const CreateRoleGroupModal: React.FC<CreateRoleGroupModalProps> = ({open, setOpen}) => {

    const {enqueueSnackbar} = useSnackbar()

    const isCreateModalLoading = useUserRoleModal(s => s.isCreateModalLoading)
    const errorStatusForCreateModal = useUserRoleModal(s => s.errorStatusForCreateModal)
    const createGroup = useUserRoleModal(s => s.createGroup)

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const GroupParams: CreateRoleGroup = {
        name: name,
        description: description
    }

    const createButtonHandler = () => {
        createGroup(GroupParams)
    }

    useEffect(() => {
        if (errorStatusForCreateModal === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
        if (errorStatusForCreateModal === 'success') {
            enqueueSnackbar('Группа создана', {variant: 'success', autoHideDuration: 3000})
            setName('')
            setDescription('')
            setOpen(false)
        }
    }, [errorStatusForCreateModal])

    if (isCreateModalLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <CustomModal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
            >
                <div className={s.roleGroupModal_mainBox}>
                    <CustomInput divClassName={s.roleGroupModal_groupNameInput}
                                 value={name}
                                 onChange={(e) => {
                                     setName(e.currentTarget.value)
                                 }}
                                 placeholder={'Название группы'}
                    />
                    <CustomInput divClassName={s.roleGroupModal_groupDescriptionInput}
                                 value={description}
                                 onChange={(e) => {
                                     setDescription(e.currentTarget.value)
                                 }}
                                 placeholder={'Описание группы'}
                    />
                    <div className={s.roleGroupModal_buttons}>
                        <Button buttonDivWrapper={s.cancelButton}
                                onClick={() => {
                                    setOpen(false)
                                }}
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
}