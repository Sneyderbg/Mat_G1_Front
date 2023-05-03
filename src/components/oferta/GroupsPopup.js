import { useState, useEffect } from "react";
import axios from "axios";

import { GroupsTable } from "./GroupsTable";
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
    setGroups([]);
    getCourseGroups(props.courseId, props.endpoint)
      .then((data) => setGroups(data))
      .catch((err) => console.error(err));
  }, [props.courseId, props.endpoint]);

  return props.showYourself ? (
    <div className="groups-popup__background">
      <div className="groups-popup">
        <div className="groups-popup__title">
          Grupos y horarios disponibles para esta materia
        </div>
        <div className="groups-popup__text">
          {groups.code === "ERR_BAD_REQUEST"
            ? groups.customMessage
            : groups.length > 0
            ? "[" + groups[0].IdCurso + "] " + groups[0].Nombre
            : "Cargando información..."}
        </div>
        <GroupsTable
          groupsList={groups.code !== "ERR_BAD_REQUEST" ? groups : []}
        ></GroupsTable>
        <button
          onClick={() => props.setTrigger(false)}
        >
          Regresar
        </button>
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
  let sample_data = await axios
    .get(endpoint, {
      params: {
        IdCurso: courseId,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      const error = { ...err, customMessage: "Error al cargar la información de los grupos." };
      console.error(error.customMessage, err);
      return error;
    });

  return sample_data;
}
