import { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import { BlankPage } from "./blank/blankPage";
import { OfertaDeMaterias } from "./oferta/OfertaDeMaterias";
import { StartMatricula } from "./matricula/StartMatricula";
import { getUserInfo } from "../utils/CommonRequests";

/**
 * Componente que renderiza la página principal (o página general) de la app web.
 *
 * @param {*} props Propiedades = {}
 * @returns Render del componente.
 */
export function MainPage(props) {
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo(props.cfg.USER_ID).then((res) => setUserInfo(res));
  }, [props.cfg.USER_ID]);
  
  return (
    <div>
      <header>
        <h1>Proceso de matrícula</h1>
      </header>
      <main>
        <NavBar activeBtnIdx={currentPageNumber} changePageNumber={setCurrentPageNumber}></NavBar>
        {getCurrentPage(currentPageNumber, userInfo)}
      </main>
    </div>
  );
}

function getCurrentPage(idx, userInfo) {
  switch (idx) {
    case 2:
      return <OfertaDeMaterias userInfo={userInfo}></OfertaDeMaterias>;

    case 3:
      return <StartMatricula userInfo={userInfo}></StartMatricula>;

    default:
      return <BlankPage></BlankPage>;
  }
}
