import React from "react";
import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {
   // Use classNames library to conditionally apply CSS classes based on props
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   // Render the button element with the calculated class, onClick handler, and disabled state
   return (
      <button
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children} {/* Render the content within the button */}
      </button>
   );
}