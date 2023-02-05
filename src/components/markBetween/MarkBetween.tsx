import React from "react";
import { useDispatch } from "react-redux";
import { buttonStyle } from "../../store/interfaces";
import { changePickedBetween } from "../../store/settingsSlice";
import Button from "../button/Button";
import "./MarkBetween.scss";

const MarkBetween = () => {
  const dispatch = useDispatch();
  return (
    <div className="markBetween">
      <Button
        type={"button"}
        style={buttonStyle.reverse}
        content="Mark Between"
        handleClick={() => dispatch(changePickedBetween(null))}
      />
    </div>
  );
};

export default MarkBetween;
