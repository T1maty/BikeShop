import {MouseEvent} from "react";


export const createRipple = (event: MouseEvent<HTMLButtonElement>, cls: any): void => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${(event.clientY + document.body.scrollTop) - button.offsetTop - radius}px`;

    circle.classList.add(cls.ripple);
    const ripple = button.getElementsByClassName(cls.ripple);

    if (ripple.length > 3) {
        ripple[0].remove()
    }

    button.appendChild(circle);
}
