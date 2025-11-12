import React from "react";

const Button = ({ buttonName, handleClick, type, isSubmitting }) => {
  return (
    <button onClick={handleClick} className={type} disabled={isSubmitting}>
      {isSubmitting ? "processing....." : buttonName}
    </button>
  );
};

export default Button;
