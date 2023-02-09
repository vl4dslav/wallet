import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTypeTitles, statType } from "../../store/interfaces";
import CheckBoxList from "../checkBoxList/CheckBoxList";
import { addTypeAction, statInfo } from "../../store/interfaces";
import { addTypes, changeActive } from "../../store/settingsSlice";
import { RootState } from "../../store/store";

const AddTypes = () => {
  const dispatch = useDispatch();
  const [titleOfList, setTitleOfList] = useState<string>(AddTypeTitles.income);
  const expenseTypes = useSelector(
    (state: RootState) => state.settings.typesOfStat.expense
  );
  const incomeTypes = useSelector(
    (state: RootState) => state.settings.typesOfStat.income
  );
  const type =
    titleOfList.split(" ")[0] === "Expense"
      ? statType.expense
      : statType.income;

  const create = ({ title, color, active }: statInfo) => {
    const payload: addTypeAction = {
      statInfo: { title, color, active },
      type,
    };
    dispatch(addTypes(payload));
  };

  return (
    <div className="addTypes">
      <CheckBoxList
        changeActive={(index: number) =>
          dispatch(changeActive({ index, type }))
        }
        title={titleOfList}
        changeTitle={() =>
          setTitleOfList((prev) =>
            prev === AddTypeTitles.income
              ? AddTypeTitles.expense
              : AddTypeTitles.income
          )
        }
        create={create}
        getList={() =>
          titleOfList === AddTypeTitles.income ? incomeTypes : expenseTypes
        }
      />
    </div>
  );
};

export default AddTypes;
