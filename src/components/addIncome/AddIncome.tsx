import React, { ChangeEvent, FormEvent, useState } from "react";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import NumberInput from "../numberInput/NumberInput";
import "./AddIncome.scss";
import { IIncome, buttonStyle } from "../../store/interfaces";
import { useDispatch } from "react-redux";
import { addIncome } from "../../store/store";

type handleChangeEvent =
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>;

const options = ["freelance", "job", "gift"];

const currencyValues = ["rub", "usd"];

const AddIncome = () => {
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState<string>("rub");
  const [type, setType] = useState<string>("freelance");
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<number>(0);

  const refresh = () => {
    setType("freelance");
    setDescription("");
    setCurrency("rub");
    setValue(0);
  };

  const handleChangeInput = (e: handleChangeEvent) =>
    setDescription(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addIncome({
        // type: "add",
        // payload: { type, description, value, currency },
        type, description, value, currency
      })
    );
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
            changeCurrentOption={(index) => setType(options[index])}
          />

          <Dropdown
            currentOption={currency}
            options={currencyValues}
            changeCurrentOption={(index) => setCurrency(currencyValues[index])}
          />

          <NumberInput
            max={100000000}
            value={value}
            changeCurrentValue={(newValue) => setValue(newValue)}
          />

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
