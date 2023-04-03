import React, {useEffect, useState} from 'react'
import Box from "@mui/material/Box"
import {ProductTag} from "../../../../entities"
import TagTreeViewContextMenu from "./TagTreeViewContextMenu"
import {CreateTagModal, UpdateTagModal} from "../../../../features"
import useTagTreeView from './TagTreeViewStore'
import {UniTreeView} from "../../../../shared/ui";
import useProductTagCloudStore from "../ProductTagCloud/ProductTagCloudStore";
import useProductCatalogTableStore from "../ProductCatalogTable/ProductCatalogTableStore";

interface prp {
    onNodeDoubleClick?: (node: any) => void
}

export const TagTreeView = (props: prp) => {

    const setTreeViewData = useTagTreeView(s => s.setTreeViewTags)
    const expanded = useTagTreeView(s => s.expandedTags)
    const setSelect = useTagTreeView(s => s.setSelectedTag)
    const selected = useTagTreeView(s => s.selectedTag)
    const fetchTags = useTagTreeView(s => s.fetchTags)
    const addTag = useTagTreeView(s => s.addNewTag)
    const updateTag = useTagTreeView(s => s.updateTag)
    const treeViewData = useTagTreeView(s => s.treeViewTags)
    const tagsCloud = useProductTagCloudStore(s => s.tags)
    const setProductsToTable = useProductCatalogTableStore(s => s.getProducts)

    const [selectedN, setSelectedN] = useState()

    const setProductsToTableHandler = (node: ProductTag) => {
        setSelect(node.id)

        let tags = tagsCloud.map((n) => {
            return n.id
        })
        tags.push(node.id)
        setProductsToTable(tags)
    }

    useEffect(() => {
        fetchTags().then((r) => {
            console.log('tags', r.data.tags)
            setTreeViewData(r.data.tags as ProductTag[])
        })
    }, [])

    return (
        <Box sx={{
            flexGrow: 1,
            maxWidth: 400,
            maxHeight: 100,
            backgroundColor: '#33373B',
            borderRadius: 5,
            p: 2,
            m: 2
        }}
             onContextMenu={(event) => {
                 event.preventDefault()
             }}
        >
            <UpdateTagModal onSuccess={updateTag}/>
            <CreateTagModal onSuccess={addTag}/>
            <TagTreeViewContextMenu/>
            <UniTreeView data={treeViewData} selected={selectedN} setSelected={setSelectedN}
                         onNodeClick={setProductsToTableHandler} onNodeContext={(event) => {/*
                setSelect(node.id)
                setContext(true, event.clientX, event.clientY)
                setProductsToTableHandler()
            */
            }}
                         onNodeDoubleClick={(node) => {/*
                             addTagToCloud(treeData.filter((n) => {
                                 if (n.id == props.nodeId) return n
                             })[0])
                         */
                             props.onNodeDoubleClick ? props.onNodeDoubleClick(node) : true
                         }}


            />


        </Box>
    )
}