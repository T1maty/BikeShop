import React, {useEffect, useState} from 'react'
import s from './UserRoleModal.module.scss'
import ArrowUp from '../../shared/assets/workspace/arrow-full-up.svg'
import ArrowDown from '../../shared/assets/workspace/arrow-full-down.svg'
import {AsyncSelectSearchProduct, Button, CustomModal, LoaderScreen, ToggleSwitch} from '../../shared/ui'
import useUserRoleModal from "./UserRoleModalStore"
import useCashboxStore from "../../pages/workspace/Cashbox/CashboxStore"
import {useSnackbar} from "notistack"
import {RoleGroup} from "../../entities"
import {CreateRoleGroupModal} from "./CreateRoleGroupModal"

export const UserRoleModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const addProduct = useCashboxStore(s => s.addProduct) // temp

    const open = useUserRoleModal(s => s.openUserRoleModal)
    const setOpen = useUserRoleModal(s => s.setOpenUserRoleModal)
    const isLoading = useUserRoleModal(s => s.isLoading)
    const errorStatus = useUserRoleModal(s => s.errorStatus)

    const roles = useUserRoleModal(s => s.roles)
    const getAllRoles = useUserRoleModal(s => s.getAllRoles)
    const groups = useUserRoleModal(s => s.groups)
    const getAllGroups = useUserRoleModal(s => s.getAllGroups)

    // false - Доступные для групп, true - Все роли
    const [checked, setChecked] = useState<boolean>(false)
    // модалка для создания группы
    const [openCreateGroupModal, setOpenCreateGroupModal] = useState<boolean>(false)

    console.log('false - Доступные для группы / true - Все роли', checked)

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        open ? getAllRoles() : false
        open ? getAllGroups() : false
    }, [open])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <CustomModal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
            >
                <div className={s.userRoleModal_mainBox}>
                    <div className={s.userRoleModal_header}>
                        <div className={s.header_groups}>
                            <div className={s.groups_groups}>
                                <div className={s.groups_groupsWrapper}>
                                    {
                                        groups.length === 0 ?
                                            <div style={{textAlign: 'center'}}>Создайте новую группу</div> :
                                            groups.map((gr: RoleGroup) => {
                                                return (
                                                    <div className={s.groups_groupsItem} key={gr.group.id}>
                                                        {gr.group.name}
                                                    </div>
                                                )
                                            })
                                    }
                                </div>
                            </div>

                            <CreateRoleGroupModal open={openCreateGroupModal}
                                                  setOpen={setOpenCreateGroupModal}
                            />

                            <Button buttonDivWrapper={s.createGroup}
                                    onClick={() => {
                                        setOpenCreateGroupModal(true)
                                    }}
                            >
                                Создать группу
                            </Button>
                        </div>
                        <div className={s.header_roles}>
                            <div className={s.roles_description}>
                                <div className={s.roles_descriptionWrapper}>
                                    <div className={s.roles_descriptionItem}>
                                        <div className={s.descriptionItem_name}>Название</div>
                                        <div className={s.roles_descriptionItem_description}>Описание</div>
                                    </div>
                                </div>
                            </div>
                            <div className={s.roles_tabs}>
                                <div className={s.tabs_toggle}>
                                    <div>Доступные для группы</div>
                                    <ToggleSwitch checked={checked}
                                                  onChangeChecked={setChecked}
                                    />
                                    <div>Все роли</div>
                                </div>
                                <div className={s.tabs_arrows}>
                                    <div>
                                        <img src={ArrowUp} alt='arrow-up'/>
                                    </div>
                                    <div>
                                        <img src={ArrowDown} alt='arrow-down'/>
                                    </div>
                                </div>
                            </div>
                            <div className={s.roles_roles}>
                                <div className={s.roles_rolesWrapper}>
                                    {roles.map(n => {
                                        return (
                                            <div className={s.roles_rolesItem} key={n.id}>
                                                {n.name}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={s.userRoleModal_bottom}>
                        <div className={s.bottom_deals}>
                            <div className={s.deals_select}>
                                <AsyncSelectSearchProduct onSelect={addProduct}/>
                            </div>
                            <div className={s.deals_content}>
                                <div className={s.deals_contentWrapper}>
                                    <div className={s.deals_contentItem}>
                                        Описание роли
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.bottom_buttons}>
                            <Button buttonDivWrapper={s.applyOne}
                                    onClick={() => {
                                    }}
                            >
                                Дать пользователю выбранное право
                            </Button>
                            <Button buttonDivWrapper={s.applyTwo}
                                    onClick={() => {
                                    }}
                            >
                                Дать пользователю права выбранной группы
                            </Button>
                            <Button buttonDivWrapper={s.close}
                                    onClick={() => {
                                        setOpen(false)
                                    }}
                            >
                                Закрыть
                            </Button>
                        </div>
                    </div>
                </div>
            </CustomModal>
        )
    }
}