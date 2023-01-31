import React, { FC } from "react";
import AddIncome from "../../components/addIncome/AddIncome";
import List from "../../components/list/List";
import "./Home.scss";
import { listType } from "../../store/interfaces";

const Home: FC = () => {
  return (
    <div className="container home">
      <AddIncome />
      <List type={listType.income} />
    </div>
  );
};

export default Home;
