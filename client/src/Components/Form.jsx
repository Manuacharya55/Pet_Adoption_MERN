import React from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import TextArea from "./ui/TextArea";

// accept props
const Form = ({ array }) => {
  return (
    <form>
      {array.map((curEle) => {
        switch (curEle.type) {
          case "textarea":
            return <TextArea props={curEle} />;
            break;
          default:
            return <Input props={curEle} />;
            break;
        }
      })}
      <Button buttonName="login" type="main" />
    </form>
  );
};

export default Form;
