import { Timer } from "components/common/Timer";
import React from "react";

/**
 *
 * @param {*} props = {maxCredits, fnGetCurrentCredits, fnOnTimeFinished}
 * @returns
 */
export function MatriculaInfo({
  fnGetCurrentCredits,
  maxCredits,
  fnOnTimeFinished,
}) {
  return (
    <div className="flex-box">
      <div className="flex-box--horizontal">
        <div className="dato">
          <label>Creditos a matricular: </label>
          <label className="important-label">{fnGetCurrentCredits()}</label>
        </div>
        <div className="dato">
          <label>Creditos máximos: </label>
          <label className="important-label">{maxCredits}</label>
        </div>
        <div className="dato">
          <label>Tiempo restante: </label>
          <Timer
            initialTime={new Date(15 * 60 * 1000)}
            fnOnTimeFinished={() => {
              fnOnTimeFinished();
            }}
          />
        </div>
      </div>
    </div>
  );
}
