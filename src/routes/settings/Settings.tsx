import Calendar from "../../components/calendar/Calendar";
import ChangeDate from "../../components/changeDate/ChangeDate";

const Settings = () => {
  return (
    <div className="settings">
      <ChangeDate />
      <Calendar />
    </div>
  );
};

export default Settings;
