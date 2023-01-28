import React, { ChangeEvent, FormEvent, useState } from "react";
import Button, { buttonStyle } from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import "./AddIncome.scss";

interface IIncome {
  description: string;
  type: string;
  value: number | null;
}

type handleChangeEvent =
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>;

const options = ["freelance", "job1"];

const AddIncome = () => {
  const [type, setType] = useState<string>("freelance");
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<number | null>(null);
  const [incomeList, setIncomeList] = useState<Array<IIncome>>([]);
  const refresh = () => {
    setType("");
    setDescription("");
    setValue(null);
  };
  const handleChangeInput = (e: handleChangeEvent) => {
    switch (e.target.name) {
      case "income-type":
        setType(e.target.value);
        break;
      case "income-number":
        setValue(+e.target.value);
        break;
      case "income-description":
        setDescription(e.target.value);
        break;
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newIncomeList = ([] as Array<IIncome>).concat(incomeList);
    newIncomeList.push({ type, description, value });
    setIncomeList(newIncomeList);
    refresh();
  };

  return (
    <section className="add-income">
      <h2>Add new income</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="income-description"
          cols={24}
          rows={8}
          onChange={handleChangeInput}
          maxLength={150}
          value={description}
        ></textarea>
        <div className="type-and-value">
          <Dropdown
            currentOption={type}
            options={options}
            changeCurrentOption={(index: number) => {
              setType(options[index]);
            }}
          />
          {/* <select name="income-type" value={type} onChange={handleChangeInput}>
            <option value="freelance">freelance</option>
            <option value="job1">job1</option>
          </select> */}
          <input
            type="number"
            name="income-number"
            onChange={handleChangeInput}
            value={value || ""}
            min={0}
          />
          {/* <button type="submit">add income</button> */}
          <Button
            type="submit"
            style={buttonStyle.standart}
            content={`add income`}
          />
        </div>
      </form>
    </section>
  );
};

export default AddIncome;
