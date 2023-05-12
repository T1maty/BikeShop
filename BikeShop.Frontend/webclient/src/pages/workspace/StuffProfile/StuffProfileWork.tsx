import React, {useEffect, useState} from 'react'
import {useCurrency, User} from "../../../entities"
import s from './StuffProfileWork.module.scss'
import {Button} from "../../../shared/ui"
import useStuffProfile from "./StuffProfileStore";

interface StuffProfileWorkProps {
    user: User
}


export const StuffProfileWork: React.FC<StuffProfileWorkProps> = ({user}) => {

    const r = useCurrency(s => s.roundUp)
    const fbts = useCurrency(s => s.fromBaseToSelected)
    const load = useStuffProfile(s => s.calculate);
    const calculateData = useStuffProfile(s => s.calculateData);
    const [sum, setSum] = useState(0)

    useEffect(() => {
        if (calculateData != null) {
            let sum = 0
            sum += calculateData.serviceWorks
            sum += calculateData.seviceProducts
            sum += calculateData.billsTotal
            sum += calculateData.rate
            setSum(sum)
        }
    }, [calculateData])

    return (
        <div className={s.stuffProfileWork_mainBlock}>
            <div className={s.stuffProfileWork_title}>
                Отработка
            </div>
            <div className={s.stuffProfileWork_hours}>
                <div>Смен:</div>
                <div>Часов: {calculateData?.hours}</div>
            </div>

            <div className={s.stuffProfileWork_salary}>
                <fieldset>
                    <legend>Зарплата на текущий момент</legend>
                    <div className={s.salary_info}>
                        <div className={s.salary_info1}>
                            <div>Ремонты: {r(calculateData ? calculateData.serviceWorks * fbts.c : 0) + fbts.s}</div>
                            <div>Продажи
                                ремонтов: {r(calculateData ? calculateData.seviceProducts * fbts.c : 0) + fbts.s}</div>
                            <div>Продажи: {r(calculateData ? calculateData.billsTotal * fbts.c : 0) + fbts.s}</div>
                            <div>Ставка: {r(calculateData ? calculateData.rate * fbts.c : 0) + fbts.s}</div>
                        </div>
                        <div className={s.salary_info2}>
                            <div>Бонусы: 0</div>
                            <div>Штрафы: 0</div>
                        </div>
                        <div className={s.salary_result}>Итого: {r(sum * fbts.c) + fbts.s}</div>
                    </div>

                    <Button buttonDivWrapper={s.calcButton}
                            onClick={() => {
                                load();
                            }}
                    >
                        Рассчитать
                    </Button>
                </fieldset>
            </div>
        </div>
    )
}