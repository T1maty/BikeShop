import React, {useEffect} from 'react';
import {Button, CustomModal, UniTable} from "../../shared/ui";
import useProductStickerManager from "./ProductStickerManagerStore";
import {Columns} from "./Columns";
import {SupplyInvoiceProduct} from "../../entities/entities/Acts/SupplyInvoice/SupplyInvoiceProduct";
import {CatalogAPI} from "../../entities";
import Enumerable from "linq";
import {TableRow} from "./TableRow";
import s from './ProductStickerManager.module.scss'
import {useApp} from "../../entities/globalStore/AppStore";
import {useSnackbar} from "notistack";

const ProductStickerManager = (props: { items: SupplyInvoiceProduct[] }) => {
    const {open, setOpen, products, setProducts} = useProductStickerManager(s => s)
    const AgentPrintProductSticker = useApp(n => n.AgentPrintProductSticker)
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        if (open) {
            console.log(props.items)
            CatalogAPI.getProductsByIds(Enumerable.from(props.items).select(g => g.productId).toArray()).then((result) => {
                let data = props.items.map(n => {
                    return {
                        id: n.productId,
                        name: n.name,
                        catalogKey: n.catalogKey,
                        quantity: n.quantity,
                        quantitySticker: n.quantity,
                        product: result.data.find(h => h.id === n.productId)
                    } as TableRow
                })
                setProducts(data)
                console.log(data)
            })
        }
    }, [open])

    const printQueue = () => {
        console.log(products.length)
        products.filter(n => n.quantitySticker > 0).forEach((n) => {
            AgentPrintProductSticker(n.product.id, n.quantitySticker)
        })
        enqueueSnackbar('Стікери відправлені на друк', {variant: 'success', autoHideDuration: 3000})
        setOpen(false)
    }

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <div className={s.table}>
                <UniTable rows={products} columns={Columns} setRows={setProducts}/>
                <Button onClick={() => {
                    printQueue()
                }}>Напечатать {Enumerable.from(products).sum(s => parseFloat(s.quantitySticker.toString()))} стикеров</Button>
            </div>
        </CustomModal>
    );
};

export default ProductStickerManager;