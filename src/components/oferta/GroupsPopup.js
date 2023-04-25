import { useState, useEffect } from "react";
import { GroupsTable } from "./GroupsTable";
import "./GroupsPopup.css";

/**
 * Componente que muestra la información de los grupos de un curso.
 * 
 * @param {*} props Propiedades = {courseId, endpoint, setTrigger}
 * @returns Render del componente.
 */
export function GroupsPopup(props) {
  const [groups, setGroups] = useState([]);

  // actualiza la lista de grupos si el id del curso cambia
  useEffect(() => {
    setGroups([]);
    getCourseGroups(props.courseId, props.endpoint)
      .then((data) => {
        if (data !== undefined) {
          setGroups(data);
        } else {
          return Promise.reject(data);
        }
      })
      .catch((err) => {
        console.error(err);
        setGroups({ error: "Error al cargar la información" });
      });
  }, [props.courseId, props.endpoint]);

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
          groupsList={groups !== undefined && !groups.hasOwnProperty("error") ? groups : []}
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

/**
 * Consulta la lista de grupos de un curso.
 * 
 * @param {*} courseId Id del curso a consultar.
 * @param {*} endpoint Endpoint para hacer la consulta.
 * @returns Promise con lista de la información de los grupos.
 */
async function getCourseGroups(courseId, endpoint) {
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
