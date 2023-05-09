import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'

interface p {
    buf: string
    lastBarcode: string
    setBarcode: (v: string) => void
    faild: boolean
}

export const useBarcode = create<p>()(persist(devtools(immer((set, get) => ({
    faild: false,
    lastBarcode: '',
    buf: '',
    setBarcode: (v) => {
        if (v === 'Enter') {
            set({lastBarcode: get().buf})
            set({buf: ''})
        } else {
            if (get().buf === '') {
                setTimeout(() => {
                    set({buf: ''})
                }, 300)
            }
            set(state => {
                state.buf = state.buf + v
            })
        }
    }

}))), {
    name: "useBarcode",
    version: 1
}));