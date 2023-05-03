/**
 * Componente de la barra de navegación lateral.
 *
 * @returns Render del componente.
 */
export function NavBar(props) {
  const buttonsNames = [
    "Liquidación de matrícula",
    "Calendario académico",
    "Oferta de materias",
    "Matrícula",
    "Constancia de matrícula",
    "Reglamento estudiantil",
  ];

  return (
    <div className="navbar">
      {buttonsNames.map((btnName, idx) => {
        return (
          <button
            key={idx}
            className={`navbar-btn ${idx === props.activeBtnIdx ? "navbar-btn--active" : ""}`}
            onClick={() => props.changePageNumber(idx)}
          >
            {btnName}
          </button>
        );
      })}
    </div>
  );
}
