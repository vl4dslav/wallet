import React, { FC } from "react";
import AddIncome from "../../components/addIncome/AddIncome";
import List from "../../components/list/List";
import "./Home.scss";
import { listType } from "../../store/interfaces";
import DateInput from "../../components/dateInput/DateInput";

const Home: FC = () => {
  return (
    <div className="container home">
      <DateInput />
      <AddIncome />
      <List type={listType.income} />
    </div>
  );
};

export default Home;
