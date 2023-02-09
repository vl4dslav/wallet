import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IExpense,
  IIncome,
  IListProps,
  statType,
} from "../../store/interfaces";
import { deleteExpense, deleteIncome } from "../../store/statsSlice";
import { RootState } from "../../store/store";
import Button from "../button/Button";
import { buttonStyle } from "../../store/interfaces";
import "./List.scss";

const List: React.FC<IListProps> = ({ type }) => {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => {
    const curr = state.stats.currentStats;
    return type === statType.income ? curr.income : curr.expense;
  });

  const [visibility, setVisibility] = useState<boolean[]>([]);

  const changeVisibility = (index: number) =>
    setVisibility((prev) =>
      prev.map((item, i) => (index === i ? !item : item))
    );

  return (
    <ul className={`list-${type}`}>
      {list.map((statItem: IExpense | IIncome, index: number) => {
        if (visibility.length <= index)
          setVisibility((prev) => prev.concat([false]));
        return (
          <li key={index}>
            <div className="type-value" onClick={() => changeVisibility(index)}>
              <div className="type">{statItem.type.title}</div>
              <div className="value">{`${statItem.value} ${statItem.currency}`}</div>
              <Button
                content="delete"
                style={buttonStyle.reverse}
                type="button"
                handleClick={() =>
                  type === statType.income
                    ? dispatch(deleteIncome(index))
                    : dispatch(deleteExpense(index))
                }
              />
            </div>
            {visibility[index] ? (
              <p className="description">{statItem.description}</p>
            ) : (
              <></>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
