import React, {useEffect} from 'react';
import s from './ClientsBalanceManager.module.scss'
import {Button, CustomInput, UniTable} from "../../shared/ui";
import useClientsBalanceManager from "./ClientsBalanceManagerStore";
import {Columns} from "./Columns";
import {useCurrency, User} from "../../entities";
import {PayModal} from "../PayModal/PayModal";
import {AsyncSelectSearchUser} from "../../shared/ui/AsyncSelectSearch/AsyncSelectSearchUser";

const ClientsBalanceManager = () => {
    const users = useClientsBalanceManager(s => s.users)
    const loadUsers = useClientsBalanceManager(s => s.loadUsers)
    const selected = useClientsBalanceManager(s => s.selected)
    const setSelected = useClientsBalanceManager(s => s.setSelected)
    const payModal = useClientsBalanceManager(s => s.payModal)
    const setPayModal = useClientsBalanceManager(s => s.setPayModal)
    const value = useClientsBalanceManager(s => s.value)
    const setValue = useClientsBalanceManager(s => s.setValue)
    const addUserBalance = useClientsBalanceManager(s => s.addUserBalance)

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)

    useEffect(() => {
        loadUsers()
    }, [])

    return (
        <div className={s.wrapper}>
            <PayModal open={payModal} setOpen={setPayModal} user={selected} summ={value} result={(r) => {
                addUserBalance(r)
            }}/>
            <div className={s.left}>
                <UniTable rows={users} columns={Columns} rowOnDoubleClick={(u) => {
                    setSelected(u as User)
                }}/>
            </div>
            <div className={s.right}>
                <div className={s.search}>
                    <AsyncSelectSearchUser onSelect={(u) => {
                        setSelected(u.user)
                    }}/>
                </div>
                {selected != null ?
                    <div className={s.data_text}>
                        <div className={s.line}>Обраный користувач:</div>
                        <div className={s.fio}>{selected.lastName} {selected.firstName} {selected.patronymic}</div>
                        <br/>
                        <div className={s.line}>Баланс: {r(selected.balance * fbts.c) + fbts.s}</div>
                        <div className={s.line}>Кредитний ліміт: {r(selected.creditLimit * fbts.c) + fbts.s}</div>
                        <br/>
                        <CustomInput value={r(value * fbts.c)} onChange={(v) => {
                            let v1 = parseFloat(v.target.value)
                            if (v1 > 0) setValue(v1 * fstb.c)
                        }}/>
                        <br/>
                        <Button disabled={value < 1} onClick={() => {
                            setPayModal(true)
                        }}>Поповнити</Button>
                    </div>
                    :
                    <div>Оберіть користувача</div>
                }
            </div>
        </div>
    );
};

export default ClientsBalanceManager;