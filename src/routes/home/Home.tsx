import React, { FC } from "react";
import List from "../../components/list/List";
import "./Home.scss";
import { statType, buttonStyle } from "../../store/interfaces";
import DateInput from "../../components/dateInput/DateInput";
import AddStat from "../../components/addStat/AddStat";
import Button from "../../components/button/Button";

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
        <div className="home-btns">
          <Button
            type="button"
            style={buttonStyle.standart}
            content="Add expense"
            handleClick={() => setTypeOfStat(statType.expense)}
          />
          <Button
            type="button"
            style={buttonStyle.standart}
            content="Add income"
            handleClick={() => setTypeOfStat(statType.income)}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
