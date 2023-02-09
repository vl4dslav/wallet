import { useState } from "react";
import PieChart from "../../components/pieChart/PieChart";
import { statType } from "../../store/interfaces";
import "./Stats.scss";

const Stats = () => {
  const [type, setType] = useState<statType>(statType.income);
  return (
    <div>
      <PieChart type={type} width={500} />
    </div>
  );
};

export default Stats;
