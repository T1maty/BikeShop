import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'

interface p {
    buf: string
    lastBarcode: string
    setBarcode: (v: string, onChange: (barcode: string) => void) => void
}

export const useBarcode = create<p>()(persist(devtools(immer((set, get) => ({
    lastBarcode: '',
    buf: '',
    setBarcode: (v, onChange) => {
        if (v === 'Enter' && get().buf != '' && get().buf.length > 8) {
            set({lastBarcode: get().buf})
            onChange(get().lastBarcode)
            set({buf: ''})
        } else {
            if (get().buf === '') {
                setTimeout(() => {
                    set({buf: ''})
                }, 100)
            }
            set(state => {
                state.buf += v
            })
        }
    }

}))), {
    name: "useBarcode",
    version: 1
}));