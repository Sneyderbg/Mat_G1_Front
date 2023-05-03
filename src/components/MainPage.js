import { useState } from "react";
import "./MainPage.css";
import { OfertaDeMaterias } from "./oferta/OfertaDeMaterias";
import { NavBar } from "./NavBar";
import { BlankPage } from "./blank/blankPage";

/**
 * Componente que renderiza la página principal (o página general) de la app web.
 *
 * @param {*} props Propiedades = {}
 * @returns Render del componente.
 */
export function MainPage(props) {
  const [currentPageNumber, setCurrentPageNumber] = useState(2);

  return (
    <div>
      <div className="centeredTitle">
        <h1>Proceso de matrícula</h1>
      </div>
      <div className="mainPage">
        <NavBar activeBtnIdx={currentPageNumber} changePageNumber={setCurrentPageNumber}></NavBar>
        {getCurrentPage(currentPageNumber)}
      </div>
    </div>
  );
}

function getCurrentPage(idx) {
  switch (idx) {
    case 2:
      return <OfertaDeMaterias></OfertaDeMaterias>;

    default:
      return <BlankPage></BlankPage>;
  }
}
