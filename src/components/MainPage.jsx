import React, { useState, useEffect } from "react";
import { NavBar } from "components/NavBar";
import { BlankPage } from "components/blank/blankPage";
import { OfertaDeMaterias } from "components/oferta/OfertaDeMaterias";
import { StartMatricula } from "components/matricula/StartMatricula";
import { getUserInfo } from "utils/CommonRequests";

/**
 * Componente que renderiza la página principal (o página general) de la app web.
 *
 * @param {*} props Propiedades = {}
 * @returns Render del componente.
 */
export function MainPage({ cfg }) {
  const [currentPageNumber, setCurrentPageNumber] = useState(3);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo(cfg.USER_ID).then((res) => setUserInfo(res));
  }, [cfg.USER_ID]);

  return (
    <div>
      <header>
        <h1>Proceso de matrícula</h1>
      </header>
      <main>
        <NavBar
          activeBtnIdx={currentPageNumber}
          changePageNumber={setCurrentPageNumber}
        />
        {getCurrentPage(currentPageNumber, userInfo)}
      </main>
    </div>
  );
}

function getCurrentPage(idx, userInfo) {
  switch (idx) {
    case 2:
      return <OfertaDeMaterias userInfo={userInfo} />;

    case 3:
      return <StartMatricula userInfo={userInfo} />;

    default:
      return <BlankPage />;
  }
}
