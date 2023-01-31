import React from "react";
import "./Button.scss";
import { buttonStyle, IButtonProps } from "../../store/interfaces";

const Button: React.FC<IButtonProps> = ({
  style,
  content,
  handleClick,
  type,
}) => {
  if (style === buttonStyle.standart)
    return (
      <button className="btn-standart" onClick={handleClick} type={type}>
        {content}
      </button>
    );
  return (
    <button className="btn-reverse" onClick={handleClick}>
      {content}
    </button>
  );
};

export default Button;
