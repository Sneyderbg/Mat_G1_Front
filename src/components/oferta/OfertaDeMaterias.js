import { useState } from "react";

import { GroupsPopup } from "./GroupsPopup";
import { CoursesTable } from "./CoursesTable";
import { GeneralInfo } from "./GeneralInfo";
import { STATUS } from "../../utils/CommonRequests";

/**
 * Página principal de la oferta de materias.
 *
 * @param {*} props = {userInfo}
 * @returns Render de la página.
 */
export function OfertaDeMaterias(props) {
  const showTanda = true;
  const [showGroupsPopup, setShowGroupsPopup] = useState(false);
  const [groupsPopupClosing, setGroupsPopupClosing] = useState(false);
  const [courseId, setCourseId] = useState(0);

  return (
    <div className="default-div">
      <div className="body">
        {showGroupsPopup && (
          <GroupsPopup
            closing={groupsPopupClosing}
            courseId={courseId}
            fnClose={() => {
              setGroupsPopupClosing(true);
              setTimeout(() => {
                setShowGroupsPopup(false);
                setGroupsPopupClosing(false);
              }, 300);
            }}
          ></GroupsPopup>
        )}
        <h2>Oferta de materias</h2>
        <p>
          Aquí encontrarás las materias que puedes matricular en este periodo académico, además del
          día, hora y tanda en la cual debes matricularte a través del Portal Web Universitario,
          identificándote con usuario y contraseña.
        </p>
        {props.userInfo.status === STATUS.OK ? (
          <GeneralInfo userInfo={props.userInfo} showTanda={showTanda}></GeneralInfo>
        ) : (
          <div className="error-box">
            <h2>{props.userInfo.customMessage}</h2>
          </div>
        )}
        <div className="sub-title--left">
          <label>Materias obligatorias </label>
        </div>
        <CoursesTable
          userInfo={props.userInfo}
          fnOnBtnClick={() => {
            setShowGroupsPopup(true);
          }}
          fnSetCourseId={setCourseId}
        ></CoursesTable>
        <div className="sub-title--left">
          <label>No tiene materias electivas en su oferta </label>
        </div>
        <div className="default-box lower-rounded btn-box">
          <button>Imprimir</button>
          <button>Elegir otro programa</button>
          <div></div>
        </div>
      </div>
    </div>
  );
}
