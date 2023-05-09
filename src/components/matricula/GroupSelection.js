import { useState } from "react";
import { STATUS } from "../../utils/CommonRequests";

/**
 *
 * @param {*} props = {courseInfo, fnOnCancel, fnOnSubmit(courseId, groupInfo), btnText?[], closing}
 */
export function GroupSelection(props) {
  const [groupSelectedIdx, setGroupSelectedIdx] = useState(0);

  return (
    <div className={`popup__background${props.closing ? " popup__background--disappearing" : ""}`}>
      <div className="popup">
        <div className="popup__title">Selecciona el grupo de esta materia</div>
        <div className="popup__text">
          {props.courseInfo.groups.status === STATUS.OK ? (
            "[" +
            props.courseInfo.groups.list[0].materiaId +
            "] " +
            props.courseInfo.groups.list[0].nombre
          ) : props.courseInfo.groups.status === STATUS.PENDING ? (
            "Cargando información..."
          ) : (
            <h3>{props.courseInfo.groups.customMessage}</h3>
          )}
        </div>
        {props.courseInfo.groups.status === STATUS.OK && (
          <select
            className="groups-select"
            onChange={(e) => {
              setGroupSelectedIdx(e.target.value);
            }}
            defaultValue="Ninguno"
          >
            <option value="Ninguno">---</option>
            {props.courseInfo.groups.list.map((group, i) => {
              return (
                <option key={i} value={i}>
                  {`[${group.numeroGrupo}] - ${group.aula} - ${group.horario}`}
                </option>
              );
            })}
          </select>
        )}
        <div className="btn-box">
          <button onClick={() => props.fnOnCancel()}>
            {props.btnText ? props.btnText[0] || "Cancelar" : "Cancelar"}
          </button>
          <button
            onClick={() => {
              const groupsList = props.courseInfo.groups.list;
              var groupInfo = undefined;

              if (groupSelectedIdx === 0) {
                groupInfo = null;
              } else {
                if (groupSelectedIdx) {
                  groupInfo = groupsList[groupSelectedIdx];
                }
              }
              props.fnOnSubmit(props.courseInfo, groupInfo);
            }}
          >
            {props.btnText ? props.btnText[1] || "Aceptar" : "Aceptar"}
          </button>
        </div>
      </div>
    </div>
  );
}
