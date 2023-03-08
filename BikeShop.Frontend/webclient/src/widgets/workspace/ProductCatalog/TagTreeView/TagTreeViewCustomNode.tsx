import React from "react";
import {TreeItemContentProps, useTreeItem} from "@mui/lab";
import {Typography} from "@mui/material";
import clsx from 'clsx';
import useTagTreeView from "./TagTreeViewStore";
import useProductCatalogTableStore from "../ProductCatalogTable/ProductCatalogTableStore";
import useProductTagCloudStore from "../ProductTagCloud/ProductTagCloudStore";

export const TagTreeViewCustomNode = React.forwardRef(function CustomContent(
    props: TreeItemContentProps,
    ref,
) {
    const {
        classes,
        className,
        label,
        nodeId,
        icon: iconProp,
        expansionIcon,
        displayIcon,
    } = props;

    const {
        disabled,
        expanded,
        selected,
        focused,
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const setSelect = useTagTreeView(s => s.setSelectedTag)
    const handleExpanded = useTagTreeView(s => s.handleExpand)
    const setContext = useTagTreeView(s => s.setContextMenuVisible)
    const setProductsToTable = useProductCatalogTableStore(s => s.getProducts)
    const setRows = useProductCatalogTableStore(s => s.setRows)
    const addTagToCloud = useProductTagCloudStore(s => s.addTag)
    const treeData = useTagTreeView(s => s.treeViewTags)
    const tagsCloud = useProductTagCloudStore(s => s.tags)

    React.useEffect(() => {
        setProductsToTableHandler()
        console.log('effect')
    }, [tagsCloud])

    function setProductsToTableHandler() {
        let tags = tagsCloud.map((n) => {
            return n.id
        })
        tags.push(props.nodeId)
        setProductsToTable(tags).then((r) => {

            setRows(r.data)
        })
    }

    return (
        <div
            className={clsx(className, classes.root, {
                [classes.expanded]: expanded,
                [classes.selected]: selected,
                [classes.focused]: focused,
                [classes.disabled]: disabled,
            })}
            ref={ref as React.Ref<HTMLDivElement>}
        >
            <div onClick={() => {
                handleExpanded(props.nodeId)
            }} className={classes.iconContainer}>
                {icon}
            </div>
            <Typography
                onDoubleClick={() => {
                    addTagToCloud(treeData.filter((n) => {
                        if (n.id == props.nodeId) return n
                    })[0])
                }}
                onClick={() => {
                    setSelect(props.nodeId)
                    setProductsToTableHandler()
                }}
                onContextMenu={(event) => {
                    setSelect(props.nodeId)
                    setContext(true, event.clientX, event.clientY)
                    setProductsToTableHandler()
                }}
                component="div"
                className={classes.label}
            >
                {label}
            </Typography>
        </div>
    );
});