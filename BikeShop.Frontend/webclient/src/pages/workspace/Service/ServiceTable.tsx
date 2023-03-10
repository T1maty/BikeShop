import React from 'react';
import {Button} from '../../../shared/ui';
import s from './ServiceTable.module.scss';
import useService from './ServiceStore';
import {ServiceItemProductWork} from "../../../entities/models/ServiceItem";
import {TableProductItem} from "../../../features";

type ServiceTableProps = {
    data: ServiceItemProductWork[] | null
    buttonTitle: string
    serviceTableCallback: () => void
}

export const ServiceTable: React.FC<ServiceTableProps> = ({data, buttonTitle, serviceTableCallback}) => {

    const service = useService(s => s.currentService)

    const userClickHandler = () => {
        serviceTableCallback()
    }

    return (
        <div className={s.tableBox}>
            <div className={s.tableBox_buttons}>
                <div className={s.buttons_editBtn}>
                    <Button onClick={userClickHandler} disabled={service === null}>
                        {buttonTitle}
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
                    3
                </div>
            </div>
            <div className={s.tableBox_table}>
                {
                    (data != null) && (data.length != 0) ?
                        data.map(item => {
                            return (
                                <TableProductItem key={item.id}
                                                  name={item.name}
                                                  price={item.price}
                                                  count={1}
                                />
                            )
                        })
                        : <div>Список пуст</div>
                }
            </div>
        </div>
    );
};