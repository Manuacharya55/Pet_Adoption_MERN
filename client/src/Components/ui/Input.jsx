import React, { forwardRef } from "react";

const Input = forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className={`form-group ${className || ""}`}>
      {label && <label>{label}</label>}
      <input
        ref={ref}
        {...props}
        className={error ? "error-border" : ""}
      />
      {error && <span className="error-text">{error.message}</span>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
