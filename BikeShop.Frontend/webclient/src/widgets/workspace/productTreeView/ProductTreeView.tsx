import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import useTreeViewState from "./state";
import {IGroup} from "../../../entities";

export default function ProductTreeView() {
    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [selected, setSelected] = React.useState<string[]>([]);

    const fetchData = useTreeViewState((s) => s.fetchData);
    const treeViewData = useTreeViewState((s) => s.groups);

    React.useEffect(() => {
        fetchData();
    }, []);

    const handler = () => {
        console.log(treeViewData);
    };

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };
    const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setSelected(nodeIds);
    };
    const handleExpandClick = () => {
        setExpanded((oldExpanded) => (oldExpanded.length === 0 ? ["1", "5", "6", "7"] : []));
    };
    const handleSelectClick = () => {
        setSelected((oldSelected) =>
            oldSelected.length === 0 ? ["1", "2", "3", "4", "5", "6", "7", "8", "9"] : []
        );
    };

    function createTree(parentId = 0) {
        const nodesToAdd: IGroup[] = [];

        if (treeViewData.length > 0) {
            treeViewData.map((n) => {
                if (n.parentId === parentId) nodesToAdd.push(n);
            });
        }

        if (nodesToAdd.length > 0) {
            return nodesToAdd?.map((n) => {
                return (
                    <TreeItem nodeId={n.id.toString()} label={n.name}>
                        {createTree(n.id)}
                    </TreeItem>
                );
            });
        }
    }

    return (
        <Box sx={{height: 270, flexGrow: 1, maxWidth: 400, overflowY: "auto"}}>
            <Box sx={{mb: 1}}>
                <Button onClick={handleExpandClick}>
                    {expanded.length === 0 ? "Expand all" : "Collapse all"}
                </Button>
                <Button onClick={handleSelectClick}>
                    {selected.length === 0 ? "Select all" : "Unselect all"}
                </Button>
            </Box>
            <TreeView
                aria-label="controlled"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
                multiSelect
            >
                {createTree()}
            </TreeView>
            <Button onClick={handler}>Проверить стейт</Button>
        </Box>
    );
}
