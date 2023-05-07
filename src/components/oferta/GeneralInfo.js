/**
 * Componente que describe la información general de la oferta de matriculas.
 *
 * @param {*} props Propiedades = {userInfo, showTanda}.
 * @returns Render del componente.
 */
export function GeneralInfo(props) {
  const date = new Date();
  const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const tandaDate = props.userInfo.hasOwnProperty("tanda")
    ? new Date(props.userInfo.tanda.horario)
    : null;

  return (
    <div className="default-box upper-rounded">
      <label>Fecha: </label>
      <label className="default-box__dato">{currentDate}</label>
      <br />
      <label>Nombre: </label>
      <label className="default-box__dato">
        {props.userInfo.hasOwnProperty("nombres")
          ? props.userInfo.nombres + " " + props.userInfo.apellidos
          : "----"}
      </label>
      <br />
      <label>Programa: </label>
      <label className="default-box__dato">
        {props.userInfo.hasOwnProperty("programa") ? props.userInfo.programa.nombre : "----"}
      </label>
      <br />
      <label>Semestre: </label>
      <label className="default-box__dato">
        {props.userInfo.hasOwnProperty("nroSemestre") ? props.userInfo.nroSemestre : "----"}
      </label>
      {props.userInfo.status !== "ok" ? (
        <div className="flex-box error-box">
          <h3>{props.userInfo.customMessage}</h3>
        </div>
      ) : (
        props.showTanda && (
          <div className="tanda-matricula">
            <label id="lbl-matricula">Matrícula </label>
            <div className="tanda-params">
              <label>Tanda: </label>
              <label className="tanda__dato important-label">
                {props.userInfo.tanda.hasOwnProperty("numero")
                  ? props.userInfo.tanda.numero
                  : "----"}
              </label>
            </div>
            <div className="tanda-params">
              <label>Fecha: </label>
              <label className="tanda__dato important-label">
                {tandaDate !== null
                  ? `${tandaDate.getDate()}-${tandaDate.getMonth() + 1}-${tandaDate.getFullYear()}`
                  : "----"}
              </label>
            </div>
            <div className="tanda-params">
              <label>Hora: </label>
              <label className="tanda__dato important-label">
                {tandaDate !== null
                  ? `${tandaDate.getHours()}:${tandaDate.getMinutes()}`
                  : "----"}
              </label>
            </div>
          </div>
        )
      )}
    </div>
  );
}
