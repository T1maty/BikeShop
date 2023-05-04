import React from 'react'
import {User} from "../../../entities"
import s from './StuffProfileWork.module.scss'
import {Button, DeleteButton, EditableSpan} from "../../../shared/ui";
import {BikeShopPaths} from "../../../app/routes/paths";

interface StuffProfileWorkProps {
    user: User
}

export const StuffProfileWork: React.FC<StuffProfileWorkProps> = ({user}) => {
    return (
        <div className={s.stuffProfileWork_mainBlock}>
            <div className={s.stuffProfileWork_title}>
                Отработка
            </div>
            <div className={s.stuffProfileWork_hours}>
                <div>Смен: 20</div>
                <div>Часов: 200</div>
            </div>

            <div className={s.stuffProfileWork_salary}>
                <fieldset >
                    <legend>Зарплата на текущий момент</legend>
                    <div className={s.salary_info}>
                        <div className={s.salary_info1}>
                            <div>Ремонты:</div>
                            <div>Продажа ремонтов:</div>
                            <div>Продажи:</div>
                            <div>Ставка:</div>
                        </div>
                        <div className={s.salary_info2}>
                            <div>Бонусы:</div>
                            <div>Штрафы:</div>
                        </div>
                        <div className={s.salary_result}>Итого:</div>
                    </div>

                    <Button buttonDivWrapper={s.calcButton}
                            onClick={() => {}}
                    >
                        Рассчитать
                    </Button>
                </fieldset>
            </div>
        </div>
    )
}