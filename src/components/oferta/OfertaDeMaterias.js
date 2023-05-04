import { useState, useEffect } from "react";

import { GroupsPopup } from "./GroupsPopup";
import { CoursesTable } from "./CoursesTable";
import { GeneralInfo } from "./GeneralInfo";

import { getUserInfo } from "../../utils/CommonRequests";

/**
 * Página principal de la oferta de materias.
 *
 * @param {*} props Object{}
 * @returns Render de la página.
 */
export function OfertaDeMaterias(props) {
  const showTanda = true;
  const [showGroupsPopup, setShowGroupsPopup] = useState(false);
  const [courseId, setCourseId] = useState(10002);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo(props.userId).then((res) => setUserInfo(res));
  }, [props.userId]);

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
        {userInfo.status === "ok" ? (
          <GeneralInfo userInfo={userInfo} showTanda={showTanda}></GeneralInfo>
        ) : (
          <div className="error-box">
            <h2>{userInfo.customMessage}</h2>
          </div>
        )}
        <div className="sub-title--left">
          <label>Materias obligatorias </label>
        </div>
        <CoursesTable
          userInfo={userInfo}
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
