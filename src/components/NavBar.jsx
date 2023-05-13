import React from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * Componente de la barra de navegación lateral.
 *
 * @returns Render del componente.
 */
export function NavBar({ activeBtnIdx, changePageNumber }) {
  const buttonsNames = [
    "Liquidación de matrícula",
    "Calendario académico",
    "Oferta de materias",
    "Matrícula", // TODO: Add warning when trying to cancel the process
    "Constancia de matrícula",
    "Reglamento estudiantil",
  ];

  return (
    <div className="navbar">
      {buttonsNames.map((btnName, idx) => (
        <button
          key={uuidv4()}
          type="button"
          className={`navbar-btn ${
            idx === activeBtnIdx ? "navbar-btn--active" : ""
          }`}
          onClick={() => changePageNumber(idx)}
        >
          {btnName}
        </button>
      ))}
    </div>
  );
}
