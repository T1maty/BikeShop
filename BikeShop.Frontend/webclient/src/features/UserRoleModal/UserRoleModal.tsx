import React from 'react'
import s from './UserRoleModal.module.scss'
import ArrowUp from '../../shared/assets/workspace/arrow-full-up.svg'
import ArrowDown from '../../shared/assets/workspace/arrow-full-down.svg'
import {AsyncSelectSearchProduct, Button, CustomModal, ToggleSwitch} from '../../shared/ui'
import useUserRoleModal from "./UserRoleModalStore"
import useCashboxStore from "../../pages/workspace/Cashbox/CashboxStore"

export const UserRoleModal = () => {

    const open = useUserRoleModal(s => s.openUserRoleModal)
    const setOpen = useUserRoleModal(s => s.setOpenUserRoleModal)

    const addProduct = useCashboxStore(s => s.addProduct) // temp

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
                            <div className={s.groups_groupsItem}>Админ</div>
                            <div className={s.groups_groupsItem}>Менеджер</div>
                            <div className={s.groups_groupsItem}>Младший сотрудник</div>
                        </div>
                        <Button buttonDivWrapper={s.createGroup}
                                onClick={() => {}}
                        >
                            Создать группу
                        </Button>
                    </div>
                    <div className={s.header_roles}>
                        <div className={s.roles_description}>1</div>
                        <div className={s.roles_tabs}>
                            <div className={s.tabs_toggle}>
                                <div>Доступные для группы</div>
                                <ToggleSwitch/>
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
                        <div className={s.roles_roles}>3</div>
                    </div>
                </div>


                <div className={s.userRoleModal_bottom}>
                    <div className={s.bottom_deals}>
                        <div className={s.deals_select}>
                            <AsyncSelectSearchProduct onSelect={addProduct}/>
                        </div>
                        <div className={s.deals_table}>table</div>
                    </div>
                    <div className={s.bottom_buttons}>
                        <Button buttonDivWrapper={s.applyOne}
                                onClick={() => {}}
                        >
                            Дать пользователю выбранное право
                        </Button>
                        <Button buttonDivWrapper={s.applyTwo}
                                onClick={() => {}}
                        >
                            Дать пользователю права выбранной группы
                        </Button>
                        <Button buttonDivWrapper={s.close}
                                onClick={() => {setOpen(false)}}
                        >
                            Закрыть
                        </Button>
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}