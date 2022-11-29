import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const STYLES = ["btn--primary", "btn--pink", "btn--white", "btn--blue"];

const SIZES = ["btn--medium", "btn--large"];

function Button(props) {
    const checkButtonStyle = STYLES.includes(props.buttonStyle)
        ? props.buttonStyle
        : STYLES[0];

    const checkButtonSize = SIZES.includes(props.buttonSize)
        ? props.buttonSize
        : SIZES[0];

    return (
        <Link to={props.buttonLink} className="btn-mobile">
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={props.onClick}
                type={props.type}
            >
                {props.name}
            </button>
        </Link>
    );
}

export default Button;
