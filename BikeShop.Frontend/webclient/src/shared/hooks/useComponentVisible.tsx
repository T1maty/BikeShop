import React, {useState, useEffect, useRef} from 'react'

export const useComponentVisible = (initialIsVisible: boolean) => {

    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
    const ref = useRef(null)

    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setIsComponentVisible(false)
        }
    }

    const handleClickOutside = (event: Event | React.SyntheticEvent) => {
        // @ts-ignore
        if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
            setIsComponentVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleHideDropdown, true)
        document.addEventListener('click', handleClickOutside, true)

        return () => {
            document.removeEventListener('keydown', handleHideDropdown, true)
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return { ref, isComponentVisible, setIsComponentVisible }
}

// FROM MUI
// const anchorRef = React.useRef<HTMLButtonElement>(null)
//
// const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen)
// };
//
// const handleClose = (event: Event | React.SyntheticEvent) => {
//     if (
//         anchorRef.current &&
//         anchorRef.current.contains(event.target as HTMLElement))
//     {
//         return;
//     }
//
//     setOpen(false)
// }

// function handleListKeyDown(event: React.KeyboardEvent) {
//     if (event.key === 'Tab') {
//         event.preventDefault()
//         setOpen(false)
//     } else if (event.key === 'Escape') {
//         setOpen(false)
//     }
// }

// function handleLogOut(event: Event | React.SyntheticEvent) {
//     handleClose(event)
//     logout()
//     navigate(BikeShopPaths.COMMON.LOGIN)
// }
//
// // return focus to the button when we transitioned from !open -> open
// const prevOpen = React.useRef(open)
//
// useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//         anchorRef.current!.focus();
//     }
//     prevOpen.current = open;
// }, [open])