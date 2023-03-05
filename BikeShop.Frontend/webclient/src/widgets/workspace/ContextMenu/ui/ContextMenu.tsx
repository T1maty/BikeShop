import React, {memo, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';
import cls from './ContextMenu.module.scss'
import {Button} from "shared/ui";
import {Portal} from "../../Portal/Portal";
import clsx from "clsx";

interface ContextMenuProps {
    settings: String[],
    isOpen: boolean,
    onClose?: (variant?: string) => void,
    left?: number,
    top?: number
}

const ANIMATION_DELAY = 300

const ContextMenu = memo(({onClose, top, isOpen, left, settings}:ContextMenuProps) => {

    const [isClosing, setIsClosing] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()
    const closeHandler = useCallback((e?: MouseEvent, value?: string) => {
        if (onClose) {
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

    const onContextMenuHandler = (e : MouseEvent) => {
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
                <div className={cls.overlay} onClick={closeHandler} onContextMenu={onContextMenuHandler}>
                    <div className={cls.content}
                         onClick={(e) => e.stopPropagation()}
                         style={{left: left, top: top}}
                    >
                        {settings.map((value, index) => (
                            <Button key={index}
                                    className={cls.button}
                                    onAnimate={false}
                                    onClick={e => closeHandler(e, e.currentTarget.textContent as string)}>
                                {value}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </Portal>
    );
});

export default ContextMenu;
