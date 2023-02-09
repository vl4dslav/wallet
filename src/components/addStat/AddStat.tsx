import React, { ChangeEvent, FormEvent, useState } from "react";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import NumberInput from "../numberInput/NumberInput";
import "./AddStat.scss";
import { buttonStyle, IAddStat, statType } from "../../store/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { addStat } from "../../store/statsSlice";
import { RootState } from "../../store/store";

// const options = ["freelance", "job", "gift"]; ////ooooooppppppptionssssss

const currencyValues = ["rub", "usd"];

const AddStat: React.FC<IAddStat> = ({ Addtype, changeAddType }) => {
  const dispatch = useDispatch();
  const typeOfStat = useSelector((state: RootState) => state.stats.typeOfStat);
  const options = useSelector((state: RootState) => {
    switch (typeOfStat) {
      case statType.income:
        return state.settings.typesOfStat.income.filter((item) => item.active);
      // .map((item) => item.title);
      case statType.expense:
        return state.settings.typesOfStat.expense.filter((item) => item.active);
      // .map((item) => item.title);
      default:
        return [];
    }
  });

  const [currency, setCurrency] = useState<string>("rub");
  const [type, setType] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<number>(0);

  const refresh = () => {
    setType(0);
    setDescription("");
    setCurrency("rub");
    setValue(0);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeOfStat !== null)
      dispatch(
        addStat({
          type: options[type],
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
            width=""
            height=""
            currentOption={options[type].title}
            options={options.map((option) => option.title)}
            changeCurrentOption={(index) => setType(index)}
          />

          <Dropdown
            width=""
            height=""
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
