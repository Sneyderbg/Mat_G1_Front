import { useState } from "react";
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
      <header>
        <h1>Proceso de matrícula</h1>
      </header>
      <main>
        <NavBar activeBtnIdx={currentPageNumber} changePageNumber={setCurrentPageNumber}></NavBar>
        {getCurrentPage(currentPageNumber)}
      </main>
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
