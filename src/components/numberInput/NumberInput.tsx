import React from "react";
import "./NumberInput.scss";
import { INumberInputProps } from "../../store/interfaces";

export const NumberInput: React.FC<INumberInputProps> = ({
  min = 0,
  max = 10,
  value = 0,
  changeCurrentValue,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userNumber = +e.target.value;
    if (isNaN(userNumber) || userNumber < min || userNumber > max) {
      return;
    }
    changeCurrentValue(userNumber);
  };

  return (
    <div className="number-input">
      <button
        type="button"
        onClick={() => {
          if (value - 1 < min) return;
          changeCurrentValue(value - 1);
        }}
      >
        -
      </button>
      <input type="text" value={value} onChange={handleChange} />
      <button
        type="button"
        onClick={() => {
          if (value + 1 > max) return;
          changeCurrentValue(value + 1);
        }}
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;
