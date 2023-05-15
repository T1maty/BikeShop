import React from 'react'
import {ServiceProduct, useCurrency} from "../../../entities"
import s from "./ServiceTable.module.scss"
import {Button} from "../../../shared/ui"
import {TableProductItem} from "../../../features"

type ServiceTableProps = {
    data: ServiceProduct[] | null
    setData: (v: ServiceProduct[]) => void
    serviceTableCallback: () => void
    disabledButton: boolean
    summ: number
}

const ServiceTableProduct = (props: ServiceTableProps) => {

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)

    const userClickHandler = () => {
        props.serviceTableCallback()
    }

    return (
        <div className={s.tableBox}>
            <div className={s.tableBox_buttons}>
                <div className={s.buttons_editBtn}>
                    <Button onClick={userClickHandler} disabled={props.disabledButton}>
                        Редактор товаров
                    </Button>
                </div>
                <div className={s.buttons_discountField}>
                    <div className={s.discountField_title}>
                        Скидка
                    </div>
                    <div className={s.discountField_value}>
                        30%
                    </div>
                </div>
                <div className={s.buttons_resultField}>
                    {r(props.summ * fbts.c) + ' ' + fbts.s}
                </div>
            </div>
            <div className={s.tableBox_table}>
                <div className={s.scroll_wrapper}>
                    {
                        (props.data != null) && (props.data.length != 0) ?
                            props.data.map((item, index) => {
                                return (
                                    <>
                                        <TableProductItem key={index}
                                                          name={item.name}
                                                          price={item.price}
                                                          count={item.quantity}
                                                          onDoubleClick={() => {
                                                              props.setData(props.data?.filter(n => n.productId != item.productId)!)
                                                          }}
                                                          unitName={item.quantityUnitName}
                                        />
                                    </>
                                )
                            })
                            : <div>Список пуст</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ServiceTableProduct;