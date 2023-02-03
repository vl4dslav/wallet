import React, { FC } from "react";
import List from "../../components/list/List";
import "./Home.scss";
import { statType } from "../../store/interfaces";
import DateInput from "../../components/dateInput/DateInput";
import AddStat from "../../components/addStat/AddStat";

const Home: FC = () => {
  const [typeOfStat, setTypeOfStat] = React.useState<statType | null>(null);
  return (
    <div className="container home">
      <div className="home-date">
        <DateInput />
      </div>
      {typeOfStat !== null ? (
        <div className={`home-main ${typeOfStat} `}>
          <AddStat
            Addtype={typeOfStat}
            changeAddType={() =>
              setTypeOfStat((prev) =>
                prev === statType.income ? statType.expense : statType.income
              )
            }
          />
          <List type={typeOfStat} />
        </div>
      ) : (
        <div className="home-btns"></div>
      )}
    </div>
  );
};

export default Home;
