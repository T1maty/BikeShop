import React, {
    AllHTMLAttributes, HTMLAttributes,
    type MouseEvent,
    type ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'
import cls from './Modal.module.scss'
import clsx from "clsx";
import {Portal} from "../../../widgets/workspace/Portal/Portal";

interface ModalProps extends HTMLAttributes<HTMLDivElement>{
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    open: boolean
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        open,
        onClose,
        ...restProps
    } = props

    const [isClosing, setIsClosing] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, ANIMATION_DELAY)
        }
    }, [onClose])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler()
        }
    }, [closeHandler])

    useEffect(() => {
        if (open) {
            window.addEventListener('keydown', onKeyDown)
        }
        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [open, onKeyDown])

    const onContentClick = (e: MouseEvent): void => {
        e.stopPropagation()
    }
    if (!open) return null


    const mods: Record<string, boolean> = {
        [cls.opened]: open,
        [cls.isClosing]: isClosing
    }
    return (
        <Portal>
            <div className={clsx(cls.Modal, mods, [className])} {...restProps}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
