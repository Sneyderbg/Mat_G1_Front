import { useState} from "react";
import { NavBar } from "./NavBar";
import { BlankPage } from "./blank/blankPage";
import { OfertaDeMaterias } from "./oferta/OfertaDeMaterias";
import { StartMatricula } from "./matricula/StartMatricula";

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
        {getCurrentPage(currentPageNumber, props.cfg)}
      </main>
    </div>
  );
}

function getCurrentPage(idx, cfg) {
  switch (idx) {
    case 2:
      return <OfertaDeMaterias userId={cfg.USER_ID}></OfertaDeMaterias>;

    case 3:
      return <StartMatricula userId={cfg.USER_ID}></StartMatricula>;

    default:
      return <BlankPage></BlankPage>;
  }
}
