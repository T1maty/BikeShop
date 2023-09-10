import React, {useEffect, useState} from 'react'
import s from './TagTreeView.module.scss'
import {TagTreeViewContextMenu} from "./TagTreeViewContextMenu"
import useTagTreeView from './TagTreeViewStore'
import {UniTreeView} from "../../../../shared/ui"
import useProductCatalogTableStore from "../ProductCatalogTable/ProductCatalogTableStore"
import {useSnackbar} from "notistack"
import {ProductCategory} from "../../../../entities/DataTransferObjects/ProductCategory";
import {CreateTagModal} from "../CreateTagModal/CreateTagModal";
import {UpdateTagModal} from "../../../../features";

interface TagTreeViewProps {
    onNodeDoubleClick?: (node: any) => void
    tags?: ProductCategory[]
    setTags?: (value: ProductCategory[]) => void
    NOTchangeProducts?: boolean
}

export const TagTreeView = (props: TagTreeViewProps) => {

    const setTreeViewData = useTagTreeView(s => s.setTreeViewTags)
    const setSelect = useTagTreeView(s => s.setSelectedTag)
    const selected = useTagTreeView(s => s.selectedTag)
    const fetchTags = useTagTreeView(s => s.fetchTags)
    const addTag = useTagTreeView(s => s.addNewTag)
    const updateTag = useTagTreeView(s => s.updateTag)
    const treeViewData = useTagTreeView(s => s.treeViewTags)
    const setContextMenuVisible = useTagTreeView(s => s.setContextMenuVisible)
    const setProductsToTable = useProductCatalogTableStore(s => s.getProducts)

    const [selectedN, setSelectedN] = useState()

    const {enqueueSnackbar} = useSnackbar()

    const setProductsToTableHandler = (node: ProductCategory) => {
        if (props.NOTchangeProducts === undefined || !props.NOTchangeProducts) {
            setSelect(node.id)
            setProductsToTable(node.id)
        }
    }

    useEffect(() => {
        fetchTags()
    }, [])

    return (
        <div className={s.tagTreeView_mainBox}
             onContextMenu={(event) => {
                 event.preventDefault()
             }}
        >
            <CreateTagModal onSuccess={addTag}/>
            <UpdateTagModal onSuccess={updateTag}/>

            <TagTreeViewContextMenu/>

            <UniTreeView data={treeViewData}
                         selected={selectedN}
                         setSelected={setSelectedN}
                         onNodeClick={setProductsToTableHandler}
                         onNodeContext={(node, event) => {
                             setContextMenuVisible(true, event.clientX, event.clientY)
                             setSelectedN(node)
                             setProductsToTableHandler(node)
                         }}
                         onNodeDoubleClick={(node) => {
                             props.onNodeDoubleClick ? props.onNodeDoubleClick(node) : true
                         }}
            />
        </div>
    )
}