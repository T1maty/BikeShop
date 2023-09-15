import React from 'react';
import {ContextMenu} from "../../../widgets";
import useSchedule from "../../../pages/workspace/SchedulePage/SchedulePageStore";

interface p {
    open: { o: boolean, x: number, y: number }
    setOpen: (v: { o: boolean, x: number, y: number }) => void
}

const ScheduleContextItem = (props: p) => {

    const hoveredItem = useSchedule(s => s.hoveredItem)
    const deleteItem = useSchedule(s => s.deleteItem)

    const settings = [
        {
            name: 'Отменить смену',
            click: () => {
                deleteItem(hoveredItem!.id)
            }
        },
    ]
    return (
        <ContextMenu
            isOpen={props.open.o}
            onClose={() => {
                props.setOpen({o: false, x: 0, y: 0})
            }}
            settings={settings}
            top={props.open.y}
            left={props.open.x}
        />
    );
};

export default ScheduleContextItem;