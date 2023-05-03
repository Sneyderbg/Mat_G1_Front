import { useState, useEffect } from "react";
import axios from "axios";

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
      getTanda(props.userInfo["Tanda de matrícula"], props.endpoint)
        .then((data) => {
          Array.isArray(data) ? setTanda(data[0]) : setTanda(data);
        })
        .catch((res) => console.error(res));
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
        Ingeniería de Sistemas
      </label>
      <br />
      <label>Semestre: </label>
      <label className="dato" id="datoSemestre">
        {props.userInfo.hasOwnProperty("Semestre académico")
          ? props.userInfo["Semestre académico"]
          : "----"}
      </label>
      {tanda.hasOwnProperty("error") ? (
        <div id="errorTanda">
          <h3>{tanda.error.reason}</h3>
        </div>
      ) : (
        props.showTanda && (
          <div className="tandaMatricula">
            <label className="lblMatricula">Matrícula </label>
            <div className="tandaParams">
              <label>Tanda: </label>
              <label className="tandaDatos" id="datoTanda">
                {tanda.hasOwnProperty("Tanda") ? tanda.Tanda : "----"}
              </label>
            </div>
            <div className="tandaParams">
              <label>Fecha: </label>
              <label className="tandaDatos" id="datoFecha">
                {tanda.hasOwnProperty("Día") ? tanda["Día"] : "----"}
              </label>
            </div>
            <div className="tandaParams">
              <label>Hora: </label>
              <label className="tandaDatos" id="datoHora">
                {tanda.hasOwnProperty("Horario") ? tanda.Horario.replace(":00", "") : "----"}
              </label>
            </div>
          </div>
        )
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
  const sample_data = await axios
    .get(endpoint, {
      params: { Tanda: numTanda },
    })
    .then((res) => res.data)
    .catch((err) => {
      const error = { ...err, customMessage: "Error al obtener la información de la tanda." };
      console.error(error.customMessage, err);
      return error;
    });

  return sample_data;
}
