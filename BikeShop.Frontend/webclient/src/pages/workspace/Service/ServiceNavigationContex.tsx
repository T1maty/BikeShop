import React, {useState} from 'react'
import {ActServiceWork, CheckForServiceWork, ContextMenu, ServiceIncomeInvoice} from "../../../widgets"
import ServiceStore from "./ServiceStore"
import {PrintModal} from "../../../features"
import {ServiceSticker} from "../../../widgets/workspace/Invoices/Service/ServiceSticker";

interface p {
    open: { o: boolean, x: number, y: number }
    setOpen: (v: { o: boolean, x: number, y: number }) => void
}

export const ServiceNavigationContext = (props: p) => {

    const selected = ServiceStore(s => s.selectedNavService)

    const [v1, sv1] = useState(false)
    const [v2, sv2] = useState(false)
    const [v3, sv3] = useState(false)
    const [v4, sv4] = useState(false)

    const settings = [
        {
            name: 'Акт приема',
            click: () => {
                sv1(true)

            }
        },
        {
            name: 'Смета',
            click: () => {
                sv3(true)

            }
        },
        {
            name: 'Акт выдачи',
            click: () => {
                sv4(true)
            }
        },
        {
            name: 'Стикер',
            click: () => {
                sv2(true)

            }
        },
    ]
    return (
        <>
            <PrintModal open={v1} setOpen={sv1} children={<ServiceIncomeInvoice children={selected!}/>}
                        printAgentName={'WorkshopIn'}/>
            <PrintModal open={v2} setOpen={sv2} children={<ServiceSticker children={selected!}/>}
                        printAgentName={'WorkshopSticker'}/>
            <PrintModal open={v3} setOpen={sv3} children={<ActServiceWork children={selected!}/>}/>
            <PrintModal open={v4} setOpen={sv4} children={<CheckForServiceWork children={selected!}/>}
                        printAgentName={'WorkshopOut'}/>

            <ContextMenu
                isOpen={props.open.o}
                onClose={() => {
                    props.setOpen({o: false, x: 0, y: 0})
                }}
                settings={settings}
                top={props.open.y}
                left={props.open.x}
            />
        </>
    )
}