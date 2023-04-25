import { useState, useEffect } from "react";
import { GroupsTable } from "./GroupsTable";
import "./GroupsPopup.css";

export function GroupsPopup(props) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setGroups([]);
    getCourseData(props.courseId, props.endpoint)
      .then((data) => {
        if (data != undefined) {
          setGroups(data);
        } else {
          return Promise.reject(data);
        }
      })
      .catch((err) => {
        console.error(err);
        setGroups({ error: "Error al cargar la información" });
      });
  }, [props.courseId]);

  return (
    <div className="popup-background">
      <div id="popup" className="popup">
        <div id="txtpopuptitle" className="txtpopuptitle">
          Grupos y horarios disponibles para esta materia
        </div>
        <div id="txtcourse" className="txtcourse">
          {groups.hasOwnProperty("error")
            ? groups.error
            : groups.length > 0
            ? "[" + groups[0].IdCurso + "] " + groups[0].Nombre
            : "Cargando información..."}
        </div>
        <GroupsTable
          className="groupsTable"
          groupsList={groups != undefined && !groups.hasOwnProperty("error") ? groups : []}
        ></GroupsTable>
        <div id="btnback" className="btnback">
          <button
            id="btnClosePopup"
            className="btnClosePopup"
            onClick={() => props.setTrigger(false)}
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
}

async function getCourseData(courseId, endpoint) {
  const sample_data = await fetch(endpoint + courseId, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject();
      }
    })
    .catch((res) => console.log(res));

  return sample_data;
}
