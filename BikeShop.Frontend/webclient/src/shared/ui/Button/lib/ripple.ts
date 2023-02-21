import {MouseEvent} from "react";

export type Animate = 'center' | 'adaptive'

export const createRipple = (event: MouseEvent<HTMLButtonElement>, cls: any, animate: Animate = 'adaptive'): void => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    if (animate === 'adaptive') {
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${(event.clientY + document.body.scrollTop) - button.offsetTop - radius}px`;
        circle.style.width = circle.style.height = `${diameter}px`;
    } else {
        circle.style.left = `${0}px`;
        circle.style.top = `${0}px`;
        circle.style.width  = `${button.clientWidth}px`
        circle.style.height = `${button.clientHeight}px`
    }
    circle.classList.add(cls.ripple);
    const ripple = button.getElementsByClassName(cls.ripple);
    if (ripple.length > 3) {
        ripple[0].remove()
    }

    button.appendChild(circle);
}
