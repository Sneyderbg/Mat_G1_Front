import React, { useState } from "react";
import { STATUS } from "utils/CommonRequests";
import { formatHorario } from "utils/Helpers";

/**
 *
 * @param {*} props = {courseInfo, fnOnCancel, fnOnSubmit(courseId, groupInfo), btnText?[], closing}
 */
export function GroupSelection({
  closing,
  courseInfo,
  fnOnSubmit,
  fnOnCancel,
  btnText,
}) {
  const [groupSelectedIdx, setGroupSelectedIdx] = useState(0);

  return (
    <div
      className={`popup__background${
        closing ? " popup__background--disappearing" : ""
      }`}
    >
      <div className="popup">
        <div className="popup__title">Selecciona el grupo de esta materia</div>
        <div className="popup__text">
          {courseInfo.groups.status === STATUS.OK
            ? `[${courseInfo.groups.list[0].materiaId}] ${courseInfo.groups.list[0].nombre}`
            : ""}
          {courseInfo.groups.status === STATUS.PENDING ? (
            "Cargando información..."
          ) : (
            <h3>{courseInfo.groups.customMessage}</h3>
          )}
        </div>
        {courseInfo.groups.status === STATUS.OK && (
          <select
            className="groups-select"
            onChange={(e) => {
              setGroupSelectedIdx(e.target.value);
            }}
            defaultValue="Ninguno"
          >
            <option value="Ninguno">---</option>
            {courseInfo.groups.list.map((group, i) => (
              <option key={group.id} value={i}>
                {`[${group.numeroGrupo}] - ${group.aula} - ${formatHorario(
                  group.horario
                )}`}
              </option>
            ))}
          </select>
        )}
        <div className="btn-box">
          <button type="button" onClick={() => fnOnCancel()}>
            {btnText ? btnText[0] || "Cancelar" : "Cancelar"}
          </button>
          <button
            type="button"
            onClick={() => {
              const groupsList = courseInfo.groups.list;
              let groupInfo;

              if (groupSelectedIdx === 0) {
                groupInfo = null;
              } else if (groupSelectedIdx) {
                groupInfo = groupsList[groupSelectedIdx];
              }
              fnOnSubmit(courseInfo, groupInfo);
            }}
          >
            {btnText ? btnText[1] || "Aceptar" : "Aceptar"}
          </button>
        </div>
      </div>
    </div>
  );
}
