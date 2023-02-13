import React from "react";
import { useSumAndTypeToSum } from "../../store/defaultValues";
import { ICurrencyExchange, statType } from "../../store/interfaces";
import "./StatsList.scss";

const StatsList: React.FC<{
  type: statType;
  currencyList: ICurrencyExchange[];
}> = ({ type, currencyList }) => {
  const { sum, typeToSum } = useSumAndTypeToSum(type, currencyList);
  return (
    <ul className="stats-list">
      <li key={-1}>
        <div className="stats-list-color"></div>
        <div className="stats-list-title">type</div>
        <div className="stats-list-sum">rub</div>
      </li>
      {Array.from(typeToSum).map((item, i) => {
        return (
          <li key={i}>
            <div
              className="stats-list-color"
              style={{ backgroundColor: item[0].color }}
            ></div>
            <div className="stats-list-title">{item[0].title}</div>
            <div className="stats-list-sum">{item[1]}</div>
          </li>
        );
      })}
      <li key={typeToSum.size}>
        <div className="stats-list-title">Total:</div>
        <div className="stats-list-sum">{sum}</div>
      </li>
    </ul>
  );
};

export default StatsList;
