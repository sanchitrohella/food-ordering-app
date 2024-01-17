import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <>
      <button
        className={`${classes.btn} ${props.className}`}
        type="click"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
