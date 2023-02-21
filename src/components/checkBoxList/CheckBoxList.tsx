import React, { useState } from "react";
import { colors } from "../../store/defaultValues";
import { buttonStyle, ICheckBoxList } from "../../store/interfaces";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import "./CheckBoxList.scss";

const colorDivs = colors.map((str) => (
  <div className="color-box" style={{ backgroundColor: str }}></div>
));

const CheckBoxList: React.FC<ICheckBoxList> = ({
  title,
  changeTitle,
  getList,
  changeActive,
  create,
}) => {
  const [titleOfType, setTitleOfType] = useState<string>("");
  const [currentColor, setCurrentColor] = useState(0);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitleOfType("");
    create({ active: true, title: titleOfType, color: colors[currentColor] });
  };

  return (
    <div className="checkbox-list">
      <h2 onClick={changeTitle}>{`${title}`}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitleOfType(e.target.value)}
          value={titleOfType}
          maxLength={15}
        />
        <Dropdown
          width="4rem"
          height="4rem"
          options={colorDivs}
          currentOption={colorDivs[currentColor]}
          changeCurrentOption={(i) => setCurrentColor(i)}
        />
        <Button
          type="submit"
          content={`add ${title.slice(0, -1).toLowerCase()}`}
          style={buttonStyle.standart}
        />
      </form>
      <ul>
        {getList().map((item, index) => (
          <li
            key={index}
            className={`color-title ${item.active ? "active" : ""}`}
            onClick={() => changeActive(index)}
          >
            <div
              className="color"
              style={{ backgroundColor: `${item.color}` }}
            ></div>
            <div className="title">{item.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckBoxList;
