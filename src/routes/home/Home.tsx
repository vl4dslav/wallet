import React, { FC } from "react";
import AddIncome from "../../components/addIncome/AddIncome";
import "./Home.scss";

const Home: FC = () => {
  return (
    <div className="container home">
      <AddIncome />
    </div>
  );
};

export default Home;
