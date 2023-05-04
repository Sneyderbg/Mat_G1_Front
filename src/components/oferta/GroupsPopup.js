import { useState, useEffect } from "react";

import { GroupsTable } from "./GroupsTable";
import { getCourseGroups } from "../../utils/CommonRequests";

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
    setGroups({ status: "pending" });
    getCourseGroups(props.courseId).then((data) => setGroups(data));
  }, [props.courseId]);

  return props.showYourself ? (
    <div className="groups-popup__background">
      <div className="groups-popup">
        <div className="groups-popup__title">Grupos y horarios disponibles para esta materia</div>
        <div className="groups-popup__text">
          {groups.status === "ok" ? (
            "[" + groups.list[0].IdCurso + "] " + groups.list[0].Nombre
          ) : groups.status === "pending" ? (
            "Cargando información..."
          ) : (
            <h3>{groups.customMessage}</h3>
          )}
        </div>
        <GroupsTable groupsList={groups.status === "ok" ? groups.list : []}></GroupsTable>
        <button onClick={() => props.setTrigger(false)}>Regresar</button>
      </div>
    </div>
  ) : (
    ""
  );
}
