import React from "react";

const TextArea = ({ props }) => {
  const { placeholder, name } = props;
  return <textarea name={name} id="" placeholder={placeholder}></textarea>;
};

export default TextArea;
