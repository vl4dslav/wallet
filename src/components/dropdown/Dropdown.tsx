import React, { useState } from "react";
import "./Dropdown.scss";
import { IDropdownProps } from "../../store/interfaces";

const Dropdown: React.FC<IDropdownProps> = ({
  currentOption,
  options,
  changeCurrentOption,
  width,
  height,
}) => {
  const [closed, setClosed] = useState<boolean>(true);

  return (
    <div className="dropdown-current" onClick={() => setClosed(!closed)}>
      <div
        style={{ width: `${width}`, height: `${height}` }}
        className={closed ? "" : "opened"}
      >
        {currentOption}
      </div>
      {closed ? (
        <></>
      ) : (
        <ul>
          {options.map((option, index) => (
            <li
              className="dropdown-li"
              style={{ width: `${width}`, height: `${height}` }}
              key={index}
              onClick={() => changeCurrentOption(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
