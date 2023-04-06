import React from 'react'
import {ThemeSwitcher} from "../../../../shared/ui/ThemeSwitcher/ThemeSwitcher"
import {LangSwitcher} from "../../LangSwitcher"

const Buttons = ({off} : any) => {

    if (off) return null

    return (
        <div style={{position: "absolute", left: 0, top: '50vh'}}>
            <div style={{marginBottom: 10}}>
                <ThemeSwitcher/>
            </div>
            <div>
                <LangSwitcher/>
            </div>
        </div>
    )
}

export default Buttons