import {MouseEvent} from "react";


export const createRipple = (event: MouseEvent<HTMLButtonElement>, cls: any): void => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${0}px`;
    circle.style.top = `${0}px`;

    circle.classList.add(cls.ripple);
    const ripple = button.getElementsByClassName(cls.ripple);

    if (ripple.length > 3) {
        ripple[0].remove()
    }

    button.appendChild(circle);
}
