import React, {useState} from 'react';
import s1 from './OrderModal.module.scss'
import s from './../CreateOrderModal/OrderProductTable.module.scss'
import {ChooseProductModal} from "../../ProductCatalog/ChooseProductModal/ChooseProductModal";
import {Product, useCurrency} from "../../../../entities";
import {AsyncSelectSearchProduct, Button, DeleteButton} from "../../../../shared/ui";
import useOrderModal from "./OrderModalStore";
import useCreateOrderModal from "../CreateOrderModal/CreateOrderModalStore";

const OrderModalPage2 = () => {
    const [openChooseProduct, setOpenChooseProduct] = useState(false)
    const productTable = useOrderModal(s => s.productTable)
    const addProduct = useOrderModal(s => s.addProduct)
    const deliverySelectOptions = useCreateOrderModal(s => s.deliverySelectOptions)

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)

    return (
        <div className={s1.page2}>

            <div className={s.products}>
                <ChooseProductModal open={openChooseProduct} setOpen={setOpenChooseProduct}
                                    addData={(p: Product) => {
                                        addProduct(p, 1)
                                        setOpenChooseProduct(false)
                                    }}/>
                <div className={s.select}>
                    <div style={{width: "100%"}}><AsyncSelectSearchProduct onSelect={(p) => {
                        addProduct(p, 1)
                    }}/>
                    </div>
                    <div className={s.s_b} onClick={() => {
                        setOpenChooseProduct(true)
                    }}>+
                    </div>
                </div>
                <div className={s.table}>
                    {productTable.map((n, ind) =>
                        <div className={s.table_row} key={ind}>
                            <div>{n.name}</div>
                            <div className={s.table_row_right}>
                                <div className={s.row_quant}>
                                    <div className={s.row_quant_butt} onClick={() => {
                                        addProduct({id: n.productId} as Product, -1)
                                    }}>-
                                    </div>
                                    <div>{n.quantity + n.quantityUnitName}</div>
                                    <div className={s.row_quant_butt} onClick={() => {
                                        addProduct({id: n.productId} as Product, 1)
                                    }}>+
                                    </div>
                                    <DeleteButton className={s.row_quant_butt} size={15}
                                                  onClick={() => {
                                                      addProduct({id: n.productId} as Product, 0)
                                                  }}/>
                                </div>
                                <div className={s.table_row_right_data}>
                                    {r(n.price * n.quantity * fbts.c) + fbts.s}
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
            <Button>Зребегти</Button>
        </div>
    );
};

export default OrderModalPage2;