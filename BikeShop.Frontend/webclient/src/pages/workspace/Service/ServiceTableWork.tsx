import React, {memo} from 'react';
import {ServiceWork, useCurrency} from "../../../entities"
import s from "./ServiceTable.module.scss"
import {Button} from "../../../shared/ui"
import {TableProductItem, TableProductItemAdditional} from "../../../features"
import useService from "./ServiceStore";

type ServiceTableProps = {
    data: ServiceWork[] | null
    setData: (v: ServiceWork[]) => void
    serviceTableCallback: () => void
    disabledButton: boolean
    summ: number
}

const ServiceTableWork = memo((props: ServiceTableProps) => {
    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)
    const masters = useService(s => s.masters)

    const userClickHandler = () => {
        props.serviceTableCallback()
    }

    const setQuantity = (q: number, item: ServiceWork) => {
        props.setData(props.data!.map(n => {
            if (n.workId === item.workId) {
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
            <div className={s.tableBox_buttons}>
                <div className={s.buttons_editBtn}>
                    <Button onClick={userClickHandler} disabled={props.disabledButton}>
                        Редактор услуг
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
                        (props.data !== null) && (props.data.length != 0) ?
                            props.data.map((item, index) => {
                                return (
                                    <>
                                        <TableProductItem key={index} setUser={(User) => {
                                            let data = props.data?.map(n => {
                                                if (n.workId === item.workId) return {
                                                    ...n,
                                                    userId: User.id
                                                }
                                                return n
                                            })
                                            props.setData(data!)
                                        }} userLastName={masters.find(n => n.id === item.userId)?.lastName}
                                                          name={item.name}
                                                          price={item.price}
                                                          count={item.quantity}
                                                          cPrice={item.complicationPrice}
                                                          setQuantity={(q) => {
                                                              setQuantity(q, item)
                                                          }}
                                                          onDoubleClick={() => {
                                                              //props.setData(props.data?.filter(n => n.workId != item.workId)!)
                                                          }}
                                                          onPriceClick={() => {
                                                              if (item.complicationPrice === 0 && item.description === '') {
                                                                  let newData = props.data?.map((value, indeX) => {
                                                                      if (indeX === index) {
                                                                          return {
                                                                              ...value,
                                                                              description: 'Описание осложнения'
                                                                          }
                                                                      } else {
                                                                          return value
                                                                      }
                                                                  })
                                                                  props.setData(newData!)
                                                              }
                                                          }}
                                        />
                                        {
                                            item.complicationPrice > 0 || item.description != '' ?
                                                <TableProductItemAdditional key={index}
                                                                            name={item.description}
                                                                            price={item.complicationPrice}
                                                                            count={item.quantity}
                                                                            onChange={(desc, price) => {
                                                                                let newData = props.data?.map((value, indeX) => {
                                                                                    if (indeX === index) {
                                                                                        return {
                                                                                            ...value,
                                                                                            description: desc,
                                                                                            complicationPrice: fstb.c * parseFloat(price)
                                                                                        }
                                                                                    } else {
                                                                                        return value
                                                                                    }
                                                                                })
                                                                                props.setData(newData!)
                                                                            }}
                                                />
                                                : <div/>
                                        }
                                    </>
                                )
                            })
                            : <div>Список пуст</div>
                    }
                </div>
            </div>
        </div>
    )
});

export default ServiceTableWork;