import React, {useEffect, useState} from 'react'
import s from './UserRoleModal.module.scss'
import ArrowUp from '../../shared/assets/workspace/arrow-full-up.svg'
import ArrowDown from '../../shared/assets/workspace/arrow-full-down.svg'
import {Button, CustomInput, CustomModal, LoaderScreen, ToggleSwitch} from '../../shared/ui'
import useUserRoleModal from "./UserRoleModalStore"
import useCashboxStore from "../../pages/workspace/Cashbox/CashboxStore"
import {useSnackbar} from "notistack"
import {CreateRoleGroupModal} from "./CreateRoleGroupModal"
import Enumerable from "linq";
import {AsyncSelectSearchUser} from "../../shared/ui/AsyncSelectSearch/AsyncSelectSearchUser";
import {UserWithRoles} from "../../entities/models/Auth/UserWithRoles";
import {RoleAPI} from "../../entities";

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
    const selectedGroup = useUserRoleModal(s => s.selectedGroup)
    const setSelectedGroup = useUserRoleModal(s => s.setSelectedGroup)
    const selectedRole = useUserRoleModal(s => s.selectedRole)
    const setSelectedRole = useUserRoleModal(s => s.setSelectedRole)
    const setSelectGroupRole = useUserRoleModal(s => s.setSelectGroupRole)
    const selectedGroupRole = useUserRoleModal(s => s.selectedGroupRole)
    const roleToGroup = useUserRoleModal(s => s.roleToGroup)
    const roleFromGroup = useUserRoleModal(s => s.roleFromGroup)
    const removeRoleFromGroup = useUserRoleModal(s => s.removeRoleFromGroup)
    const createRole = useUserRoleModal(s => s.createRole)

    // false - Доступные для групп, true - Все роли
    const [checked, setChecked] = useState<boolean>(false)
    // модалка для создания группы
    const [openCreateGroupModal, setOpenCreateGroupModal] = useState<boolean>(false)
    const [user, setUser] = useState<UserWithRoles | null>(null)
    const [input, setInput] = useState('')


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

    useEffect(() => {
        setSelectedGroup(groups.find(n => n.group.id === selectedGroup?.group.id)!)
    }, [groups])

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
                                            groups.map((gr) => {
                                                return (
                                                    <div
                                                        className={selectedGroup?.group.id != gr.group.id ? s.groups_groupsItem : s.groups_groupsItem_selected}
                                                        key={gr.group.id} onClick={() => {
                                                        setSelectGroupRole(null)
                                                        setSelectedGroup(gr)
                                                    }}>
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
                                    {selectedGroup?.roles.map(n => {
                                        return (
                                            <div key={n.id} onClick={() => {
                                                setSelectGroupRole(n)
                                            }}
                                                 className={n.id === selectedGroupRole?.id ? `${s.roles_descriptionItem} ${s.roles_descriptionItem_nselected}` : `${s.roles_descriptionItem} ${s.roles_descriptionItem_selected}`}>
                                                <div className={s.descriptionItem_name}>{n.role}</div>
                                                <div
                                                    className={s.roles_descriptionItem_description}>{n.description}</div>
                                                <div className={s.d_b} onClick={() => {
                                                    removeRoleFromGroup(n.role, () => {
                                                        enqueueSnackbar('Роль удалена из группы', {
                                                            variant: 'success',
                                                            autoHideDuration: 3000
                                                        })
                                                    })
                                                }}>X
                                                </div>
                                            </div>
                                        )
                                    })}
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
                                    <div onClick={() => {
                                        roleToGroup(() => {
                                            enqueueSnackbar('Успех', {
                                                variant: 'success',
                                                autoHideDuration: 3000
                                            })
                                        }, () => {
                                        })
                                    }}>
                                        <img src={ArrowUp} alt='arrow-up'/>
                                    </div>
                                    <div onClick={() => {
                                        roleFromGroup(() => {
                                            enqueueSnackbar('Успех', {
                                                variant: 'success',
                                                autoHideDuration: 3000
                                            })
                                        }, () => {
                                        })
                                    }}>
                                        <img src={ArrowDown} alt='arrow-down'/>
                                    </div>
                                </div>
                            </div>
                            <div className={s.roles_roles}>
                                <div className={s.roles_rolesWrapper}>
                                    {roles.filter(n => {
                                        if (!checked && selectedGroup != null) {
                                            return !Enumerable.from(selectedGroup.roles).select(h => h.role).contains(n.name)
                                        } else {
                                            return !Enumerable.from(user?.roles!).contains(n.name)
                                        }
                                    }).map(n => {
                                        return (
                                            <div
                                                className={n.id != selectedRole?.id ? s.roles_rolesItem : s.roles_rolesItem_selected}
                                                key={n.id} onClick={() => {
                                                setSelectedRole(n)
                                            }}>
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
                                <AsyncSelectSearchUser onSelect={(r) => {
                                    setUser(r)
                                }} value={user}/>
                            </div>
                            <div className={s.deals_content}>
                                <div className={s.deals_contentWrapper}>
                                    {user?.roles.map(n => {
                                        return (
                                            <div className={s.deals_contentItem}>
                                                {n}
                                                <div className={s.del_but} onClick={() => {
                                                    RoleAPI.removeRoleFromUser(user?.user.id, n).then(r => {
                                                        setUser(r.data)
                                                        enqueueSnackbar('Роль удалена у пользователя', {
                                                            variant: 'success',
                                                            autoHideDuration: 3000
                                                        })
                                                    })
                                                }}>X
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={s.bottom_buttons}>
                            <Button buttonDivWrapper={s.applyOne}
                                    onClick={() => {
                                        RoleAPI.setRoleToUser(selectedRole?.name!, user?.user.id!).then(r => {
                                            setUser(r.data)
                                            enqueueSnackbar('Роль присвоена пользователю', {
                                                variant: 'success',
                                                autoHideDuration: 3000
                                            })
                                        })
                                    }}
                            >
                                Дать пользователю выбранное право
                            </Button>
                            <Button buttonDivWrapper={s.applyTwo}
                                    onClick={() => {
                                        RoleAPI.setGroupToUser(selectedGroup?.group.id!, user?.user.id!).then(r => {
                                            setUser(r.data)
                                            enqueueSnackbar('Группа присвоена пользователю', {
                                                variant: 'success',
                                                autoHideDuration: 3000
                                            })
                                        })
                                    }}
                            >
                                Дать пользователю права выбранной группы
                            </Button>
                            <Button buttonDivWrapper={s.close}
                                    onClick={() => {
                                        createRole(input, () => {
                                            enqueueSnackbar('Роль создана', {
                                                variant: 'success',
                                                autoHideDuration: 3000
                                            })
                                        })
                                    }}
                            >
                                Создать роль
                            </Button>
                            <CustomInput value={input} onChange={(r) => {
                                setInput(r.target.value)
                            }}/>
                        </div>
                    </div>
                </div>
            </CustomModal>
        )
    }
}