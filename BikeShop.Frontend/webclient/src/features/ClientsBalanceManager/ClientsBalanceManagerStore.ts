import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {immer} from "zustand/middleware/immer"
import {AuthAPI, FinancialInteractionAPI, LocalStorage, PaymentData, User} from "../../entities";

interface int {
    users: User[],
    loadUsers: () => void,

    selected: User | null,
    setSelected: (v: User | null) => void

    payModal: boolean,
    setPayModal: (v: boolean) => void

    value: number,
    setValue: (v: number) => void

    addUserBalance: (d: PaymentData) => void
}

// стор на всякий случай
const useClientsBalanceManager = create<int>()(/*persist(*/devtools(immer((set, get) => ({
    addUserBalance: (d) => {
        // @ts-ignore
        d = {...d, shopId: LocalStorage.shopId(), userId: LocalStorage.userId(), clientId: get().selected?.id}
        FinancialInteractionAPI.replenishUserBalance(d).then(() => {
            get().loadUsers();
        })
    },

    value: 0,
    setValue: (v) => {
        set({value: v})
    },
    payModal: false,
    setPayModal: (v) => {
        set({payModal: v})
    },
    selected: null,
    setSelected: (v) => {
        set({selected: v})
    },
    users: [],
    loadUsers: () => {
        AuthAPI.User.getUsersWithBalance().then(r => {
            set({users: r.data})
        })
    }
})))/*, {
    name: "clientsBalanceManager",
    version: 1
})*/);

export default useClientsBalanceManager;