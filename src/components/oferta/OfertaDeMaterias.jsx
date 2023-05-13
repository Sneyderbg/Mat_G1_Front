import React, { useState } from "react";
import { GroupsPopup } from "components/oferta/GroupsPopup";
import { CoursesTable } from "components/oferta/CoursesTable";
import { GeneralInfo } from "components/oferta/GeneralInfo";
import { STATUS } from "utils/CommonRequests";

/**
 * Página principal de la oferta de materias.
 *
 * @param {*} props = {userInfo}
 * @returns Render de la página.
 */
export function OfertaDeMaterias({ userInfo }) {
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
          />
        )}
        <h2>Oferta de materias</h2>
        <p>
          Aquí encontrarás las materias que puedes matricular en este periodo
          académico, además del día, hora y tanda en la cual debes matricularte
          a través del Portal Web Universitario, identificándote con usuario y
          contraseña.
        </p>
        {userInfo.status === STATUS.OK ? (
          <GeneralInfo userInfo={userInfo} showTanda={showTanda} />
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
          fnOnBtnClick={() => {
            setShowGroupsPopup(true);
          }}
          fnSetCourseId={setCourseId}
        />
        <div className="sub-title--left">
          <label>No tiene materias electivas en su oferta </label>
        </div>
        <div className="default-box lower-rounded btn-box">
          <button type="button">Imprimir</button>
          <button type="button">Elegir otro programa</button>
          <div />
        </div>
      </div>
    </div>
  );
}
