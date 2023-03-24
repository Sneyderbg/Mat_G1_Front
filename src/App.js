import "./App.css";
import { GroupsPopup } from "./components/GroupsPopup";
import { useState } from "react";

function App() {
  return (
    <div>
      <MainPage></MainPage>;
    </div>
  );
}

function MainPage(props) {
  const [showGroupsPopup, setShowGroupsPopup] = useState(false);
  return (
    <div>
      <button className="testButton" onClick={() => setShowGroupsPopup(true)}>
        Horarios
      </button>
      <GroupsPopup
        trigger={showGroupsPopup}
        setTrigger={setShowGroupsPopup}
        data={getCourseData(2501355)}
      ></GroupsPopup>
    </div>
  );
}

function getCourseData(courseId) {
  const test_data = {
    course: {
      id: 2501355,
      name: "Lógica III"
    },
    groupsList: [
      { id: 1, quotas: 10, room: "19-305", hours: "LM 8-10" },
      { id: 2, quotas: 20, room: "21-308", hours: "WV 16-18" },
      { id: 4, quotas: 14, room: "19-218", hours: "MJ 10-12" },
    ],
  };

  return test_data;
}

export default App;
