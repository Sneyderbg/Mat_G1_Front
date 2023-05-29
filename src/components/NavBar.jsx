import React from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * Componente de la barra de navegación lateral.
 *
 * @returns Render del componente.
 */
export function NavBar({ activeBtnIdx, changePageNumber }) {
  const buttonsInfo = [
    ["Liquidación de matrícula", false],
    ["Calendario académico", false],
    ["Oferta de materias", true],
    ["Matrícula", true], // TODO: Add warning when trying to cancel the process
    ["Constancia de matrícula", false],
    ["Reglamento estudiantil", false],
  ];

  return (
    <div className="navbar">
      {buttonsInfo.map((btnInfo, idx) => (
        <button
          key={uuidv4()}
          type="button"
          disabled={!btnInfo[1]}
          className={`navbar-btn ${
            idx === activeBtnIdx ? "navbar-btn--active" : ""
          } ${!btnInfo[1] ? "navbar-btn--disabled" : ""}`}
          onClick={() => changePageNumber(idx)}
        >
          {btnInfo[0]}
        </button>
      ))}
    </div>
  );
}
