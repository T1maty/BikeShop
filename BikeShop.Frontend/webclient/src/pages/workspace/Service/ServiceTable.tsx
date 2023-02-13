import React from 'react';
import {Button} from '../../../shared/ui';
import s from './ServiceTable.module.scss';
import {TableProductItem} from '../../../features';

type ServiceTableProps = {
    data: ItemType[]
}

type ItemType = {
    id: number
    title: string
    price: number
    count: number
}

const ServiceTable: React.FC<ServiceTableProps> = ({data}) => {

    return (
        <div className={s.tableBox}>
            <div className={s.tableBox_buttons}>
                <div className={s.buttons_editBtn}>
                    <Button onClick={() => {
                    }}>
                        Редактор
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
                    data.map(item => {
                        return (
                            <TableProductItem key={item.id}
                                              title={item.title}
                                              price={item.price}
                                              count={item.count}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ServiceTable;
