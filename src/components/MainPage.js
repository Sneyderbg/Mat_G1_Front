import { useState, useEffect } from "react";
import "./MainPage.css";
import { GroupsPopup } from "./GroupsPopup";

const apiUrl = "http://localhost:4000/courses";

export function MainPage(props) {
  const [showGroupsPopup, setShowGroupsPopup] = useState(false);
  const [courseData, setCourseData] = useState({});
  const [courseId, setCourseId] = useState(2500);

  useEffect(() => {
    setCourseData({});
    getCourseData(courseId)
      .then((data) => setCourseData(data))
      .catch((err) => {
        console.log(err);
        setCourseData({error: "Error al cargar la información"});
      });
  }, [courseId]);

  return (
    <div>
      <select
        className="courseId"
        onChange={(e) => {
          setCourseId(e.target.value);
        }}
      >
        <option value={2500}>[2500] Lógica III</option>
        <option value={2501}>[2501] Análisis 1</option>
        <option value={2502}>[2502] Análisis 2</option>
        <option value={2503}>[2503] Bases de datos</option>
      </select>
      <button className="testButton" onClick={() => setShowGroupsPopup(true)}>
        Horarios
      </button>
      <GroupsPopup
        trigger={showGroupsPopup}
        setTrigger={setShowGroupsPopup}
        data={courseData}
      ></GroupsPopup>
    </div>
  );
}

async function getCourseData(courseId) {
  const sample_data = await fetch(apiUrl + "/" + courseId, {
    method: "GET",
  }).then((response) => response.json());

  return sample_data;
}
