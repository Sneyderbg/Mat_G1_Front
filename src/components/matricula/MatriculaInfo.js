import { Timer } from "../common/Timer";

/**
 *
 * @param {*} props = {maxCredits, fnGetCurrentCredits, fnOnTimeFinished}
 * @returns
 */
export function MatriculaInfo(props) {

  return (
    <div className="flex-box">
      <div className="flex-box--horizontal">
        <div className="dato">
          <label>Creditos a matricular: </label>
          <label className="important-label">{props.fnGetCurrentCredits()}</label>
        </div>
        <div className="dato">
          <label>Creditos máximos: </label>
          <label className="important-label">{props.maxCredits}</label>
        </div>
        <div className="dato">
          <label>Tiempo restante: </label>
          <Timer
            initialTime={new Date(15 * 60 * 1000)}
            fnOnTimeFinished={() => {
              props.fnOnTimeFinished();
            }}
          ></Timer>
        </div>
      </div>
    </div>
  );
}
