import React, {useEffect} from 'react';
import {CustomTable} from "shared/ui/CustomTable/CustomTable";
import {testTableData} from "../hooks/testTableData";
import {useWorkCatalog} from "../model/store/TableCatalogStore";
import CustomTagTreeView from "../../../../shared/ui/CustomTagTreeView/CustomTagTreeView";


export const Catalog = () => {
    const {theadData} = testTableData()
    const {works, group, getWork, getGroup, chooseMethod} = useWorkCatalog(state => state)

    function buildTree(data: any, parentId: any) {
        const tree: any = [];

        data.forEach((item: any) => {
            if (item.parentId === parentId) {
                const children = buildTree(data, item.id);
                if (children.length) {
                    item.children = children;
                }
                tree.push(item);
            }
        });
        return tree;
    }
    let tree: any = []
    useEffect(() => {
        if(group.length > 0){
            tree = buildTree(group, 0);
            console.log(tree)
        }
        getWork()
        getGroup()
    },[])

    const onContext = (data: any) => {
        chooseMethod(data)
    }
    const data = [
        {
            id: 1,
            label: 'Element 1',
            children: [
                {
                    id: 2,
                    label: 'Element 2',
                    children: [
                        {
                            id: 3,
                            label: 'Element 3',
                        },
                        {
                            id: 4,
                            label: 'Element 4',
                        },
                    ],
                },
                {
                    id: 5,
                    label: 'Element 5',
                },
            ],
        },
        {
            id: 10,
            label: 'Element 10',
            children: [
                {
                    id: 6,
                    label: 'Element 7',
                    children: [
                        {
                            id: 7,
                            label: 'Element 8',
                        },
                        {
                            id: 8,
                            label: 'Element 9',
                        },
                    ],
                },
                {
                    id: 9,
                    label: 'Element 9',
                },
            ],
        }
    ];


    return <div>
        <CustomTagTreeView data={data}/>
        <CustomTable tbodyData={works}
                     theadData={theadData}
                     onContext={onContext}/>
    </div>
};
