import {create} from "zustand";
import $api from "../../../shared/http/axios";
import Group from "../../../entities/models/Group";
import GroupResponse from "../../../entities/responses/GroupResponse";

interface TreeViewState {
    groups: Group[];
    addGroup: (group: Group) => void;
    fetchData: () => void;
}

const useTreeViewState = create<TreeViewState>((set) => ({
    groups: [],

    addGroup: (group) =>
        set((state) => ({
            groups: [...state.groups, group]
        })),

    fetchData: () => {
        $api.get<GroupResponse>("group/getbyshopid/1").then((response) => {
            set({groups: response.data.workGroups});
        });
    }
}));

export default useTreeViewState;
