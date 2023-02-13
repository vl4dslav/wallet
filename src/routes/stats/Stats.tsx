import { useState } from "react";
import { useQuery } from "react-query";
import CurrencyExchange from "../../components/currencyExchange/CurrencyExchange";
import PieChart from "../../components/pieChart/PieChart";
import StatsList from "../../components/statsList/StatsList";
import { ICurrencyExchange, statType } from "../../store/interfaces";
import "./Stats.scss";

// const list = [{ currency: "usd", value: 74 }];

const Stats = () => {
  const [type, setType] = useState<statType>(statType.income);
  const lisT = useQuery("currency", getData);

  async function getData() {
    const response = await fetch("/.netlify/functions/currency").then((res) =>
      res.json()
    );
    const data: ICurrencyExchange[] = response.map(
      (resp: {
        base_currency_code: string;
        rates: { RUB: { rate: number } };
      }) => {
        return {
          currency: resp.base_currency_code,
          value: Math.round(resp.rates.RUB.rate * 100) / 100,
        };
      }
    );
    return data;
  }

  if (lisT.status === "loading")
    return <div className="stats-loading">Loading ...</div>;
  if (lisT.status === "error") return <div className="stats-error">Error</div>;

  return (
    <div className="stats">
      <button
        onClick={() =>
          setType((prev) =>
            prev === statType.income ? statType.expense : statType.income
          )
        }
      >
        {type}
      </button>
      <div className="stats-content container">
        <PieChart type={type} width={500} currencyList={lisT.data || []} />
        <StatsList type={type} currencyList={lisT.data || []} />
        <CurrencyExchange list={lisT.data || []} />
      </div>
    </div>
  );
};

export default Stats;
