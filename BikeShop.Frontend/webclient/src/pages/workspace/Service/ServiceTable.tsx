import React from 'react';
import {Button} from '../../../shared/ui';
import s from './ServiceTable.module.scss';
import {TableProductItem} from '../../../features';
import {ServiceProductWork} from "../../../entities/requests/CreateService";

type ServiceTableProps = {
    data: ServiceProductWork[]
    buttonTitle: string
    serviceTableCallback: () => void
}

export const ServiceTable: React.FC<ServiceTableProps> = ({data, buttonTitle, serviceTableCallback}) => {

    const userClickHandler = () => {
        serviceTableCallback()
    }

    return (
        <div className={s.tableBox}>
            <div className={s.tableBox_buttons}>
                <div className={s.buttons_editBtn}>
                    <Button onClick={userClickHandler}>
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
                    data.length === 0 ? <div>Список пуст</div> :
                    data.map(item => {
                        return (
                            <TableProductItem key={item.quantityUnitId}
                                              name={item.name}
                                              price={item.price}
                                              count={1}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
};