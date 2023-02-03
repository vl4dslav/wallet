import React, { ChangeEvent, FormEvent, useState } from "react";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import NumberInput from "../numberInput/NumberInput";
import "./AddStat.scss";
import { buttonStyle, IAddStat } from "../../store/interfaces";
import { useDispatch } from "react-redux";
import { addStat } from "../../store/statsSlice";

const options = ["freelance", "job", "gift"];

const currencyValues = ["rub", "usd"];

const AddStat: React.FC<IAddStat> = ({ Addtype, changeAddType }) => {
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

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addStat({
        type,
        description,
        value,
        currency,
        typeOfStat: Addtype,
      })
    );
    refresh();
  };

  return (
    <section className="add-stat">
      <h2 onClick={changeAddType}>{`Add new ${Addtype}`}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
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
            content={`add ${Addtype}`}
          />
        </div>
      </form>
    </section>
  );
};

export default AddStat;
