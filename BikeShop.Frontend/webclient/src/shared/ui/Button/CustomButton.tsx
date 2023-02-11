import React from 'react';
import s from './CustomButton.module.css'

type CustomButtonPropsType = {
    title: string;
    onClick: () => void
}

const CustomButton: React.FC<CustomButtonPropsType> = ({title, onClick}) => {

    const buttonClickHandler = () => {
        onClick();
    }

    return (
        <div>
            <button
                className={s.btn}
                type="button"
                onClick={buttonClickHandler}>
                    <span>
                        {title}
                    </span>
            </button>
        </div>
    )
}

export default CustomButton;

// другие варинты кнопки

// <button className="btn orange" type="button"><span>Medium-length button</span></button>

// <button className="btn red" type="button">
//     <span>Extra-long button to let you appreciate the effect</span>
// </button>