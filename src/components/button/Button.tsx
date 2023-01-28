import React from "react";
import "./Button.scss";

export enum buttonStyle {
  standart,
  reverse,
}

interface IButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  style: buttonStyle;
  content: string;
  handleClick?: () => void;
}

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
