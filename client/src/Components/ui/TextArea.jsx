import React, { forwardRef } from "react";

const TextArea = forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className={`form-group ${props.className || ""}`}>
      {label && <label>{label}</label>}
      <textarea
        ref={ref}
        {...props}
        className={error ? "error-border" : ""}
      ></textarea>
      {error && <span className="error-text">{error.message}</span>}
    </div>
  );
});

TextArea.displayName = "TextArea";

export default TextArea;
