import React, {useEffect, useState} from 'react'
import s from './TagTreeView.module.scss'
import {ProductTag} from "../../../../entities"
import {TagTreeViewContextMenu} from "./TagTreeViewContextMenu"
import {CreateTagModal, UpdateTagModal} from "../../../../features"
import useTagTreeView from './TagTreeViewStore'
import {UniTreeView} from "../../../../shared/ui"
import useProductCatalogTableStore from "../ProductCatalogTable/ProductCatalogTableStore"
import Enumerable from "linq"
import {useSnackbar} from "notistack"

interface TagTreeViewProps {
    onNodeDoubleClick?: (node: any) => void
    tags?: ProductTag[]
    setTags?: (value: ProductTag[]) => void
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

    const setProductsToTableHandler = (node: ProductTag) => {
        setSelect(node.id)
        let tagsIds = Enumerable.from(props.tags ? props.tags : []).select(n => n.id).toArray()
        tagsIds.push(node.id)
        setProductsToTable(tagsIds)
    }

    useEffect(() => {
        fetchTags().then((r) => {
            setTreeViewData(r.data.tags as ProductTag[])
        })
    }, [])

    return (
        <div className={s.tagTreeView_mainBox}
             onContextMenu={(event) => {event.preventDefault()}}
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
                             if (Enumerable.from(props.tags ? props.tags : [])
                                 .select(n => n.id).contains(node.id)) {
                                 enqueueSnackbar('Этот тег уже в облаке',
                                     {
                                         variant: 'info', autoHideDuration: 2000,
                                         anchorOrigin: {vertical: 'top', horizontal: 'right'}
                                     })
                             } else {
                                 if (props.setTags != undefined && props.tags != undefined) {
                                     props.setTags([...props.tags, node])
                                 }
                             }
                         }}
            />
        </div>
    )
}