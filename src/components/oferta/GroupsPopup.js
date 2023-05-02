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
  const [groups, setGroups] = useState({});

  // actualiza la lista de grupos si el id del curso cambia
  useEffect(() => {
    setGroups({ list: [] });
    getCourseGroups(props.courseId, props.endpoint)
      .then((data) => setGroups(data))
      .catch((err) => console.error(err));
  }, [props.courseId, props.endpoint]);

  return props.showYourself ? (
    <div className="popup-background">
      <div id="popup" className="popup">
        <div id="txtpopuptitle" className="txtpopuptitle">
          Grupos y horarios disponibles para esta materia
        </div>
        <div id="txtcourse" className="txtcourse">
          {groups.hasOwnProperty("error")
            ? groups.error.reason
            : groups.list.length > 0
            ? "[" + groups.list[0].IdCurso + "] " + groups.list[0].Nombre
            : "Cargando información..."}
        </div>
        <GroupsTable
          className="groupsTable"
          groupsList={
            groups.hasOwnProperty("list") && !groups.hasOwnProperty("error") ? groups.list : []
          }
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
  ) : (
    ""
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
  let sample_data = await fetch(endpoint + courseId)
    .then((response) => response.json())
    .catch((err) => {
      const error = { reason: "Error al cargar la información de los grupos.", cause: err };
      console.error(error.reason, error.cause);
      return { error };
    });

  if (Array.isArray(sample_data)) {
    sample_data = { list: sample_data };
  }
  return sample_data;
}
