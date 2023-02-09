import { FC } from "react";
import List from "../../components/list/List";
import "./Home.scss";
import { statType, buttonStyle } from "../../store/interfaces";
import DateInput from "../../components/dateInput/DateInput";
import AddStat from "../../components/addStat/AddStat";
import Button from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setTypeOfStat } from "../../store/statsSlice";

const Home: FC = () => {
  const dispatch = useDispatch();
  const typeOfStat = useSelector((state: RootState) => state.stats.typeOfStat);
  const changeTypeOfStat = (newStat: statType | null) => {
    switch (newStat) {
      case null:
        dispatch(
          setTypeOfStat(
            typeOfStat === statType.income ? statType.expense : statType.income
          )
        );
        break;
      default:
        dispatch(setTypeOfStat(newStat));
    }
  };

  return (
    <div className="container home">
      <div className="home-date">
        <DateInput />
      </div>
      {typeOfStat !== null ? (
        <div className={`home-main ${typeOfStat} `}>
          <AddStat
            Addtype={typeOfStat}
            changeAddType={() => changeTypeOfStat(null)}
          />
          <List type={typeOfStat} />
        </div>
      ) : (
        <div className="home-btns">
          <Button
            type="button"
            style={buttonStyle.standart}
            content="Add expense"
            handleClick={() => changeTypeOfStat(statType.expense)}
          />
          <Button
            type="button"
            style={buttonStyle.standart}
            content="Add income"
            handleClick={() => changeTypeOfStat(statType.income)}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
