import Calendar from "../../components/calendar/Calendar";
import ChangeDate from "../../components/changeDate/ChangeDate";
import MarkBetween from "../../components/markBetween/MarkBetween";

const Settings = () => {
  return (
    <div className="settings">
      <ChangeDate />
      <Calendar />
      <MarkBetween />
    </div>
  );
};

export default Settings;
