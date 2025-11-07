import React from "react";

const Input = ({ props }) => {
  const { type, placeholder, name } = props;
  return <input type={type} placeholder={placeholder} name={name} />;
};

export default Input;
