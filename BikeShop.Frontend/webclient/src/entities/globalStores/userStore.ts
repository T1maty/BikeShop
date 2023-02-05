import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {devtools, persist} from "zustand/middleware";
import {IUser} from "../index";


interface UserDataState {
    user?: IUser

    setUser: (user: IUser) => void
    updateUserFetch: () => void
}

const useUserData = create<UserDataState>()(persist(devtools(immer((set, get) => ({
    setUser: (user1: IUser) => set({user: user1}),
    updateUserFetch: () => {
    },

}))), {name: "userStore", version: 1}));


export default useUserData;
