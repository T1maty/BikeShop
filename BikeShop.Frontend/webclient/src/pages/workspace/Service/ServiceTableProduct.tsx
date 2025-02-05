import React, {memo, useState} from 'react'
import {ServiceProduct, useCurrency} from "../../../entities"
import s from "./ServiceTable.module.scss"
import {Button} from "../../../shared/ui"
import {ChooseDiscountModal, TableProductItem} from "../../../features"
import useService from "./ServiceStore";
import {DiscountTargetEnum} from "../../../entities/enumerables/DiscountTargetEnum";

type ServiceTableProps = {
    data: ServiceProduct[] | null
    setData: (v: ServiceProduct[]) => void
    serviceTableCallback: () => void
    disabledButton: boolean
    summ: number
}

const ServiceTableProduct = memo((props: ServiceTableProps) => {

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)
    const masters = useService(s => s.masters)

    const [openDiscount, setOpenDiscount] = useState(false)
    const userClickHandler = () => {
        props.serviceTableCallback()
    }

    const setQuantity = (q: number, item: ServiceProduct) => {
        props.setData(props.data!.map(n => {
            if (n.productId === item.productId) {
                let newItem = n
                newItem.quantity = q
                return newItem
            } else {
                return n
            }
        }))
    }

    return (
        <div className={s.tableBox}>
            <ChooseDiscountModal open={openDiscount} setOpen={setOpenDiscount} onChange={(d) => {

            }}
                                 target={DiscountTargetEnum.WorkshopProductsTotal}/>
            <div className={s.tableBox_buttons}>
                <div className={s.buttons_editBtn}>
                    <Button onClick={userClickHandler} disabled={props.disabledButton}>
                        Редактор товаров
                    </Button>
                </div>
                <div className={s.buttons_discountField} onClick={() => {
                    setOpenDiscount(true)
                }}>
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
                                                          setUser={(User) => {
                                                              let data = props.data?.map(n => {
                                                                  if (n.productId === item.productId) return {
                                                                      ...n,
                                                                      userId: User.id
                                                                  }
                                                                  return n
                                                              })
                                                              props.setData(data!)
                                                          }}
                                                          name={item.name}
                                                          price={item.price}
                                                          count={item.quantity}
                                                          userLastName={masters.find(n => n.id === item.userId)?.lastName}
                                                          setQuantity={(q) => {
                                                              setQuantity(q, item)
                                                          }}
                                                          onDoubleClick={() => {
                                                              //props.setData(props.data?.filter(n => n.productId != item.productId)!)
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
});

export default ServiceTableProduct;