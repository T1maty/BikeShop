import React, {FC, MouseEvent} from "react";
import cls from './CustomTable.module.scss'

interface CustomTableProps {
    theadData: string[],
    tbodyData: object[],
    customClass?: string
}

interface TableHeadItemProps {
    theadData: string[]
}

interface TableRowProps {
    data: any
}

export const CustomTable: FC<CustomTableProps> = ({theadData, tbodyData, customClass}) => {
        return (
            <table className={`${customClass} ${cls.table}`}>
                <thead className={cls.head}>
                <TableHeadItem theadData={theadData}/>
                </thead>
                <tbody className={cls.body}>
                {tbodyData.map((item: any) => {
                    return <TableRow key={item.id} data={item}/>;
                })}
                </tbody>
            </table>
        );
    }
;


const TableHeadItem: FC<TableHeadItemProps> = ({theadData}) => {
    return (
        <tr className={cls.head__items}>
            {
                theadData.map((item: any) => (
                        <td title={item} className={cls.head__item}>
                            {item}
                        </td>
                    )
                )
            }
        </tr>
    )
};


const TableRow = ({data}: TableRowProps) => {
    const TestFunction = (e: any, id: any) => {
        e.preventDefault()
        const circle = document.createElement("span");
        circle.className = `${cls.span}`
        circle.innerHTML = `${id}`
        circle.style.left = `${e.clientX}px`;
        circle.style.top = `${e.clientY}px`;
        e.currentTarget.appendChild(circle)
    }
    const arr = [data.id, data.name, data.price, data.description]
    return (
        // @ts-ignore
        <tr className={cls.body__items} onContextMenu={(e) => TestFunction(e, data.id)}>
            {arr.map((item) => {
                return <td key={item} className={cls.body__item}>{item}</td>;
            })}
        </tr>
    );
};
