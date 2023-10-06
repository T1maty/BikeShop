import React, {useState} from 'react';
import s from "./OrderProductTable.module.scss";
import {AsyncSelectSearchProduct, DeleteButton} from "../../../../shared/ui";
import useCreateOrderModal from "./CreateOrderModalStore";
import {ChooseProductModal} from "../../ProductCatalog/ChooseProductModal/ChooseProductModal";
import {Product, useCurrency} from "../../../../entities";


const OrderProductTable = () => {
    const incButtonHandler = useCreateOrderModal(s => s.incButtonHandler)
    const decButtonHandler = useCreateOrderModal(s => s.decButtonHandler)
    const removeButtonHandler = useCreateOrderModal(s => s.removeButtonHandler)
    const addProduct = useCreateOrderModal(s => s.addProduct)
    const products = useCreateOrderModal(s => s.products)

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)

    const [openChooseProduct, setOpenChooseProduct] = useState(false)

    return (
        <div className={s.products}>
            <ChooseProductModal open={openChooseProduct} setOpen={setOpenChooseProduct}
                                addData={(p: Product) => {
                                    addProduct(p)
                                    setOpenChooseProduct(false)
                                }}/>
            <div className={s.select}>
                <div style={{width: "100%"}}><AsyncSelectSearchProduct onSelect={addProduct}/>
                </div>
                <div className={s.s_b} onClick={() => {
                    setOpenChooseProduct(true)
                }}>+
                </div>
            </div>
            <div className={s.table}>
                {products.map((n, ind) =>
                    <div className={s.table_row} key={ind}>
                        <div>{n.p.name}</div>
                        <div className={s.table_row_right}>
                            <div className={s.row_quant}>
                                <div className={s.row_quant_butt} onClick={() => {
                                    decButtonHandler(n.p.id)
                                }}>-
                                </div>
                                <div>{n.q + n.p.quantityUnitName}</div>
                                <div className={s.row_quant_butt} onClick={() => {
                                    incButtonHandler(n.p.id)
                                }}>+
                                </div>
                                <DeleteButton className={s.row_quant_butt} size={15}
                                              onClick={() => {
                                                  removeButtonHandler(n.p.id)
                                              }}/>
                            </div>
                            <div className={s.table_row_right_data}>
                                {r(n.p.retailPrice * n.q * fbts.c) + fbts.s}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>

    );
};

export default OrderProductTable;