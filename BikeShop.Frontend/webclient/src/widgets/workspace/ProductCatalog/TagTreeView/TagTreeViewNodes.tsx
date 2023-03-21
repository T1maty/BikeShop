import React from 'react'
import {IProductTag} from "../../../../entities"
import TreeItem from "@mui/lab/TreeItem"
import useTagTreeView from "./TagTreeViewStore"
import {TagTreeViewCustomNode} from "./TagTreeViewCustomNode"

export const TagTreeViewNodes = () => {

    const treeViewData = useTagTreeView(s => s.treeViewTags)

    function createTree(parentId: string = '0') {
        const nodesToAdd: IProductTag[] = [];

        if (treeViewData.length > 0) {
            treeViewData.map((n) => {
                if (n.parentId == parentId) nodesToAdd.push(n);
            });
        }

        if (nodesToAdd.length > 0) {
            return nodesToAdd?.map((n) => {
                return (
                    <TreeItem
                        ContentComponent={TagTreeViewCustomNode}
                        nodeId={n.id.toString()}
                        label={n.name} key={n.id}>
                        {createTree(n.id)}
                    </TreeItem>
                );
            });
        }
    }

    return (
        <div>
            {createTree()}
        </div>
    )
}