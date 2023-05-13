import { STATUS } from "utils/CommonRequests";
import React from "react";

/**
 * Componente que describe la información general de la oferta de matriculas.
 *
 * @param {*} props Propiedades = {userInfo, showTanda}.
 * @returns Render del componente.
 */
export function GeneralInfo({ userInfo, showTanda }) {
  const date = new Date();
  const currentDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  const tandaDate = userInfo.hasOwnProperty("tanda")
    ? new Date(userInfo.tanda.horario)
    : null;

  return (
    <div className="default-box upper-rounded">
      <label>Fecha: </label>
      <label className="default-box__dato">{currentDate}</label>
      <br />
      <label>Nombre: </label>
      <label className="default-box__dato">
        {userInfo.hasOwnProperty("nombres")
          ? `${userInfo.nombres} ${userInfo.apellidos}`
          : "----"}
      </label>
      <br />
      <label>Programa: </label>
      <label className="default-box__dato">
        {userInfo.hasOwnProperty("programa")
          ? userInfo.programa.nombre
          : "----"}
      </label>
      <br />
      <label>Semestre: </label>
      <label className="default-box__dato">
        {userInfo.hasOwnProperty("nroSemestre") ? userInfo.nroSemestre : "----"}
      </label>
      {userInfo.status !== STATUS.OK ? (
        <div className="flex-box error-box">
          <h3>{userInfo.customMessage}</h3>
        </div>
      ) : (
        showTanda && (
          <div className="tanda-matricula">
            <label id="lbl-matricula">Matrícula </label>
            <div className="tanda-params">
              <label>Tanda: </label>
              <label className="tanda__dato important-label">
                {userInfo.tanda.hasOwnProperty("numero")
                  ? userInfo.tanda.numero
                  : "----"}
              </label>
            </div>
            <div className="tanda-params">
              <label>Fecha: </label>
              <label className="tanda__dato important-label">
                {tandaDate !== null
                  ? `${tandaDate.getDate()}-${
                      tandaDate.getMonth() + 1
                    }-${tandaDate.getFullYear()}`
                  : "----"}
              </label>
            </div>
            <div className="tanda-params">
              <label>Hora: </label>
              <label className="tanda__dato important-label">
                {tandaDate !== null
                  ? `${`0${tandaDate.getHours()}`.slice(
                      -2
                    )}:${`0${tandaDate.getMinutes()}`.slice(-2)}`
                  : "----"}
              </label>
            </div>
          </div>
        )
      )}
    </div>
  );
}
