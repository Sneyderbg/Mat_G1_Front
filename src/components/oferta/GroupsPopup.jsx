import React, { useState, useEffect } from "react";
import { STATUS, getGroupsByCourseId } from "utils/CommonRequests";
import { Popup } from "components/common/Popup";
import { Table } from "components/common/Table";
import { formatHorario } from "utils/Helpers";

/**
 * Componente que muestra la información de los grupos de un curso.
 *
 * @param {*} props Propiedades = {courseId, fnClose, closing}
 * @returns Render del componente.
 */
export function GroupsPopup({ courseId, closing, fnClose }) {
  const [groups, setGroups] = useState({ status: STATUS.PENDING, list: [] });

  // actualiza la lista de grupos si el id del curso cambia
  useEffect(() => {
    setGroups({ status: STATUS.PENDING, list: [] });
    if (courseId !== 0) {
      getGroupsByCourseId(courseId).then((data) => setGroups(data));
    }
  }, [courseId]);

  return (
    <Popup closing={closing} fnBtnAction={fnClose}>
      <div className="popup__title">
        Grupos y horarios disponibles para esta materia
      </div>
      <div className="popup__text">
        {groups.status === STATUS.OK ? (
          `[${groups.list[0].materiaId}] ${groups.list[0].nombre}`
        ) : (
          <h3>
            {groups.status !== STATUS.PENDING
              ? groups.customMessage
              : "Cargando información..."}
          </h3>
        )}
      </div>
      {groups.status === STATUS.OK ? (
        <Table
          className="secondary-table"
          head={["Grupo", "Cupos", "Aula", "Horario"]}
          body={groups.list.map((group) => [
            `${group.grupoId}-${group.numeroGrupo}`,
            20, // FIXME: no quotas in response
            group.aula,
            formatHorario(group.horario),
          ])}
        />
      ) : (
        ""
      )}
    </Popup>
  );
}
