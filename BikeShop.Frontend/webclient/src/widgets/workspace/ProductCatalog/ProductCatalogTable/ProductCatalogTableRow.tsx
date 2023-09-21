import React from 'react';
import {ProductFullData, useCurrency} from "../../../../entities";
import s from './ProductCatalogTable.module.scss'
import noImg from '../../../../shared/assets/workspace/no-image-svgrepo-com.svg'
import useCardCatalogStore from "../../../../pages/workspace/CardCatalog/CardCatalogStore";
import useEditProductCardModal
    from "../../../../features/ProductCatalogFeatures/EditProductCardModal/EditProductCardModalStore";

const ProductCatalogTableRow = (p: { product: ProductFullData }) => {
    const selectedStorage = useCardCatalogStore(s => s.selectedStorage)
    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)
    const setOpenEPCM = useEditProductCardModal(s => s.setOpenEditProductCardModal)
    const setCurrentProduct = useEditProductCardModal(s => s.setCurrentProduct)

    //let st = storageData.find(n => n.productId === p.product.id)
    let mainImg = p.product.productImages.filter(n => n.productId === p.product.product.id)
    let mainOptions = p.product.productOptions.filter(n => n.productId === p.product.product.id)

    let available = 0
    let reserved = 0

    if (selectedStorage != null) {
        //available = p.product.productStorageQuantity[p.product.product.id][selectedStorage.id] - p.product.productStorageReserved[p.product.product.id][selectedStorage.id]
        //reserved = p.product.productStorageReserved[p.product.product.id][selectedStorage.id]
    }
    let rowStyle = {}
    let availableStyle = {}
    if (available > 0) {
        rowStyle = {borderColor: "#95ff78"};
        availableStyle = {color: "#95ff78"}
    }
    if (available < 0) {
        rowStyle = {borderColor: "#ff5c5c"};
        availableStyle = {color: "#ff5c5c"}
    }

    return (
        <div className={s.row} style={rowStyle} onDoubleClick={() => {
            setCurrentProduct(p.product)
            setOpenEPCM(true)
        }}>
            <div className={s.main_product}>
                <img className={s.m_img} src={mainImg.length > 0 ? mainImg[0].url : noImg} alt={"NoPhoto"}/>
                <div className={s.m_data}>
                    <div className={s.m_data_name}>{p.product.product.name}</div>
                    <div className={s.m_data_numbs}>
                        <div className={s.m_data_numbs_all_prices}>
                            <div className={s.m_data_numbs_retail}>
                                <div className={s.m_data_numbs_retail_label}>Роздріб:</div>
                                <div
                                    className={s.m_data_numbs_retail_value}>{r(p.product.product.retailPrice * fbts.c) + fbts.s}</div>
                            </div>
                            <div className={s.m_data_numbs_prices}>
                                <div className={s.m_data_numbs_prices_label}>Опт.</div>
                                <div
                                    className={s.m_data_numbs_prices_value}>{r(p.product.product.dealerPrice * fbts.c) + fbts.s}</div>
                                <div className={s.m_data_numbs_prices_label}>Закуп.</div>
                                <div
                                    className={s.m_data_numbs_prices_value}>{r(p.product.product.incomePrice * fbts.c) + fbts.s}</div>

                            </div>
                        </div>
                        <div className={s.m_data_numbs_storage}>
                            <div className={s.m_data_numbs_storage_label} style={availableStyle}>Доступно</div>
                            <div className={s.m_data_numbs_storage_value}
                                 style={availableStyle}>{available + p.product.product.quantityUnitName}</div>
                            <div className={s.m_data_numbs_storage_label}>Бронь</div>
                            <div
                                className={s.m_data_numbs_storage_value}>{reserved + p.product.product.quantityUnitName}</div>
                        </div>
                        <div className={s.m_data_numbs_options}>{mainOptions.map((opt, index) => <div
                            className={s.m_data_numbs_options_option} key={index}>
                            <div className={s.m_data_numbs_options_option_label}>{opt.optionName + ': '}</div>
                            <div className={s.m_data_numbs_options_option_value}>{opt.name}</div>
                        </div>)}</div>
                    </div>
                </div>
                <div className={s.m_desc}>
                    {p.product.productCard.description === "" ? "Опису немає =(" : p.product.productCard.description}
                </div>
                <div className={s.m_ind}>
                    <div className={s.m_ind_art}>
                        <div className={s.m_ind_art_label}>Артикул:</div>
                        <div className={s.m_ind_art_value}>{p.product.product.id}</div>
                    </div>
                    <div className={s.m_ind_catalogkey}>
                        <div className={s.m_ind_catalogkey_label}>Катаолжний номер:</div>
                        <div className={s.m_ind_catalogkey_value}>{p.product.product.catalogKey}</div>

                    </div>
                    <div className={s.m_ind_status}>
                        JustCreatedByUser
                    </div>
                </div>

            </div>
            <div className={s.binded_products}>
                {
                    p.product.bindedProducts.slice(1).map((prod, index) => {
                        let photo = p.product.productImages.filter(n => n.productId === prod.id)
                        let options = p.product.productOptions.filter(n => n.productId === prod.id)
                        return (<div className={s.binded_product} key={index}>
                            <img className={s.binded_product_img} src={photo.length > 0 ? photo[0].url : noImg}
                                 alt={"NoPhoto"}></img>
                            <div className={s.binded_product_name}>{prod.name}</div>
                            <div className={s.binded_product_options}>
                                {options.map(n => <div className={s.binded_product_options_option}>
                                    <div className={s.binded_product_options_option_label}>{n.optionName + ": "}</div>
                                    <div className={s.binded_product_options_option_value}>{n.name}</div>
                                </div>)}
                            </div>
                            <div className={s.binded_product_prices}>
                                <div
                                    className={s.binded_product_prices_retail}>{r(prod.retailPrice * fbts.c) + fbts.s}</div>
                                <div
                                    className={s.binded_product_prices_opt}>{r(prod.dealerPrice * fbts.c) + fbts.s}</div>
                                <div
                                    className={s.binded_product_prices_income}>{r(prod.incomePrice * fbts.c) + fbts.s}</div>
                            </div>
                            <div className={s.binded_product_storage}>
                                <div className={s.binded_product_storage_available}>
                                    <div className={s.binded_product_storage_available_label}>Доступно:</div>
                                    <div className={s.binded_product_storage_available_value}>11шт.</div>
                                </div>
                                <div className={s.binded_product_storage_reserved}>
                                    <div className={s.binded_product_storage_reserved_label}>Бронь:</div>
                                    <div className={s.binded_product_storage_reserved_value}>11шт.</div>
                                </div>
                            </div>
                            <div className={s.binded_product_int}>
                                <div className={s.binded_product_int_art}>
                                    <div className={s.binded_product_int_art_label}>Артикул:</div>
                                    <div className={s.binded_product_int_art_value}>{prod.id}</div>
                                </div>
                                <div className={s.binded_product_int_catalogkey}>
                                    <div className={s.binded_product_int_catalogkey_label}>Каталожний номер:</div>
                                    <div className={s.binded_product_int_catalogkey_value}>{prod.catalogKey}</div>
                                </div>
                            </div>
                        </div>)
                    })}
            </div>
        </div>
    );
};

export default ProductCatalogTableRow;