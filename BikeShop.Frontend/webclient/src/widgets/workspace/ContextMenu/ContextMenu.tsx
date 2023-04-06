import React, {
    memo, MouseEvent, useCallback,
    useEffect, useRef, useState
} from 'react'
import cls from './ContextMenu.module.scss'
import {Button} from "shared/ui"
import {Portal} from "../Portal/Portal"
import clsx from "clsx"

interface ContextMenuProps {
    isOpen: boolean
    onClose?: (variant?: string) => void
    // settings: string[]
    settings: SettingsType[]
    top?: number
    left?: number
}

interface SettingsType {
    name: string
    click: () => void
}

const ANIMATION_DELAY = 300

export const ContextMenu = memo(({isOpen, onClose, settings, top, left}: ContextMenuProps) => {

    const [isClosing, setIsClosing] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()

    const closeHandler = useCallback((e?: MouseEvent, value?: string, click?: any) => {
        if (onClose) {
            { click ? click() : '' } // добавлено
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose(value)
                setIsClosing(false)
            }, ANIMATION_DELAY)
        }
    }, [onClose])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler()
        }
    }, [closeHandler])

    const onContextMenuHandler = (e: MouseEvent) => {
        e.preventDefault()
        closeHandler()
    }

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }
        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing
    }

    if (!isOpen) return null

    return (
        <Portal>
            <div className={clsx(cls.menu, mods)}>
                <div className={cls.overlay}
                     onClick={closeHandler}
                     onContextMenu={onContextMenuHandler}
                >
                    <div className={cls.content}
                         onClick={(e) => e.stopPropagation()}
                         style={{left: left, top: top}}
                    >
                        {
                            // settings.map((value, index) => (
                            //     <Button key={index}
                            //             className={cls.button}
                            //             onAnimate={false}
                            //             onClick={e => closeHandler(e, e.currentTarget.textContent as string)}
                            //     >
                            //         {value}
                            //     </Button>
                            // ))

                            settings.map((el, index) => (
                                <Button key={index}
                                        className={cls.button}
                                        onAnimate={false}
                                        onClick={(e) => closeHandler(e, e.currentTarget.textContent as string, el.click)}
                                >
                                    {el.name}
                                </Button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Portal>
    )
})