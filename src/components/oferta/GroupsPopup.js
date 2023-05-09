import { useState, useEffect } from "react";

import { STATUS, getGroupsByCourseId } from "../../utils/CommonRequests";
import { Popup } from "../common/Popup";
import { Table } from "../common/Table";

/**
 * Componente que muestra la información de los grupos de un curso.
 *
 * @param {*} props Propiedades = {courseId, fnClose, closing}
 * @returns Render del componente.
 */
export function GroupsPopup(props) {
  const [groups, setGroups] = useState({ status: STATUS.PENDING, list: [] });

  // actualiza la lista de grupos si el id del curso cambia
  useEffect(() => {
    setGroups({ status: STATUS.PENDING, list: [] });
    if (props.courseId !== 0) {
      getGroupsByCourseId(props.courseId).then((data) => setGroups(data));
    }
  }, [props.courseId]);

  return (
    <Popup closing={props.closing} fnBtnAction={props.fnClose}>
      <div className="popup__title">Grupos y horarios disponibles para esta materia</div>
      <div className="popup__text">
        {groups.status === STATUS.OK ? (
          "[" + groups.list[0].materiaId + "] " + groups.list[0].nombre
        ) : groups.status === STATUS.PENDING ? (
          "Cargando información..."
        ) : (
          <h3>{groups.customMessage}</h3>
        )}
      </div>
      {groups.status === STATUS.OK ? (
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
      {/* <GroupsTable groupsList={groups.status === STATUS.OK ? groups.list : []}></GroupsTable> */}
    </Popup>
  );
}

//TODO: implement
function formatHorario(horario) {
  return horario;
}
