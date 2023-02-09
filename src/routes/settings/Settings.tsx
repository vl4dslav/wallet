import AddTypes from "../../components/addTypes/AddTypes";
import Calendar from "../../components/calendar/Calendar";
import ChangeDate from "../../components/changeDate/ChangeDate";
import MarkBetween from "../../components/markBetween/MarkBetween";
import "./Settings.scss";

const Settings = () => {
  return (
    <div className="settings container">
      <div className="settings-calendar">
        <ChangeDate />
        <Calendar />
        <MarkBetween />
      </div>
      <div className="settings-add-types">
        <AddTypes />
      </div>
    </div>
  );
};

export default Settings;
