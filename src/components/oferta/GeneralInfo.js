import { useState, useEffect } from "react";
import { getTanda } from "../../utils/CommonRequests";
/**
 * Componente que describe la información general de la oferta de matriculas.
 *
 * @param {*} props Propiedades = {userInfo, endpoint, showTanda}.
 * @returns Render del componente.
 */
export function GeneralInfo(props) {
  const [tanda, setTanda] = useState({});
  const date = new Date();
  const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  // Actualiza la tanda si la info del usuario cambia
  useEffect(() => {
    if (props.userInfo.hasOwnProperty("Tanda de matrícula")) {
      getTanda(props.userInfo["Tanda de matrícula"])
        .then((data) => {
          Array.isArray(data) ? setTanda(data[0]) : setTanda(data);
        })
        .catch((res) => console.error(res));
    }
  }, [props.userInfo]);

  return (
    <div className="default-box upper-rounded">
      <label>Fecha: </label>
      <label className="default-box__dato">{currentDate}</label>
      <br />
      <label>Nombre: </label>
      <label className="default-box__dato">
        {props.userInfo.hasOwnProperty("Nombres")
          ? props.userInfo.Nombres + " " + props.userInfo.Apellidos
          : "----"}
      </label>
      <br />
      <label>Programa: </label>
      <label className="default-box__dato">Ingeniería de Sistemas</label>
      <br />
      <label>Semestre: </label>
      <label className="default-box__dato">
        {props.userInfo.hasOwnProperty("Semestre académico")
          ? props.userInfo["Semestre académico"]
          : "----"}
      </label>
      {tanda.status !== "ok" ? (
        <div className="error-box">
          <h3>{tanda.customMessage}</h3>
        </div>
      ) : (
        props.showTanda && (
          <div className="tanda-matricula">
            <label id="lbl-matricula">Matrícula </label>
            <div className="tanda-params">
              <label>Tanda: </label>
              <label className="tanda__dato">
                {tanda.hasOwnProperty("Tanda") ? tanda.Tanda : "----"}
              </label>
            </div>
            <div className="tanda-params">
              <label>Fecha: </label>
              <label className="tanda__dato">
                {tanda.hasOwnProperty("Día") ? tanda["Día"] : "----"}
              </label>
            </div>
            <div className="tanda-params">
              <label>Hora: </label>
              <label className="tanda__dato">
                {tanda.hasOwnProperty("Horario") ? tanda.Horario.replace(":00", "") : "----"}
              </label>
            </div>
          </div>
        )
      )}
    </div>
  );
}
