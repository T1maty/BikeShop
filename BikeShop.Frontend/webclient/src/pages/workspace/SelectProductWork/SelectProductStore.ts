import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

interface selectProductStore {

}

const useSelectProduct = create<selectProductStore>()(persist(devtools(immer((set) => ({}))), {
    name: "selectProductStore",
    version: 1
}));

export default useSelectProduct