import {create} from "zustand"
import $api from "../../shared/http/axios";

interface Group{
    name: string,
    parentId: number,
    isCollapsed: boolean,
    shopId: number,
    id: number,
    createdAt: string,
    updatedAt: string,
    enabled: boolean
}

interface TreeViewState{
    groups:Group[]
    setData: ()=>void,
    fetchData: ()=>void
}

const useTreeViewState = create<TreeViewState>((set)=>({
    groups:[],

    setData: ()=>set((state)=>({

    })),

    fetchData: ()=>{
        $api.get('group/getbyshopid/1').then((response)=>{
            console.log(response);
        })
    }


}))

export default useTreeViewState
