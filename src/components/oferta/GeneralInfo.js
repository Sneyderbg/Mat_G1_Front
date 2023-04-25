import { useState, useEffect } from "react";

/**
 * Componente que describe la información general de la oferta de matriculas.
 *
 * @param {*} props Propiedades = {userInfo, endpoint, showTanda}.
 * @returns Render del componente.
 */
export function GeneralInfo(props) {
  const [tanda, setTanda] = useState({});
  const date = new Date();
  let currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  // Actualiza la tanda si la info del usuario cambia
  useEffect(() => {
    if (props.userInfo.hasOwnProperty("Tanda de matrícula")) {
      getTanda(props.userInfo["Tanda de matrícula"], props.endpoint)
        .then((data) => setTanda(data))
        .catch((res) => console.log(res));
    }
  }, [props.userInfo, props.endpoint]);

  return (
    <div className="generalInfo">
      <label>Fecha: </label>
      <label className="dato" id="datoFecha">
        {currentDate}
      </label>
      <br />
      <label>Nombre: </label>
      <label className="dato" id="datoNombre">
        {props.userInfo.hasOwnProperty("Nombres")
          ? props.userInfo.Nombres + " " + props.userInfo.Apellidos
          : "----"}
      </label>
      <br />
      <label>Programa: </label>
      <label className="dato" id="datoPrograma">
        ----
      </label>
      <br />
      <label>Semestre: </label>
      <label className="dato" id="datoSemestre">
        {props.userInfo.hasOwnProperty("Semestre académico")
          ? props.userInfo["Semestre académico"]
          : "----"}
      </label>
      {props.showTanda && (
        <div className="matricula">
          <label>Matrícula </label>
          <br />
          <label className="parametrosMatricula">Tanda: </label>
          <label id="datoTanda">{tanda.hasOwnProperty("Tanda") ? tanda.Tanda : "----"}</label>
          <label className="parametrosMatricula">Fecha: </label>
          <label id="datoFecha">{tanda.hasOwnProperty("Día") ? tanda["Día"] : "----"}</label>
          <label className="parametrosMatricula">Hora: </label>
          <label id="datoHora">
            {tanda.hasOwnProperty("Horario") ? tanda.Horario.replace(":00", "") : "----"}
          </label>
        </div>
      )}
    </div>
  );
}

/**
 * Obtiene la información de la tanda del usuario actual a través del endpoint dado.
 * 
 * @param {*} numTanda Número de tanda del usuario.
 * @param {*} endpoint Endpoint para hacer la consulta.
 * @returns Promise de la información de la tanda.
 */
async function getTanda(numTanda, endpoint) {
  const sample_data = await fetch(endpoint + numTanda)
    .then((data) => data.json())
    .catch((res) => console.log(res));

  return sample_data[0]; // tandas únicas
}
