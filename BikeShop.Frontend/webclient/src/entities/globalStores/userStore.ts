import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {devtools, persist} from "zustand/middleware";
import User from "../models/User";

interface UserDataState {
    user?: User,


    setUser: (user: User) => void
    updateUser: () => void

}

const useUserData = create<UserDataState>()(persist(devtools(immer((set, get) => ({

    setUser: (user1: User) => set({user: user1}),
    updateUser: () => {
    },

}))), {name: "userStore", version: 1}));


export default useUserData;
