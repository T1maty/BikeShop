import React from 'react';
import {CustomModal, UniTable} from "../../shared/ui";
import {usePriceManager} from "./PricaManagerModalStore";
import {Columns} from "./Columns";
import s from "./PriceManagerModal.module.scss"
import {UpdateProductPricesModal} from "../ProductCatalogFeatures/UpdateProductPricesModal/UpdateProductPricesModal";
import {useSnackbar} from "notistack";
import useUpdateProductPricesModal
    from "../ProductCatalogFeatures/UpdateProductPricesModal/UpdateProductPricesModalStore";
import {Product} from "../../entities";

const PriceManagerModal = () => {

    const {enqueueSnackbar} = useSnackbar()
    const {open, setOpen, products, updateProduct} = usePriceManager(s => s)

    const openModal = useUpdateProductPricesModal(s => s.setOpenUpdateProductPricesModal)

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <UpdateProductPricesModal onSuccess={(p) => {
                updateProduct(p)
                enqueueSnackbar('Цена обновлена', {variant: 'success', autoHideDuration: 3000})
            }}/>
            <div className={s.table}>
                <UniTable rows={products} columns={Columns} rowOnDoubleClick={(r) => {
                    openModal(true, r as Product)
                }}/>
            </div>
        </CustomModal>
    );
};

export default PriceManagerModal;