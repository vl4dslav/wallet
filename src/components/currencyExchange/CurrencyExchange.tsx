import React from "react";
import {
  ICurrencyExchange,
  ICurrencyExchangeProps,
} from "../../store/interfaces";
import "./CurrencyExchange.scss";

const CurrencyExchange: React.FC<ICurrencyExchangeProps> = ({ list }) => {
  return (
    <ul className="currency-exchange">
      Exchange rate
      {list.map((item, i) => (
        <li key={i}>
          <div className="currency">{item.currency}</div>
          <div className="value">{item.value}</div>
        </li>
      ))}
    </ul>
  );
};

export default CurrencyExchange;
