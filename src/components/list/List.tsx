import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IAllStats, IIncome, IListProps } from "../../store/interfaces";
import "./List.scss";

const List: React.FC<IListProps> = ({ type }) => {
  const list = useSelector((state: any) => state.income.currentStats.income); //state: any

  const [visibility, setVisibility] = useState<boolean[]>([]);

  const changeVisibility = (index: number) =>
    setVisibility((prev) =>
      prev.map((item, i) => (index === i ? !item : item))
    );

  return (
    <ul className={`list-${type}`}>
      {list.map((incomeItem: IIncome, index: number) => {
        if (visibility.length <= index)
          setVisibility((prev) => prev.concat([false]));
        return (
          <li key={index}>
            <div className="type-value" onClick={() => changeVisibility(index)}>
              <div className="type">{incomeItem.type}</div>
              <div className="value">{incomeItem.value}</div>
            </div>
            {visibility[index] ? (
              <p className="description">{incomeItem.description}</p>
            ) : (
              <></>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
