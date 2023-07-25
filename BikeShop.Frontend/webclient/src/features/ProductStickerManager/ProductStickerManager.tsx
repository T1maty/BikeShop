import React, {useEffect, useState} from 'react';
import {Button, CustomModal, UniTable} from "../../shared/ui";
import useProductStickerManager from "./ProductStickerManagerStore";
import {Columns} from "./Columns";
import {SupplyInvoiceProduct} from "../../entities/entities/Acts/SupplyInvoice/SupplyInvoiceProduct";
import {CatalogAPI, useCurrency} from "../../entities";
import Enumerable from "linq";
import {TableRow} from "./TableRow";
import s from './ProductStickerManager.module.scss'
import {PrintModal} from "../PrintModal/PrintModal";
import {ProductSticker} from "../../widgets";
import {Product} from "entities";

const ProductStickerManager = (props: { items: SupplyInvoiceProduct[] }) => {
    const {open, setOpen, products, setProducts} = useProductStickerManager(s => s)
    const cur = useCurrency(s => s.selectedCurrency)

    const [openPrint, setOpenPrint] = useState(false)
    const [curProd, setCurProd] = useState<Product | null>(null)
    const [trigger, setTrigger] = useState<'agent' | null>(null)
    const [copies, setCopies] = useState(1)

    const [queue, setQueue] = useState<TableRow[]>([])

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
        let toPrint = products.filter(n => n.quantitySticker > 0)
        setCopies(toPrint[0].quantitySticker)
        setCurProd({...toPrint[0].product})
        setOpenPrint(true)
        let data = [...toPrint]
        data.splice(0, 1)
        console.log(data.length)
        setQueue(data)
        setTrigger("agent")
    }

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <PrintModal open={openPrint} setOpen={setOpenPrint} copies={copies}
                        children={<ProductSticker product={curProd!} cur={cur!}/>} printAgentName={'ProductSticker'}
                        trigger={trigger} finaly={() => {
                console.log(queue.length)
                setTrigger(null)
                if (queue.length === 0) {
                    setOpenPrint(false)
                } else {
                    setCopies(queue[0].quantitySticker)
                    setCurProd({...queue[0].product})
                    let data = [...queue]
                    data.splice(0, 1)
                    setQueue(data)
                    console.log('finaly')
                    setTimeout(() => {
                        console.log('trigger')
                        setTrigger("agent")
                    }, 1000)
                }
            }}/>
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