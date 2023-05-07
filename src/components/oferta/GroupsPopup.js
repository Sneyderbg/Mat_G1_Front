import { useState, useEffect } from "react";

import { getGroupsByCourseId } from "../../utils/CommonRequests";
import { Popup } from "../common/Popup";
import { Table } from "../common/Table";

/**
 * Componente que muestra la información de los grupos de un curso.
 *
 * @param {*} props Propiedades = {courseId, visible, fnClose}
 * @returns Render del componente.
 */
export function GroupsPopup(props) {
  const [visible, setVisible] = useState(false);
  const [groups, setGroups] = useState({ status: undefined, list: [] });

  // actualiza la lista de grupos si el id del curso cambia
  useEffect(() => {
    setGroups({ status: "pending", list: [] });
    if (props.courseId !== 0) {
      getGroupsByCourseId(props.courseId).then((data) => setGroups(data));
    }
  }, [props.courseId]);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  return (
    <Popup visible={visible} fnBtnAction={props.fnClose}>
      <div className="popup__title">Grupos y horarios disponibles para esta materia</div>
      <div className="popup__text">
        {groups.status === "ok" ? (
          "[" + groups.list[0].materiaId + "] " + groups.list[0].nombre
        ) : groups.status === "pending" ? (
          "Cargando información..."
        ) : (
          <h3>{groups.customMessage}</h3>
        )}
      </div>
      {groups.status === "ok" ? (
        <Table
          className="secondary-table"
          head={["Grupo", "Cupos", "Aula", "Horario"]}
          body={groups.list.map((group, i) => {
            return [
              `${group.grupoId}-${group.numeroGrupo}`,
              -1, //FIXME: no quotas in response
              group.aula,
              formatHorario(group.horario),
            ];
          })}
        ></Table>
      ) : (
        "(^-^)"
      )}
      {/* <GroupsTable groupsList={groups.status === "ok" ? groups.list : []}></GroupsTable> */}
    </Popup>
  );
}

//TODO: implement
function formatHorario(horario) {
  return horario;
}
