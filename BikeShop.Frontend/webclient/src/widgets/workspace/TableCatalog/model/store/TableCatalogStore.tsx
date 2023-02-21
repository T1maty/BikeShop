import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

interface PayModalStore {

}

export const usePayModal = create<PayModalStore>()(persist(devtools(immer((set) => ({
    payModal: false,


}))), {
    name: "TableCatalog",
    version: 1
}));

