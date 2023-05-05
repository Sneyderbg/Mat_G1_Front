import { useState} from "react";

import { GroupsPopup } from "./GroupsPopup";
import { CoursesTable } from "./CoursesTable";
import { GeneralInfo } from "./GeneralInfo";

/**
 * Página principal de la oferta de materias.
 *
 * @param {*} props Object{}
 * @returns Render de la página.
 */
export function OfertaDeMaterias(props) {
  const showTanda = true;
  const [showGroupsPopup, setShowGroupsPopup] = useState(false);
  const [courseId, setCourseId] = useState(0);

  return (
    <div className="default-div">
      <GroupsPopup
        showYourself={showGroupsPopup}
        courseId={courseId}
        setTrigger={setShowGroupsPopup}
      ></GroupsPopup>
      <div className="body">
        <h2>Oferta de materias</h2>
        <p>
          Aquí encontrarás las materias que puedes matricular en este periodo académico, además del
          día, hora y tanda en la cual debes matricularte a través del Portal Web Universitario,
          identificándote con usuario y contraseña.
        </p>
        {props.userInfo.status === "ok" ? (
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
          showGroupsPopup={() => {
            setShowGroupsPopup(true);
          }}
          setCourseId={setCourseId}
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
